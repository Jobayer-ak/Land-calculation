// components/navigation/NavLinks.tsx
'use client';

import { cn } from '@/lib/utils';
import { Calculator, Info, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  {
    href: '/dashboard/calculator',
    label: 'ক্যালকুলেটর',
    icon: Calculator,
  },
  {
    href: '/about',
    label: 'আমাদের সম্পর্কে',
    icon: Info,
  },
  {
    href: '/contact',
    label: 'যোগাযোগ',
    icon: Phone,
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
