'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });
  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const storedCredentials = localStorage.getItem('userCredentials');
      if (storedCredentials) {
        const { name } = JSON.parse(storedCredentials);
        return name;
      }
    }
    return null;
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on app load, but allow public access to Home page
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('isAuthenticated');
      const currentPath = window.location.pathname;
      if (storedAuth !== 'true' && currentPath !== '/') {
        router.push('/login');
      }
    }
  }, [router]);

  const login = (name: string, password: string) => {
    // Simple authentication logic - in a real app, this would validate against a backend
    if (name && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userCredentials', JSON.stringify({ name, password }));
      setUserName(name);
      setIsAuthenticated(true);
      router.push('/metrics');
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userCredentials');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
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
