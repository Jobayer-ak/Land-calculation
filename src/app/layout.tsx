import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '../components/Footer';
import { Navbar } from '../components/navigation/Navbar';
import { SessionChecker } from '../components/SessionCHecker';
import { ToastContainer } from '../components/ui/toast';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Land Calculator | আনা-গন্ডা ক্যালকুলেটর',
  description: 'Land calculation application for Anna-Gonda measurements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#2c2638] min-h-screen flex flex-col justify-between`}
        suppressHydrationWarning
      >
        <SessionChecker>
          <Navbar />
          {children}
          <ToastContainer />
          <Footer />
          {/* <footer className="w-full text-center mt-3 py-4 bg-gray-300">
            <p className="text-sm text-gray-900">
              <span className="italic text-blue-700">
                All rights reserved by{' '}
              </span>
              <span className="text-blue-600">© </span>
              ভূমি হিসেব ক্যালকুলেটর{' '}
            </p>
          </footer> */}
        </SessionChecker>
      </body>
    </html>
  );
}
