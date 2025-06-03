import { supabase, logDebug, logError } from './supabaseClient';

// Types
export interface User {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  bio?: string;
  role?: string;
  is_visible?: boolean;
  interests?: string[] | string;
  matchScore?: number;
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: User;
}

export interface Chat {
  id: string;
  participants: string[];
  created_at: string;
  updated_at: string;
}

// Search users in Supabase
export const searchUsers = async (searchTerm: string, currentUserId?: string): Promise<User[]> => {
  try {
    logDebug('Searching users with term:', searchTerm);
    
    let query = supabase
      .from('users')
      .select('*');
    
    if (currentUserId) {
      // Exclude current user
      query = query.neq('id', currentUserId);
    }
    
    // Only show visible users
    query = query.eq('is_visible', true);
    
    // If there's a search term, filter by it
    if (searchTerm && searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      
      // Supabase allows searching with ilike
      query = query.or(`username.ilike.%${searchTermLower}%, bio.ilike.%${searchTermLower}%, role.ilike.%${searchTermLower}%`);
    }
    
    // Execute the query
    const { data: users, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Calculate match scores for better sorting
    if (searchTerm && searchTerm.trim() && users) {
      const searchTermLower = searchTerm.toLowerCase();
      
      // Add match scores
      users.forEach((user: User) => {
        let score = 0;
        
        // Exact username match
        if (user.username.toLowerCase() === searchTermLower) {
          score += 100;
        } 
        // Username starts with search term
        else if (user.username.toLowerCase().startsWith(searchTermLower)) {
          score += 50;
        }
        // Username contains search term
        else if (user.username.toLowerCase().includes(searchTermLower)) {
          score += 25;
        }
        
        // Bio match
        if (user.bio && user.bio.toLowerCase().includes(searchTermLower)) {
          score += 10;
        }
        
        // Role match
        if (user.role && user.role.toLowerCase().includes(searchTermLower)) {
          score += 15;
        }
        
        // For interests, we need to check if it's an array or string
        if (user.interests) {
          const interests = Array.isArray(user.interests) 
            ? user.interests 
            : typeof user.interests === 'string' 
              ? JSON.parse(user.interests) 
              : [];
          
          if (interests.some((interest: string) => interest.toLowerCase().includes(searchTermLower))) {
            score += 20;
          }
        }
        
        user.matchScore = score;
      });
      
      // Sort by match score
      users.sort((a: User, b: User) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (users) {
      // Sort by most recent first when no search term
      users.sort((a: User, b: User) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    
    // Limit to 20 results to avoid overwhelming the UI
    const limitedUsers = users ? users.slice(0, 20) : [];
    
    logDebug(`Search returned ${limitedUsers.length} users`);
    return limitedUsers;
  } catch (error) {
    logError('Error searching users:', error);
    return [];
  }
};

// Get or create a chat between two users
export const getOrCreateChat = async (user1Id: string, user2Id: string): Promise<string | null> => {
  try {
    logDebug('Getting or creating chat for users:', { user1Id, user2Id });
    
    if (!user1Id || !user2Id) {
      logError('Missing user IDs for chat creation:', { user1Id, user2Id });
      throw new Error('Both user IDs are required to create a chat');
    }
    
    // Sort user IDs to ensure consistent chat IDs
    const participants = [user1Id, user2Id].sort();
    
    // Check if chat already exists
    const { data: existingChats, error: chatError } = await supabase
      .from('chats')
      .select('*')
      .contains('participants', participants);
    
    if (chatError) {
      logError('Error checking for existing chats:', chatError);
      throw chatError;
    }
    
    let chatId;
    
    // If chat doesn't exist, create it
    if (!existingChats || existingChats.length === 0) {
      logDebug('Creating new chat between users');
      
      // Verify both users exist before creating chat
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id')
        .in('id', participants);
      
      if (usersError) {
        logError('Error verifying users exist:', usersError);
        throw usersError;
      }
      
      if (!users || users.length !== 2) {
        logError('One or both users do not exist:', { 
          expected: participants, 
          found: users?.map((u: { id: string }) => u.id) 
        });
        
        // If at least one user exists, create the chat anyway
        if (users && users.length > 0) {
          console.warn('⚠️ Creating chat with only some users verified:', users.map((u: { id: string }) => u.id));
        } else {
          throw new Error('Could not verify users exist');
        }
      }
      
      // Create the chat - only include columns that exist in the database schema
      const { data: newChat, error: createError } = await supabase
        .from('chats')
        .insert([{
          participants: participants,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (createError) {
        logError('Error creating new chat:', createError);
        throw createError;
      }
      
      if (!newChat || newChat.length === 0) {
        logError('Chat created but no data returned', null);
        throw new Error('Failed to create chat');
      }
      
      chatId = newChat[0].id;
      logDebug('Created new chat with ID:', chatId);
    } else {
      chatId = existingChats[0].id;
      logDebug('Found existing chat with ID:', chatId);
    }
    
    return chatId;
  } catch (error) {
    logError('Error getting or creating chat:', error);
    // Return null instead of throwing to allow the UI to handle this gracefully
    return null;
  }
};

// Send a message to a chat
export const sendMessage = async (chatId: string, senderId: string, content: string): Promise<{ success: boolean; error?: string; message?: Message }> => {
  try {
    logDebug('Sending message to Supabase:', { chatId, senderId, content });
    
    if (!chatId || !senderId || !content.trim()) {
      logError('Invalid message data:', { chatId, senderId, content });
      return {
        success: false,
        error: 'Missing required message data (chatId, senderId, or content)'
      };
    }
    
    // Verify chat exists before sending
    const { data: chatData, error: chatCheckError } = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId)
      .single();
      
    if (chatCheckError || !chatData) {
      logError('Chat does not exist:', { chatId, error: chatCheckError });
      return {
        success: false,
        error: `Chat with ID ${chatId} does not exist`
      };
    }
    
    // First, insert the message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert([
        {
          chat_id: chatId,
          sender_id: senderId,
          content: content.trim(),
          is_read: false,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (messageError) {
      logError('Error sending message:', messageError);
      return {
        success: false,
        error: messageError.message,
      };
    }
    
    // Then, update the chat's timestamp
    const { error: chatError } = await supabase
      .from('chats')
      .update({
        updated_at: new Date().toISOString()
      })
      .eq('id', chatId);
    
    if (chatError) {
      logError('Error updating chat timestamp:', chatError);
      // We still sent the message successfully, so don't fail the operation
    }
    
    return {
      success: true,
      message
    };
  } catch (error) {
    logError('Error sending message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending message'
    };
  }
};

// Get messages for a chat
export const getMessages = async (chatId: string): Promise<Message[]> => {
  try {
    logDebug('Getting messages for chat:', chatId);
    
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id (id, username, avatar)
      `)
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    logError('Error getting messages:', error);
    return [];
  }
};

// Subscribe to real-time messages
export const subscribeToMessages = (chatId: string, callback: (messages: Message[]) => void) => {
  try {
    logDebug('Setting up subscription for chat:', chatId);
    
    // First get existing messages
    getMessages(chatId).then(messages => {
      callback(messages);
    });
    
    // Then subscribe to new messages
    const subscription = supabase
      .channel(`chat-${chatId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${chatId}`
      }, (payload: any) => {
        logDebug('Received message from subscription:', payload);
        // Refetch all messages to ensure we have the complete set with user details
        getMessages(chatId).then(messages => {
          callback(messages);
        });
      })
      .subscribe();
    
    // Return cleanup function
    return {
      unsubscribe: () => {
        logDebug('Unsubscribing from chat:', chatId);
        subscription.unsubscribe();
      }
    };
  } catch (error) {
    logError('Error subscribing to messages:', error);
    return {
      unsubscribe: () => {}
    };
  }
}; 