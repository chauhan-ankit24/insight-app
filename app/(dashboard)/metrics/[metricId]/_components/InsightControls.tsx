'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BarChart2, Clock } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';

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
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground ml-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          <BarChart2 className="h-5 w-5" />
          Frequency
        </label>
        <div className="flex gap-2">
          {grains.map((g) => {
            const disabled = isGrainDisabled(g.id);
            return (
              <ActionButton
                key={g.id}
                disabled={disabled}
                onClick={() => handleUpdate('grain', g.id)}
                className={`${
                  currentGrain === g.id
                    ? 'bg-background text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                } ${disabled ? 'active:translate-none cursor-not-allowed opacity-30 active:scale-100' : 'hover:bg-background/50'}`}
              >
                {g.label}
              </ActionButton>
            );
          })}
        </div>
      </div>

      <div className="bg-border/60 mb-1 hidden h-10 w-px self-end sm:block" />

      {/* 2. Time Range Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground ml-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
          <Clock className="h-5 w-5" />
          Time Range
        </label>
        <div className="flex gap-2">
          {ranges.map((r) => (
            <ActionButton
              key={r.id}
              onClick={() => handleUpdate('range', r.id)}
              className={`${
                currentRange === r.id
                  ? 'bg-background text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.label}
            </ActionButton>
          ))}
        </div>
      </div>
    </div>
  );
}
