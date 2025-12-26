'use client';

import Image from 'next/image';
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { userName, logout } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Branding & User Info */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={50}
              className="scale-150 rounded-lg"
            />
            <h1 className="hidden text-xl font-bold tracking-tight sm:block">InsightEdge</h1>
          </div>

          {userName && (
            <div className="hidden items-center gap-2 border-l pl-4 md:flex">
              <User className="text-muted-foreground h-4 w-4" />
              <span className="text-foreground text-sm font-medium">{userName}</span>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <button
            onClick={logout}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-ring inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 active:scale-95"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
