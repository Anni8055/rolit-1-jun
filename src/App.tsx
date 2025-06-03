import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { useEffect } from 'react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import Messaging from './pages/Messaging';

// Brand Pages
import BrandDashboard from './pages/brand/Dashboard';
import BrandCampaigns from './pages/brand/Campaigns';
import BrandAnalytics from './pages/brand/Analytics';
import BrandMessages from './pages/brand/Messages';
import BrandSettings from './pages/brand/Settings';
import BrandProfile from './pages/brand/Profile';

// Influencer Pages
import InfluencerDashboard from './pages/influencer/Dashboard';
import InfluencerCampaigns from './pages/influencer/Campaigns';
import InfluencerMessages from './pages/influencer/Messages';
import InfluencerSettings from './pages/influencer/Settings';
import InfluencerProfile from './pages/influencer/Profile';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBot from './components/chatbot/ChatBot';
import MessagingButton from './components/MessagingButton';

// Global styles
import './animations.css';

const queryClient = new QueryClient();

// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Page transition component
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

// Separate component to use location
function AppContent() {
  const location = useLocation();
  const isMessagingPage = location.pathname.includes('messages');
  const isHomePage = location.pathname === '/';
  
  return (
            <div className="min-h-screen bg-background text-foreground">
              <ScrollToTop />
              <Navbar />
      {isMessagingPage ? (
        <main className="p-0 animate-fade-in">
          <PageTransition>
            <Routes>
              <Route path="/messages" element={<ProtectedRoute allowedRoles={['brand', 'influencer']} />}>
                <Route index element={<Messaging />} />
              </Route>
              <Route path="/brand/messages" element={<ProtectedRoute allowedRoles={['brand']} />}>
                <Route index element={<Messaging />} />
              </Route>
              <Route path="/influencer/messages" element={<ProtectedRoute allowedRoles={['influencer']} />}>
                <Route index element={<Messaging />} />
              </Route>
            </Routes>
          </PageTransition>
        </main>
      ) : (
              <main className={`animate-fade-in ${isHomePage ? 'pt-0' : 'container mx-auto px-4 py-8'}`}>
                <PageTransition>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                    {/* Brand Routes */}
                    <Route path="/brand" element={<ProtectedRoute allowedRoles={['brand']} />}>
                      <Route path="dashboard" element={<BrandDashboard />} />
                      <Route path="campaigns" element={<BrandCampaigns />} />
                      <Route path="analytics" element={<BrandAnalytics />} />
                      <Route path="settings" element={<BrandSettings />} />
                      <Route path="profile" element={<BrandProfile />} />
                    </Route>

                    {/* Influencer Routes */}
                    <Route path="/influencer" element={<ProtectedRoute allowedRoles={['influencer']} />}>
                      <Route path="dashboard" element={<InfluencerDashboard />} />
                      <Route path="campaigns" element={<InfluencerCampaigns />} />
                      <Route path="settings" element={<InfluencerSettings />} />
                      <Route path="profile" element={<InfluencerProfile />} />
                    </Route>

                    {/* Profile Redirect based on user role */}
                    <Route path="/profile" element={<ProtectedRoute allowedRoles={['brand', 'influencer']} />}>
                      <Route index element={<ProfileRedirect />} />
                    </Route>

                    {/* Catch all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </main>
      )}
      
      {!isMessagingPage && <ChatBot />}
      {!isMessagingPage && <MessagingButton position="bottom-left" />}
              <Toaster 
                position="bottom-right" 
                toastOptions={{
                  className: 'toast-animation',
                  duration: 3000,
                }}
              />
            </div>
  );
}

// Component to redirect to the appropriate profile page based on user role
function ProfileRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      if (user.role === 'brand') {
        navigate('/brand/profile');
      } else if (user.role === 'influencer') {
        navigate('/influencer/profile');
      }
    }
  }, [user, navigate]);

  return null;
}

export default App; 