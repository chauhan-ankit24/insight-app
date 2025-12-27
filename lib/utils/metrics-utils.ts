import { DATA_GRAINS } from '@/app/constants';

export const isGrainIncompatible = (grainId: string, rangeDays: string | number) => {
  const days = typeof rangeDays === 'string' ? parseInt(rangeDays) : rangeDays;

  if (days <= 7 && (grainId === DATA_GRAINS.WEEKLY || grainId === DATA_GRAINS.MONTHLY)) return true;
  if (days <= 30 && grainId === DATA_GRAINS.MONTHLY) return true;

  return false;
};

export const getValidGrainForRange = (currentGrain: string, newRange: string) => {
  if (isGrainIncompatible(currentGrain, newRange)) {
    return DATA_GRAINS.DAILY;
  }
  return currentGrain;
};
