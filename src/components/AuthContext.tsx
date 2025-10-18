import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  accountType: 'user' | 'caregiver';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, accountType: 'user' | 'caregiver') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('meditrack_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const signup = (email: string, password: string, accountType: 'user' | 'caregiver') => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('meditrack_users') || '[]');
    const userExists = existingUsers.some((u: any) => u.email === email);
    
    if (userExists) {
      return false; // User already exists
    }

    // Save user credentials
    const newUser = { email, password, accountType };
    existingUsers.push(newUser);
    localStorage.setItem('meditrack_users', JSON.stringify(existingUsers));

    // Log them in
    const userData = { email, accountType };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('meditrack_user', JSON.stringify(userData));
    
    return true;
  };

  const login = (email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('meditrack_users') || '[]');
    const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      return false; // Invalid credentials
    }

    const userData = { email: foundUser.email, accountType: foundUser.accountType };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('meditrack_user', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('meditrack_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
