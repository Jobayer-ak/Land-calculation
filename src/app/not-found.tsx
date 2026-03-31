// app/not-found.tsx
'use client';

import {
  ArrowLeft,
  Calculator,
  Compass,
  HelpCircle,
  Home,
  Landmark,
  MapPin,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div
          className={`text-center transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <div className="text-[120px] md:text-[180px] font-black leading-none">
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent animate-pulse">
                4
              </span>
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent animate-pulse delay-100">
                0
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent animate-pulse delay-200">
                4
              </span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-green-500/10 rounded-full blur-2xl"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              ওহ! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে
              অথবা সাময়িকভাবে অনুপলব্ধ।
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="সাইটে খুঁজুন..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                খুঁজুন
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all transform hover:scale-105 shadow-md"
            >
              <Home className="h-5 w-5" />
              <span>হোম পেজে ফিরুন</span>
            </Link>
            <Link
              href="/dashboard/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
            >
              <Calculator className="h-5 w-5" />
              <span>ক্যালকুলেটর ব্যবহার করুন</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 shadow-md"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>পূর্ববর্তী পৃষ্ঠায় যান </span>
            </button>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <Link href="/about" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Landmark className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                    আমাদের সম্পর্কে
                  </p>
                  <p className="text-xs text-gray-500">জানুন আমাদের সম্পর্কে</p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <Link href="/contact" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    যোগাযোগ করুন
                  </p>
                  <p className="text-xs text-gray-500">
                    আমাদের সাথে যোগাযোগ করুন
                  </p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <Link
                href="/dashboard/calculator"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Calculator className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                    ক্যালকুলেটর
                  </p>
                  <p className="text-xs text-gray-500">জমি পরিমাপ করুন</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

        {/* Compass Icon Animation */}
        <div className="hidden md:block absolute bottom-20 right-20 animate-bounce">
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Compass className="h-8 w-8 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Map Pin Icon Animation */}
        <div className="hidden md:block absolute top-32 left-20 animate-pulse">
          <div className="relative">
            <MapPin className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
