import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor information
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || 'direct';
        
        // Get device type
        const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : 'desktop';
        
        // Get browser info
        const getBrowser = () => {
          if (userAgent.includes('Chrome')) return 'Chrome';
          if (userAgent.includes('Firefox')) return 'Firefox';
          if (userAgent.includes('Safari')) return 'Safari';
          if (userAgent.includes('Edge')) return 'Edge';
          return 'Other';
        };

        // Insert visitor data
        const { data, error } = await supabase
          .from('visitors')
          .insert({
            user_agent: userAgent,
            referrer: referrer,
            browser: getBrowser(),
            device_type: deviceType,
          })
          .select('id')
          .single();

        if (error) {
          console.error('Error tracking visitor:', error);
        } else {
          setVisitorId(data.id);
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    trackVisitor();
  }, []);

  return visitorId;
};