'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean | undefined;
  userName: string | null | undefined;
  login: (name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [userName, setUserName] = useState<string | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    // eslint-disable-next-line
    setIsAuthenticated(storedAuth);

    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      const { name } = JSON.parse(storedCredentials);

      setUserName(name);
    } else {
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not on root page
    if (
      typeof window !== 'undefined' &&
      isAuthenticated === false &&
      window.location.pathname !== '/'
    ) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

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
    setUserName(null);
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
