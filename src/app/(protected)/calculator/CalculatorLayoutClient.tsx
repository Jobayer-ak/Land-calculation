/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/(protected)/calculator/CalculatorLayoutClient.tsx
'use client';

import { Calculator, History, LogOut, Menu, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import AuthProvider from './AuthProvider';

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
    { name: 'Calculator', icon: Calculator, href: '/calculator' },
    { name: 'History', icon: History, href: '/calculator/history' },
    { name: 'Settings', icon: Settings, href: '/calculator/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/sign-in');
  };

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
    <AuthProvider>
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
              <div className="space-y-3">
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
              <div className="flex flex-col items-center space-y-3">
                <div
                  className={`w-10 h-10 ${userColor} rounded-full flex items-center justify-center cursor-pointer`}
                  title={user.fullName || 'User'}
                >
                  <span className="text-white font-bold text-lg">
                    {userInitial}
                  </span>
                </div>
                <button
                  onClick={() => setIsLogoutConfirmOpen(true)}
                  className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          <main className="p-8">{children}</main>
        </div>

        {isLogoutConfirmOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsLogoutConfirmOpen(false)}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-96">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsLogoutConfirmOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthProvider>
  );
}
