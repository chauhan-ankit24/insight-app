'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BarChart2, Clock } from 'lucide-react';

export function InsightControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGrain = searchParams.get('grain') || 'daily';
  const currentRange = searchParams.get('range') || '30';

  const handleUpdate = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'range') {
      params.set('range', value);
      const rangeInt = parseInt(value);

      if (rangeInt <= 7 && (currentGrain === 'weekly' || currentGrain === 'monthly')) {
        params.set('grain', 'daily');
      }
      if (rangeInt <= 30 && currentGrain === 'monthly') {
        params.set('grain', 'daily');
      }
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isGrainDisabled = (grainId: string) => {
    const rangeInt = parseInt(currentRange);
    if (rangeInt <= 7 && (grainId === 'weekly' || grainId === 'monthly')) return true;
    if (rangeInt <= 30 && grainId === 'monthly') return true;
    return false;
  };

  const grains = [
    { id: 'daily', label: 'Day' },
    { id: 'weekly', label: 'Week' },
    { id: 'monthly', label: 'Month' },
  ];

  const ranges = [
    { id: '7', label: '7D' },
    { id: '30', label: '30D' },
    { id: '90', label: '90D' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* 1. Frequency (Grain) Selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground ml-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
          <BarChart2 className="h-3 w-3" />
          Frequency
        </label>
        <div className="bg-secondary/50 border-border/50 flex rounded-xl border p-1 backdrop-blur-sm">
          {grains.map((g) => {
            const disabled = isGrainDisabled(g.id);
            return (
              <button
                key={g.id}
                disabled={disabled}
                onClick={() => handleUpdate('grain', g.id)}
                className={`relative rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  currentGrain === g.id
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                } ${disabled ? 'cursor-not-allowed opacity-30' : 'hover:bg-background/50'}`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-border/60 mb-1 hidden h-10 w-px self-end sm:block" />

      {/* 2. Time Range Selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-muted-foreground ml-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
          <Clock className="h-3 w-3" />
          Time Range
        </label>
        <div className="bg-secondary/50 border-border/50 flex rounded-xl border p-1.5 backdrop-blur-sm">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => handleUpdate('range', r.id)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                currentRange === r.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
