'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    return null;
  }

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="custom-scrollbar h-full min-w-0 flex-1 overflow-y-auto scroll-smooth p-6">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
