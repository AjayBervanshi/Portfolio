import { useIsMobile } from '@/hooks/use-mobile';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { NetworkBackground } from './NetworkBackground';

export const EnhancedThreeBackground = () => {
  const isMobile = useIsMobile();
  const { isHighEnd, isLowEnd, preferReducedMotion } = usePerformanceOptimization();

  // Use NetworkBackground for all devices - it's reliable and performant
  return (
    <div className="fixed inset-0 -z-10">
      <NetworkBackground 
        interactive={!preferReducedMotion && !isLowEnd}
        quality={isHighEnd ? 'high' : isMobile ? 'low' : 'medium'}
      />
    </div>
  );
};