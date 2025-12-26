'use client';

import Image from 'next/image';
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from '@/app/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';

export function Header() {
  const { userName, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-header shadow-button">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Branding & User Info */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="-ml-2.5 scale-150 rounded-lg"
            />
            <h1 className="hidden text-xl font-bold tracking-tight text-primary sm:block">
              InsightEdge
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {userName && (
            <div className="hidden items-center gap-2 pl-4 sm:flex">
              <Image
                src="/user.png"
                alt="Logo"
                width={30}
                height={30}
                className="mx-1 rounded-lg"
              />
              <span className="text-sm font-medium text-primary">{userName}</span>
            </div>
          )}
          <ThemeToggle />
          <ActionButton onClick={logout} icon={LogOut}>
            <span className="hidden sm:inline">Logout</span>
          </ActionButton>
        </div>
      </div>
    </header>
  );
}
