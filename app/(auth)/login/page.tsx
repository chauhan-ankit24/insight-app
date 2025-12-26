'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ActionButton } from '@/app/components/ui/ActionButton';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/metrics');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    login(name, password);
    setIsLoading(false);
  };

  return (
    <div className="login-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-[400px] space-y-6">
        {/* 2. Logo Area */}
        <div className="flex flex-col items-center text-center">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-violet-500 opacity-15 blur transition duration-1000 group-hover:opacity-50"></div>
            <div className="relative flex items-center justify-center rounded-2xl p-2 shadow-2xl backdrop-blur-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={180}
                height={180}
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/40 p-8 shadow-button backdrop-blur-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-muted-foreground/80 ml-1 text-[11px] font-black uppercase tracking-widest"
              >
                Identity
              </label>
              <div className="group relative">
                <User className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="border-border/50 flex h-11 w-full rounded-xl border bg-background/50 px-10 py-2 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-muted-foreground/80 ml-1 text-[11px] font-black uppercase tracking-widest"
              >
                Access Key
              </label>
              <div className="group relative">
                <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-primary" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-border/50 flex h-11 w-full rounded-xl border bg-background/50 px-10 py-2 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <ActionButton
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center bg-primary uppercase tracking-[0.2em] text-white hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Authorize Entry'
              )}
            </ActionButton>
          </form>
        </div>

        {/* 4. Footer Brand Detail */}
        <p className="text-muted-foreground/40 text-center text-[10px] font-bold uppercase tracking-[0.4em]">
          InsightEdge Secure Protocol v2.0
        </p>
      </div>
    </div>
  );
}
