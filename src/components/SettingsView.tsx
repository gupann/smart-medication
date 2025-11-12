import { Bell, Lock, Moon, Smartphone, Users, Shield, Volume2, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';

interface SettingsViewProps {
  userMode: 'user' | 'caregiver';
}

export function SettingsView({ userMode }: SettingsViewProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(false);
  const [volume, setVolume] = useState([75]);

  return (
    <div className="space-y-4">
      {/* Account Type */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="size-5" />
            <CardTitle>Account Type</CardTitle>
          </div>
          <CardDescription>
            Your current account type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Account Type</span>
            <span className="text-sm font-medium">
              {userMode === 'user' ? 'Patient' : 'Caregiver'}
            </span>
          </div>
          {user?.email && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg mt-3">
              <span className="text-sm">Email</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>
            Manage how you receive medication reminders and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications on your device
              </p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sound Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Play a sound when dose is due
              </p>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          {soundEnabled && (
            <div className="space-y-2 pl-4 border-l-2 border-muted">
              <Label>Alert Volume</Label>
              <div className="flex items-center gap-4">
                <Volume2 className="size-4 text-muted-foreground" />
                <Slider 
                  value={volume} 
                  onValueChange={setVolume}
                  max={100} 
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12">{volume[0]}%</span>
              </div>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Vibration</Label>
              <p className="text-sm text-muted-foreground">
                Vibrate when dose is due
              </p>
            </div>
            <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Reminder Frequency</Label>
            <Select defaultValue="5">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No reminders</SelectItem>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="10">Every 10 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              How often to remind you after initial notification
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Safety & Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-5" />
            <CardTitle>Safety & Security</CardTitle>
          </div>
          <CardDescription>
            Configure safety locks and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Lock Feature</Label>
              <p className="text-sm text-muted-foreground">
                Automatically lock bottles between scheduled doses
              </p>
            </div>
            <Switch checked={autoLockEnabled} onCheckedChange={setAutoLockEnabled} />
          </div>

          {autoLockEnabled && (
            <div className="space-y-3 pl-4 border-l-2 border-muted">
              <Label>Unlock Window</Label>
              <Select defaultValue="15">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes before scheduled time</SelectItem>
                  <SelectItem value="15">15 minutes before scheduled time</SelectItem>
                  <SelectItem value="30">30 minutes before scheduled time</SelectItem>
                  <SelectItem value="60">1 hour before scheduled time</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                When bottle automatically unlocks before scheduled dose
              </p>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emergency Override</Label>
              <p className="text-sm text-muted-foreground">
                Allow manual unlock via app
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          {userMode === 'caregiver' && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Caregiver Lock Control</Label>
                  <p className="text-sm text-muted-foreground">
                    Require caregiver approval to unlock
                  </p>
                </div>
                <Switch />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bottle Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="size-5" />
            <CardTitle>Smart Bottle Settings</CardTitle>
          </div>
          <CardDescription>
            Configure your smart pill bottle hardware
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>LED Light Indicators</Label>
              <p className="text-sm text-muted-foreground">
                Light up bottle cap when dose is due
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>LED Color Theme</Label>
            <Select defaultValue="blue">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="rainbow">Rainbow (Cycle)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Low Pill Alert Threshold</Label>
            <Select defaultValue="10">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 pills remaining</SelectItem>
                <SelectItem value="10">10 pills remaining</SelectItem>
                <SelectItem value="15">15 pills remaining</SelectItem>
                <SelectItem value="7days">7 days supply</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Get notified when pills are running low
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Battery Status</Label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Current battery level</span>
              <span className="text-sm font-medium">87%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Place bottle on charging base when battery is low
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Caregiver Access */}
      {userMode === 'caregiver' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="size-5" />
              <CardTitle>Patient Management</CardTitle>
            </div>
            <CardDescription>
              Manage access to patient medication data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Real-time Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  Receive instant alerts for patient activities
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Missed Dose Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when patients miss scheduled doses
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive adherence summary emails
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      )}

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="size-5" />
            <CardTitle>App Preferences</CardTitle>
          </div>
          <CardDescription>
            Customize your app experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use dark theme for the app
              </p>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full">Export Data</Button>
        <Button variant="outline" className="w-full">Contact Support</Button>
      </div>

      {/* Logout Button */}
      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={logout}
      >
        <LogOut className="size-4 mr-2" />
        Log Out
      </Button>

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-xs text-muted-foreground">Pillarity v2.1.4</p>
      </div>
    </div>
  );
}