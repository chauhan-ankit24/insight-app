'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function InsightControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get current values from URL or defaults
  const grain = searchParams.get('grain') || 'daily';
  const range = searchParams.get('range') || '30';

  // 2. The "Pass Data" function via URL
  const handleUpdate = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    // This updates the URL without a full page reload
    // Next.js recognizes the change and re-runs the Server Component (page.tsx)
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex rounded-md bg-gray-100 p-1">
        {['daily', 'weekly', 'monthly'].map((g) => (
          <button
            key={g}
            onClick={() => handleUpdate('grain', g)}
            className={`rounded px-3 py-1 text-sm ${
              grain === g ? 'bg-white text-blue-600 shadow' : 'text-gray-500'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <select
        value={range}
        onChange={(e) => handleUpdate('range', e.target.value)}
        className="rounded border px-2 py-1 text-sm"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>
    </div>
  );
}
