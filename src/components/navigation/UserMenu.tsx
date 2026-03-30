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
import { Calculator, History, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  fullName: string;
  email: string;
  image?: string; // optional profile image
}

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled>
          লোড হচ্ছে...
        </Button>
      </div>
    );
  }

  // ❌ Not logged in → show login button
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <Button className="bg-gray-600 text-white rounded px-3 py-1 text-lg cursor-pointer">
            লগিন
          </Button>
        </Link>
      </div>
    );
  }

  // ✅ Logged in → show avatar + dropdown
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
          <Link href="/dashboard" className="cursor-pointer">
            <History className="mr-2 h-4 w-4" />
            ড্যাশবোর্ড{' '}
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
