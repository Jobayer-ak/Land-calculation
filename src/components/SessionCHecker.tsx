/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from './ui/toast';

export function SessionChecker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const checkInterval = useRef<NodeJS.Timeout>();

  const validateSession = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.code === 'SESSION_EXPIRED' || response.status === 401) {
          // Session invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          toast.warning(
            'Session Expired',
            'You have been logged out from another device or your session was reset.',
          );

          // Redirect to login if not already there
          if (!pathname.includes('/sign-in') && !pathname.includes('/login')) {
            router.push('/sign-in');
          }
        }
      }
    } catch (error) {
      console.error('Session validation error:', error);
    }
  };

  useEffect(() => {
    // Check immediately
    validateSession();

    // Check every 30 seconds
    checkInterval.current = setInterval(validateSession, 30000);

    return () => {
      if (checkInterval.current) {
        clearInterval(checkInterval.current);
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
