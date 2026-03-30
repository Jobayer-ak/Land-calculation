/* eslint-disable @typescript-eslint/no-explicit-any */
// components/navigation/MobileNav.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  Calculator,
  History,
  Info,
  LogOut,
  Menu,
  Phone,
  Settings,
  User,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const mobileNavLinks = [
  { href: '/calculator', label: 'ক্যালকুলেটর', icon: Calculator },
  { href: '/history', label: 'ইতিহাস', icon: History },
  { href: '/about', label: 'আমাদের সম্পর্কে', icon: Info },
  { href: '/contact', label: 'যোগাযোগ', icon: Phone },
  { href: '/settings', label: 'সেটিংস', icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in
  const isLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem('token');

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setOpen(false);
    router.push('/auth/sign-in');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">মেনু</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {mobileNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className={cn(
                      'flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Section */}
            <div className="mt-6 pt-4 border-t mx-2">
              {isLoggedIn ? (
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">প্রোফাইল</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">লগআউট</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-2">
                  <Button
                    onClick={() => handleNavigation('/auth/sign-in')}
                    variant="outline"
                    className="w-full"
                  >
                    সাইন ইন
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/auth/sign-up')}
                    className="w-full"
                  >
                    রেজিস্টার
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
