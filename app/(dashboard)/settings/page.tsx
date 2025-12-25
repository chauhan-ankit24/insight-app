'use client';

import { ThemeToggle } from '../../components/ThemeToggle';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Toggle between light and dark mode
          </p>
          <ThemeToggle />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your notification preferences
          </p>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>Enable email notifications</span>
          </label>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Language</h2>
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            Select your preferred language
          </p>
          <select className="rounded border bg-white p-2 dark:bg-gray-800">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  );
}
