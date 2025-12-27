'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, memo } from 'react';
import { NAV_LINKS } from '@/app/constants';
import { motion } from 'framer-motion';
import { NavLink } from '@/lib/types/metrics';

const NavItem = memo(({ item, isActive }: { item: NavLink; isActive: boolean }) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200"
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-xl bg-primary/10"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      <Icon
        fill="currentColor"
        className={`visible relative z-10 h-5 w-5 fill-transparent transition-all duration-300 group-hover:scale-110 group-hover:stroke-[2.5px] ${
          isActive ? 'fill-foreground/20 stroke-[2.5px] text-foreground' : 'text-muted-foreground'
        } `}
      />

      <span
        className={`relative z-10 text-[10px] font-bold tracking-tight transition-colors group-hover:scale-110 ${
          isActive ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        {item.label}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 h-8 w-1 rounded-r-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
});

NavItem.displayName = 'NavItem';

export function Sidebar() {
  const pathname = usePathname();
  const menuItems = useMemo(() => NAV_LINKS, []);

  return (
    <aside className="sticky top-16 z-40 hidden h-[calc(100vh-64px)] w-20 flex-col items-center justify-center bg-header shadow-button transition-all duration-300 sm:flex">
      <nav className="flex flex-col items-center gap-4 py-8">
        {menuItems.map((item) => (
          <NavItem key={item.href} item={item} isActive={pathname.startsWith(item.href)} />
        ))}
      </nav>
    </aside>
  );
}
