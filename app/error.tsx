'use client';

import { RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { ActionButton } from '@/app/components/ui/ActionButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-black uppercase tracking-tight text-foreground">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mt-2 max-w-xs text-sm">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>

      <div className="mt-8 flex gap-3">
        <ActionButton onClick={() => reset()} className="bg-primary text-white hover:bg-primary/90">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </ActionButton>

        <Link href="/" aria-label="Go back to the home page">
          <ActionButton className="bg-secondary/20 border-secondary/30">
            <Home className="h-4 w-4" />
            Go Home
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}
