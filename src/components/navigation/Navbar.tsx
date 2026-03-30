/* eslint-disable @typescript-eslint/no-unused-vars */
// components/navigation/Navbar.tsx
'use client';

import { cn } from '@/lib/utils';
import { Calculator } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLink';
import { UserMenu } from './UserMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show navbar on auth pages
  // const isAuthPage = pathname?.startsWith('/auth');
  // if (isAuthPage) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-white shadow-sm',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Calculator className="h-7 w-7 text-primary transition-transform group-hover:scale-105" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              ভূমি হিসেব ক্যালকুলেটর
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <NavLinks />

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <UserMenu />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
