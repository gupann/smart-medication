import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from './AuthContext';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'user' | 'caregiver'>('user');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp) {
      const success = signup(email, password, accountType);
      if (!success) {
        setError('An account with this email already exists');
      }
    } else {
      const success = login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="size-10 text-white">
              {/* Pill bottle cap/lid */}
              <rect x="6" y="2" width="12" height="4" rx="1.5" fill="currentColor" opacity="0.9" />
              {/* Bottle neck */}
              <rect x="8" y="5" width="8" height="2" fill="currentColor" />
              {/* Main bottle body */}
              <path d="M7 7H17C17.5523 7 18 7.44772 18 8V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V8C6 7.44772 6.44772 7 7 7Z" fill="currentColor" />
              {/* Bottle label area */}
              <rect x="8" y="11" width="8" height="6" rx="0.5" fill="white" opacity="0.2" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="mb-1">Pillarity</h1>
            <p className="text-sm text-muted-foreground">Smart Pill Adherence</p>
          </div>
        </div>

        {/* Login/SignUp Card */}
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Sign up to start tracking your medication' 
                : 'Sign in to your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={(v) => setAccountType(v as 'user' | 'caregiver')}>
                    <SelectTrigger id="accountType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Patient</SelectItem>
                      <SelectItem value="caregiver">Caregiver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Toggle between Login/SignUp */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-primary hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}