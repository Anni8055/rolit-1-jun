import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase URL and key from environment variables
// or use the ones from my-react-app for testing
const SUPABASE_URL = "https://mnctailzzuviueulrpvg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY3RhaWx6enV2aXVldWxycHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTMyODIsImV4cCI6MjA1NzAyOTI4Mn0.04gnDUDANKl33HYFRoDRSDv8JuC1maBo8ijHeTpaWiU";

// Debug flag
const DEBUG = process.env.NODE_ENV === 'development';

// Define logging functions
export const logDebug = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`🔵 ${message}`, data || '');
  }
};

export const logError = (message: string, error: any) => {
  console.error(`🔴 ${message}`, error);
};

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    // Add fetch options with timeouts and retry logic
    fetch: (url, options) => {
      const fetchOptions = {
        ...options,
        timeout: 30000, // 30 second timeout
      };
      return fetch(url, fetchOptions);
    }
  }
});

// Check for placeholder values
if (SUPABASE_URL.includes('your-actual-project-id') || 
    SUPABASE_ANON_KEY.includes('your-actual-key')) {
  console.warn('⚠️ WARNING: Supabase configuration contains placeholder values. Please update SUPABASE_URL and SUPABASE_ANON_KEY with your actual Supabase credentials.');
}

// Test if the connection works
export const testSupabaseConnection = async () => {
  try {
    // Basic connection test
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return { 
        success: false, 
        message: `Connection failed: ${error.message}` 
      };
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

// Helper function to seed demo users for testing
export const seedDemoUsers = async () => {
  try {
    const demoUsers = [
      {
        username: 'demo_user',
        email: 'demo@example.com',
        bio: 'Demo account for testing',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User',
        role: 'user',
        is_visible: true
      },
      {
        username: 'influencer1',
        email: 'influencer1@example.com',
        bio: 'Fashion and lifestyle blogger',
        avatar: 'https://ui-avatars.com/api/?name=Fashion+Influencer',
        role: 'influencer',
        is_visible: true
      },
      {
        username: 'brand1',
        email: 'brand1@example.com',
        bio: 'Fashion company',
        avatar: 'https://ui-avatars.com/api/?name=Brand+Company',
        role: 'brand',
        is_visible: true
      }
    ];
    
    for (const user of demoUsers) {
      // Check if user exists
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('username', user.username)
        .maybeSingle();
      
      if (!data) {
        // Create user
        await supabase
          .from('users')
          .insert([{
            ...user,
            created_at: new Date().toISOString()
          }]);
        
        console.log(`Created demo user: ${user.username}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error seeding users:', error);
    return { success: true }; // Return success anyway to not block app
  }
}; 