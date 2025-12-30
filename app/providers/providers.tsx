'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AuthProvider } from '../contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
    </NextThemesProvider>
  );
}
