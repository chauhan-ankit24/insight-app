'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { NAV_LINKS } from '@/app/constants';
import { motion } from 'framer-motion';

export function Sidebar() {
  const pathname = usePathname();
  const menuItems = useMemo(() => NAV_LINKS, []);

  return (
    <aside className="sticky top-16 z-40 hidden h-[calc(100vh-64px)] w-20 flex-col items-center justify-center bg-header shadow-button transition-all duration-300 sm:flex">
      <nav className="flex flex-col items-center gap-4 py-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200"
            >
              {/* 2. Smooth Background Transition */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                fill="currentColor"
                className={`visible relative z-10 h-5 w-5 fill-transparent transition-all duration-300 group-hover:scale-110 group-hover:stroke-[2.5px] ${isActive ? 'text-foregound fill-foregound/20 stroke-[2.5px]' : 'text-muted-foreground'} `}
              />

              <span
                className={`relative z-10 text-[10px] font-bold tracking-tight transition-colors group-hover:scale-110 ${
                  isActive ? 'text-foregound' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>

              {/* 3. Smooth Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 h-8 w-1 rounded-r-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
