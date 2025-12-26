'use client';

import { ThemeToggle } from '@/app/components/ThemeToggle';
// import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Languages, Palette, ShieldCheck, Mail } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-8 duration-700">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and application configuration.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Section */}
        <section className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b pb-4">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-muted-foreground text-sm">
                Customize how the app looks and feels.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-sm font-medium">Interface Theme</span>
              <p className="text-muted-foreground text-xs">Switch between light and dark modes.</p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b pb-4">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-muted-foreground text-sm">
                Control when and how you receive alerts.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="group flex cursor-pointer items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                  <Mail className="text-muted-foreground h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-sm font-medium">Email Notifications</span>
                  <p className="text-muted-foreground text-xs">Receive weekly digest reports.</p>
                </div>
              </div>
              <input
                type="checkbox"
                className="border-input bg-background text-primary focus:ring-primary h-5 w-5 rounded"
              />
            </label>
          </div>
        </section>

        {/* Language & Regional Section */}
        <section className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b pb-4">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Language & Region</h2>
              <p className="text-muted-foreground text-sm">
                Set your preferred language and timezone.
              </p>
            </div>
          </div>

          <div className="max-w-xs">
            <select className="border-input bg-background ring-offset-background focus:ring-primary flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
              <option value="en">English (US)</option>
              <option value="es">Spanish (ES)</option>
              <option value="fr">French (FR)</option>
            </select>
          </div>
        </section>
      </div>

      {/* Danger Zone */}
      <section className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 rounded-xl border p-6 transition-colors">
        <div className="mb-4 flex items-center gap-3">
          <ShieldCheck className="text-destructive h-5 w-5" />
          <h2 className="text-destructive text-lg font-semibold">Account Security</h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors">
          Delete Account
        </button>
      </section>
    </div>
  );
}
