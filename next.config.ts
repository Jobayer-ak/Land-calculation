// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // স্ট্যাটিক HTML এক্সপোর্টের জন্য বাধ্যতামূলক
  images: {
    unoptimized: true, // ইমেজ অপ্টিমাইজেশন বন্ধ
  },
  trailingSlash: true, // URL-এর শেষে স্ল্যাশ যোগ করবে
  // important: assetPrefix ব্যবহার করবেন না
};

export default nextConfig;
