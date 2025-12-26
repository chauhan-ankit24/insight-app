'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, User, Loader2 } from 'lucide-react';
import Image from 'next/image';

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
    // Simulate a slight delay for better UX feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    login(name, password);
    setIsLoading(false);
  };

  return (
    <div className="login-bg flex min-h-screen items-center justify-center px-4">
      {/* Background Decorative Blob */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-primary/5 absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-[400px] space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary shadow-primary/20 flex items-center justify-center rounded-2xl shadow-lg backdrop-blur">
            {/* <BarChart3 className="text-primary-foreground h-7 w-7" /> */}
            <Image src="/logo.png" alt="Logo" width={200} height={200} className="rounded-lg" />
          </div>
        </div>

        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Name
              </label>
              <div className="relative">
                <User className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary flex h-10 w-full rounded-md border px-10 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-primary flex h-10 w-full rounded-md border px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
