import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PremiumBadge({ className, size = 'sm' }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-full',
      sizeClasses[size],
      className
    )}>
      <Crown className={iconSizes[size]} />
      PRO
    </span>
  );
}