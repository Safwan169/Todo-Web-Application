'use client';
import { useAuthContext } from '@/context/Context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && pathname === '/') {
      if (user) {
        router.replace('/todo');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router, pathname]);

  if (pathname === '/' && !loading) {
    return null;
  }

  return null;
}
