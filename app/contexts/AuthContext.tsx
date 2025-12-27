'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '../constants/routes';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  login: (name: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
      const storedCredentials = localStorage.getItem('userCredentials');

      if (storedAuth && storedCredentials) {
        const parsed = JSON.parse(storedCredentials);
        setUserName(parsed.name);
        setIsAuthenticated(true);
      } else {
        setUserName(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const protectedRoutes = [ROUTES.DASHBOARD.METRICS, ROUTES.DASHBOARD.SETTINGS];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (!isLoading && !isAuthenticated && isProtectedRoute) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (name: string, password: string) => {
    if (name && password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userCredentials', JSON.stringify({ name }));
      document.cookie = 'auth-token=true; path=/; Max-Age=86400; SameSite=Lax';

      setUserName(name);
      setIsAuthenticated(true);
      router.push(ROUTES.DASHBOARD.METRICS);
    }
  };

  const logout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userCredentials');
    setIsAuthenticated(false);
    router.push(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, isLoading }}>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        children
      )}
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
