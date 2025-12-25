'use client';

import { ThemeToggle } from '../ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white p-4 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Insight App</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Logout</button>
      </div>
    </header>
  );
}
