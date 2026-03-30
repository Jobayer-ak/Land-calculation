/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(protected)/calculator/CalculatorLayoutClient.tsx
'use client';

import { Calculator, LogOut, Menu, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
// import AuthProvider from './AuthProvider';

export default function CalculatorLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  // Get user from localStorage on client side only
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    {
      name: 'আনা গন্ডা ক্যালকুলেটর',
      icon: Calculator,
      href: '/dashboard/calculator',
    },

    {
      name: 'সেটিংস',
      icon: Settings,
      href: '/dashboard/settings',
    },
    {
      name: 'ইউজার লিস্ট',
      icon: Settings,
      href: '/dashboard/users',
    },
  ];

  const userInitial = user.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : 'U';
  const userColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  const userColor =
    userColors[Math.abs(userInitial.charCodeAt(0) - 65) % userColors.length];

  // Wrap with AuthProvider to protect all calculator pages
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-linear-to-b from-gray-900 to-gray-800 shadow-xl transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed h-full z-10 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-white">Land Calculator</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                  >
                    <Icon className="h-5 w-5" />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-700 p-4">
          {isSidebarOpen ? (
            <div className="space-y-7">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${userColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">
                    {userInitial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mb-5">
              <div
                className={`w-10 h-15 ${userColor} rounded-full flex items-center justify-center cursor-pointer`}
                title={user.fullName || 'User'}
              >
                <span className="text-white font-bold text-lg">
                  {userInitial}
                </span>
              </div>
              {/* <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button> */}
            </div>
          )}
        </div>
      </aside>

      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
}
