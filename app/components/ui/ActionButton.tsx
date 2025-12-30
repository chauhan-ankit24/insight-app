import { cn } from '@/lib/utils/utils';
import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ElementType;
  ariaLabel?: string;
}

export function ActionButton({
  children,
  icon: Icon,
  className,
  ariaLabel,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        'group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300',
        'bg-background text-foreground',
        'active:translate-y-0 active:scale-95',
        'shadow-button hover:shadow-button-hover',
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {Icon && (
        <Icon className="h-4 w-4 text-foreground transition-colors group-hover:text-primary" />
      )}
      {children}
    </button>
  );
}
