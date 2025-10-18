import { useState } from 'react';
import { Home, BarChart3, Users, Settings, Bell, Plus } from 'lucide-react';
import { UserDashboard } from './components/UserDashboard';
import { CaregiverDashboard } from './components/CaregiverDashboard';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SettingsView } from './components/SettingsView';
import { AddBottleSheet } from './components/AddBottleSheet';
import { Button } from './components/ui/button';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAddBottleOpen, setIsAddBottleOpen] = useState(false);
  const [userMode, setUserMode] = useState<'user' | 'caregiver'>('user');

  return (
    <div className="size-full bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
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
          {activeTab === 'patients' && userMode === 'caregiver' && <CaregiverDashboard showPatientList />}
          {activeTab === 'settings' && <SettingsView userMode={userMode} onModeChange={setUserMode} />}
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

          {userMode === 'caregiver' && (
            <button
              onClick={() => setActiveTab('patients')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'patients' 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground'
              }`}
            >
              <Users className="size-5" />
              <span className="text-xs">Patients</span>
            </button>
          )}

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
