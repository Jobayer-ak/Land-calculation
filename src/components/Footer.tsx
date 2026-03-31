// components/Footer.tsx
import {
  Calculator,
  Facebook,
  HelpCircle,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-700">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ভূমি হিসেব ক্যালকুলেটর
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              বাংলাদেশের জমি পরিমাপের জন্য নির্ভরযোগ্য অনলাইন ক্যালকুলেটর। সহজে
              আনা, গন্ডা, কাঠা, বিঘা এবং একর হিসাব করুন।
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <span>হোম</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/calculator"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  <span>ক্যালকুলেটর</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>কিভাবে ব্যবহার করবেন</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>যোগাযোগ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Land Measurement Units */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              জমির পরিমাপ
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>১ কাঠা</span>
                <span className="text-gray-700">= ৭২০ বর্গফুট</span>
              </li>
              <li className="flex justify-between">
                <span>১ বিঘা</span>
                <span className="text-gray-700">= ২০ কাঠা</span>
              </li>
              <li className="flex justify-between">
                <span>১ একর</span>
                <span className="text-gray-700">= ১০০ শতাংশ</span>
              </li>
              <li className="flex justify-between">
                <span>১ শতাংশ</span>
                <span className="text-gray-700">= ৪৩৫.৬ বর্গফুট</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              যোগাযোগ
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm">ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href="mailto:info@landcalculator.com"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  info@landcalculator.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  +৮৮০ ১২৩৪-৫৬৭৮৯০
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-400 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-gray-700 font-semibold mb-1">নিউজলেটার</h4>
              <p className="text-sm text-gray-600">
                আপডেট পেতে আপনার ইমেইল দিন
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="flex-1 md:w-64 px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
              />
              <button className="ml-1 px-4 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-r transition-colors text-sm font-medium cursor-pointer">
                সাবস্ক্রাইব
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-400 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-700">
              &copy; ২০১৯ ভূমি হিসেব ক্যালকুলেটর. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-700 hover:text-blue-400 transition-colors"
              >
                গোপনীয়তা নীতি
              </Link>
              <Link
                href="/terms"
                className="text-gray-700 hover:text-blue-400 transition-colors"
              >
                ব্যবহারের শর্তাবলী
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-blue-400 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
