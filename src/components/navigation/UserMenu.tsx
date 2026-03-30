'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calculator, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  image?: string;
}

export function UserMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load user from localStorage
  const loadUser = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user on mount and when route changes (to catch logout redirects)
  useEffect(() => {
    loadUser();
  }, [pathname]); // Re-run when route changes

  // Listen for storage events (in case localStorage changes in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'token') {
        loadUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Immediately update state
    router.push('/sign-in');
  };

  // Get initials for fallback avatar
  const getUserInitials = () => {
    if (!user) return 'U';

    return user.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled>
          লোড হচ্ছে...
        </Button>
      </div>
    );
  }

  // Not logged in → show login button
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <Button className="bg-gray-700 hover:bg-gray-900 text-white rounded px-4 py-2 text-sm cursor-pointer transition-colors">
            লগিন
          </Button>
        </Link>
      </div>
    );
  }

  // Logged in → show avatar + dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src={user.image || ''} alt={user.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            {user.role && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                {user.role === 'admin' ? 'অ্যাডমিন' : 'ইউজার'}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard/calculator" className="cursor-pointer">
            <Calculator className="mr-2 h-4 w-4" />
            ক্যালকুলেটর
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            প্রোফাইল
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          লগআউট
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
