'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BarChart2, Clock } from 'lucide-react';
import { ActionButton } from '@/app/components/ui/ActionButton';
import { DATA_GRAINS, DATA_RANGES } from '@/app/constants';
import { getValidGrainForRange, isGrainIncompatible } from '@/lib/utils/metrics-utils';

export function InsightControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGrain = searchParams.get('grain') || DATA_GRAINS.DAILY;
  const currentRange = searchParams.get('range') || DATA_RANGES['30D'];

  const handleUpdate = (key: 'grain' | 'range', value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'range') {
      params.set('range', value);
      params.set('grain', getValidGrainForRange(currentGrain, value));
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const grainOptions = [
    { id: DATA_GRAINS.DAILY, label: 'Day' },
    { id: DATA_GRAINS.WEEKLY, label: 'Week' },
    { id: DATA_GRAINS.MONTHLY, label: 'Month' },
  ];

  const rangeOptions = [
    { id: DATA_RANGES['7D'], label: '7D' },
    { id: DATA_RANGES['30D'], label: '30D' },
    { id: DATA_RANGES['90D'], label: '90D' },
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
          {grainOptions.map((g) => {
            const disabled = isGrainIncompatible(g.id, currentRange);
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
          {rangeOptions.map((r) => (
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
