// src/app/(protected)/calculator/AuthProvider.tsx
'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');

      console.log('🔵 AuthProvider - Token found:', !!token);

      if (!token) {
        console.log('❌ No token found, redirecting to login');
        router.push('/sign-in');
        return;
      }

      try {
        console.log('🔵 Verifying token with backend...');
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('🔵 Verify response status:', response.status);
        console.log('🔵 Verify response data:', data);

        if (response.ok && data.success) {
          console.log('✅ Token is valid, user authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('❌ Token is invalid:', data.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('❌ Auth verification error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
