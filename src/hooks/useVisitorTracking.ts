
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
        const pageVisited = window.location.pathname + window.location.search;
        
        // Get device type
        const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? 'mobile' : 'desktop';
        
        // Get browser info
        const getBrowser = () => {
          if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
          if (userAgent.includes('Firefox')) return 'Firefox';
          if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
          if (userAgent.includes('Edg')) return 'Edge';
          if (userAgent.includes('Opera')) return 'Opera';
          return 'Other';
        };

        // Get operating system
        const getOperatingSystem = () => {
          if (userAgent.includes('Windows NT 10.0')) return 'Windows 10';
          if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
          if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
          if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
          if (userAgent.includes('Windows')) return 'Windows';
          if (userAgent.includes('Mac OS X')) {
            const match = userAgent.match(/Mac OS X (\d+_\d+)/);
            return match ? `macOS ${match[1].replace('_', '.')}` : 'macOS';
          }
          if (userAgent.includes('Linux')) return 'Linux';
          if (userAgent.includes('Android')) {
            const match = userAgent.match(/Android (\d+\.\d+)/);
            return match ? `Android ${match[1]}` : 'Android';
          }
          if (userAgent.includes('iPhone OS')) {
            const match = userAgent.match(/OS (\d+_\d+)/);
            return match ? `iOS ${match[1].replace('_', '.')}` : 'iOS';
          }
          if (userAgent.includes('iPad')) return 'iPadOS';
          return 'Unknown';
        };

        // Insert visitor data
        const { data, error } = await supabase
          .from('visitors')
          .insert({
            user_agent: userAgent,
            referrer: referrer,
            browser: getBrowser(),
            device_type: deviceType,
            operating_system: getOperatingSystem(),
            page_visited: pageVisited,
          })
          .select('id')
          .single();

        if (error) {
          console.error('Error tracking visitor:', error);
        } else {
          setVisitorId(data.id);
          console.log('Visitor tracked:', {
            id: data.id,
            browser: getBrowser(),
            os: getOperatingSystem(),
            device: deviceType,
            page: pageVisited
          });
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    trackVisitor();
  }, []);

  return visitorId;
};
