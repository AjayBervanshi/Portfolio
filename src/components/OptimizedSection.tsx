import React, { memo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface OptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animationDelay?: number;
  threshold?: number;
}

export const OptimizedSection = memo<OptimizedSectionProps>(({
  children,
  className,
  id,
  animationDelay = 0,
  threshold = 0.1,
}) => {
  const { ref, isVisible, hasBeenVisible } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'transition-opacity duration-700',
        hasBeenVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        animationDelay: hasBeenVisible ? `${animationDelay}ms` : undefined,
      }}
    >
      {hasBeenVisible ? children : <div className="min-h-[200px]" />}
    </section>
  );
});

OptimizedSection.displayName = 'OptimizedSection';