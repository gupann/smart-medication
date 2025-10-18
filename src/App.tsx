import { useState, useEffect } from 'react';
import { Home, BarChart3, Settings, Bell, Plus } from 'lucide-react';
import { UserDashboard } from './components/UserDashboard';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SettingsView } from './components/SettingsView';
import { AddBottleSheet } from './components/AddBottleSheet';
import { Button } from './components/ui/button';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginSignUp } from './components/LoginSignUp';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAddBottleOpen, setIsAddBottleOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  
  // User mode is now based on the logged-in user's account type
  const userMode = user?.accountType || 'user';

  // Reset to home page when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      setActiveTab('home');
    }
  }, [isLoggedIn]);

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginSignUp />;
  }

  return (
    <div className="size-full bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white">
                {/* Pill bottle cap */}
                <rect x="7" y="3" width="10" height="3" rx="1" fill="currentColor" />
                {/* Bottle body */}
                <path d="M8 6H16C17.1046 6 18 6.89543 18 8V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V8C6 6.89543 6.89543 6 8 6Z" fill="currentColor" />
                {/* Pills inside */}
                <circle cx="10" cy="11" r="1.5" fill="white" opacity="0.7" />
                <circle cx="14" cy="13" r="1.5" fill="white" opacity="0.7" />
                <circle cx="11" cy="16" r="1.5" fill="white" opacity="0.7" />
              </svg>
            </div>
            <div>
              <h1 className="leading-none mb-0.5">MediTrack</h1>
              <p className="text-xs text-muted-foreground leading-none">Smart Pill Adherence</p>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="relative shrink-0">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        <div className="px-4 py-4">
          {activeTab === 'home' && userMode === 'user' && <UserDashboard />}
          {activeTab === 'home' && userMode === 'caregiver' && <CaregiverDashboard />}
          {activeTab === 'analytics' && <AnalyticsDashboard userMode={userMode} />}
          {activeTab === 'settings' && <SettingsView userMode={userMode} />}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <Home className="size-5" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'analytics' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <BarChart3 className="size-5" />
            <span className="text-xs">Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'settings' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <Settings className="size-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>

      {/* Floating Action Button */}
      {activeTab === 'home' && (
        <button
          onClick={() => setIsAddBottleOpen(true)}
          className="fixed bottom-20 right-4 z-40 size-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <Plus className="size-6" />
        </button>
      )}

      {/* Add Bottle Sheet */}
      <AddBottleSheet open={isAddBottleOpen} onOpenChange={setIsAddBottleOpen} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
