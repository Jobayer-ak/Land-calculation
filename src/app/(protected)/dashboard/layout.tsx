/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(protected)/calculator/CalculatorLayoutClient.tsx
'use client';

import { Calculator, LogOut, Menu, Settings, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function CalculatorLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get user from localStorage on client side only
  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('user role is: ', userData);
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseMenuItems = [
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
    ];

    // Show user list for admin OR moderator
    if (user && (user.role === 'admin' || user.role === 'moderator')) {
      baseMenuItems.push({
        name: 'ইউজার লিস্ট',
        icon: Users,
        href: '/dashboard/users',
      });
    }

    return baseMenuItems;
  };

  const menuItems = getMenuItems();

  const userInitial = user?.fullName
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

  // Get role display text in Bengali
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'অ্যাডমিন';
      case 'moderator':
        return 'মডারেটর';
      default:
        return 'ইউজার';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <aside
        className={`bg-yellow-100 shadow-xl transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed h-full z-10 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-lg font-bold text-gray-700">
              ভূমি হিসেব ক্যালকুলেটর
            </h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-৭00 hover:text-white cursor-pointer"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 border-b shadow-xl transition-colors ${isActive ? ' text-white' : 'text-gray-700  hover:bg-gray-500 hover:text-white'}`}
                  >
                    <Icon className="h-5 w-5" />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-300 p-4">
          {isSidebarOpen ? (
            <div className="space-y-10">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${userColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">
                    {userInitial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium text-gray-700 truncate">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-sm text-blue-700 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                  {/* Show role badge */}
                  {user?.role && (
                    <p className="text-sm text-blue-700 mt-1">
                      {getRoleDisplay(user.role)}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
              >
                <LogOut className="h-4 w-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-10 h-10 ${userColor} rounded-full flex items-center justify-center cursor-pointer`}
                title={user?.fullName || 'User'}
              >
                <span className="text-white font-bold text-lg">
                  {userInitial}
                </span>
              </div>
              {/* Show role indicator for collapsed sidebar for both admin and moderator */}
              {(user?.role === 'admin' || user?.role === 'moderator') && (
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  title={user?.role === 'admin' ? 'Admin' : 'Moderator'}
                />
              )}
            </div>
          )}
        </div>
      </aside>

      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        <main className="p-2">{children}</main>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutConfirmOpen(false);
                  // Clear localStorage
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  // Redirect to login
                  router.push('/sign-in');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
