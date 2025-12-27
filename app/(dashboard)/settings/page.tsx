'use client';

import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Bell, Languages, Palette, ShieldCheck, Mail } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-6 pb-10 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage preferences and configuration.</p>
      </div>

      <div className="grid gap-4">
        {/* Appearance */}
        <section className="bg-card/50 border-border/50 rounded-2xl border p-5 shadow-button backdrop-blur-md">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest">Appearance</h2>
              <p className="text-muted-foreground text-xs">Customize the interface look.</p>
            </div>
          </div>

          <div className="bg-muted/30 flex items-center justify-between rounded-xl p-3">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-foreground">Theme Mode</span>
              <p className="text-muted-foreground text-[11px]">Toggle between light and dark.</p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        {/* Notifications & Language Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Notifications */}
          <section className="bg-card/50 border-border/50 rounded-2xl border p-5 shadow-button">
            <div className="mb-4 flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Alerts</h2>
            </div>
            <label className="group flex cursor-pointer items-center justify-between transition-opacity hover:opacity-80">
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span className="text-xs font-semibold">Email Digest</span>
              </div>
              <input
                type="checkbox"
                className="border-border h-4 w-4 rounded-md bg-background accent-primary"
              />
            </label>
          </section>

          {/* Language */}
          <section className="bg-card/50 border-border/50 rounded-2xl border p-5 shadow-button">
            <div className="mb-4 flex items-center gap-3">
              <Languages className="h-4 w-4 text-primary" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Region</h2>
            </div>
            <select className="w-full cursor-pointer bg-transparent text-xs font-bold outline-none">
              <option value="en">English (US)</option>
              <option value="es">Spanish (ES)</option>
            </select>
          </section>
        </div>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-5 transition-all hover:bg-destructive/[0.06]">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-destructive" />
            <h2 className="text-xs font-black uppercase tracking-widest text-destructive">
              Danger Zone
            </h2>
          </div>
          <p className="text-muted-foreground mb-4 text-[11px] leading-relaxed">
            Deleting your account will permanently remove all associated data.
          </p>
          <button className="w-full rounded-xl bg-destructive py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-destructive/20 transition-transform active:scale-95">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
