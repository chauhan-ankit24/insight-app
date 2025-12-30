'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { ActionButton } from '@/app/components/ui/ActionButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Metrics Page Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
        Metrics Service Unavailable
      </h1>

      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
        We encountered a critical error while fetching your performance data. This might be a
        temporary connection issue.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ActionButton onClick={() => reset()} className="bg-primary text-white hover:bg-primary/90">
          <RotateCcw className="h-4 w-4" />
          Try Refreshing
        </ActionButton>

        <Link href="/" aria-label="Go back to the dashboard">
          <ActionButton className="bg-secondary/20 border-secondary/30">
            <Home className="h-4 w-4" />
            Back to Dashboard
          </ActionButton>
        </Link>
      </div>

      {process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true' && (
        <div className="border-border mt-8 w-full max-w-2xl overflow-hidden rounded-xl border bg-black/5 p-4 text-left">
          <p className="text-muted-foreground mb-2 text-[10px] font-bold uppercase">Debug Info</p>
          <pre className="overflow-auto text-xs text-red-500">{error.stack || error.message}</pre>
        </div>
      )}
    </div>
  );
}
