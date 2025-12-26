'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, PieChart, Layers } from 'lucide-react';
import { useMemo } from 'react';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = useMemo(
    () => [
      { href: '/metrics', label: 'Metrics', icon: LayoutDashboard },
      { href: '/insights', label: 'Insights', icon: PieChart },
      { href: '/projects', label: 'Projects', icon: Layers },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
    []
  );

  return (
    <aside className="bg-card z-40 hidden h-[calc(100vh-64px)] w-20 flex-col items-center border-r py-6 transition-all duration-300 md:flex">
      <nav className="flex flex-col items-center gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Check for exact match or sub-routes
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-primary' : ''
                }`}
              />

              <span
                className={`text-[10px] font-bold tracking-tight transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Line (Left Border) */}
              {isActive && (
                <div className="bg-primary absolute left-0 h-8 w-1 rounded-r-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
