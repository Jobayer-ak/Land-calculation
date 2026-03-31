/* eslint-disable react/no-unescaped-entities */
// app/privacy/page.tsx
import {
  CheckCircle,
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
} from 'lucide-react';
// import Link from 'next/link';

export const metadata = {
  title: 'গোপনীয়তা নীতি | ভূমি হিসেব ক্যালকুলেটর',
  description:
    'আমাদের গোপনীয়তা নীতি সম্পর্কে জানুন। আপনার তথ্য কীভাবে সংগ্রহ, ব্যবহার ও সুরক্ষিত করা হয়।',
};

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-green-800 to-green-900 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              গোপনীয়তা নীতি
            </h1>
            <p className="text-gray-200">
              আপনার ব্যক্তিগত তথ্যের সুরক্ষা ও গোপনীয়তা আমাদের কাছে সর্বোচ্চ
              গুরুত্বপূর্ণ
            </p>
            <p className="text-sm text-gray-300 mt-4">
              সর্বশেষ হালনাগাদ: {currentDate}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ভূমিকা</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ভূমি হিসেব ক্যালকুলেটর ("আমরা", "আমাদের", "আমাদের ওয়েবসাইট")
              আপনার গোপনীয়তাকে অত্যন্ত গুরুত্ব দেয়। এই গোপনীয়তা নীতিতে আমরা
              বর্ণনা করেছি যে আমরা আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ, ব্যবহার,
              সংরক্ষণ এবং সুরক্ষা করি।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমাদের ওয়েবসাইট ব্যবহার করে, আপনি এই নীতির শর্তাবলীতে সম্মতি
              প্রদান করছেন। দয়া করে এই নীতি মনোযোগ সহকারে পড়ুন।
            </p>
          </div>

          {/* What Information We Collect */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                আমরা কী তথ্য সংগ্রহ করি
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  ব্যক্তিগত তথ্য:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>নাম ও পদবি</li>
                  <li>ইমেইল ঠিকানা</li>
                  <li>মোবাইল নম্বর</li>
                  <li>ঠিকানা</li>
                  <li>পাসওয়ার্ড (এনক্রিপ্টেড ফরম্যাটে সংরক্ষিত)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>আইপি ঠিকানা</li>
                  <li>ব্রাউজারের ধরন ও সংস্করণ</li>
                  <li>অপারেটিং সিস্টেম</li>
                  <li>ভিজিটের সময় ও তারিখ</li>
                  <li>দেখা পৃষ্ঠাসমূহ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                আমরা তথ্য কীভাবে ব্যবহার করি
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'আপনার একাউন্ট তৈরি ও পরিচালনা করতে',
                'ক্যালকুলেটর সেবা প্রদান করতে',
                'আপনার প্রশ্নের উত্তর দিতে এবং সহায়তা প্রদান করতে',
                'সেবার মান উন্নয়ন করতে',
                'নতুন ফিচার ও আপডেট সম্পর্কে জানাতে',
                'নিরাপত্তা ও জালিয়াতি প্রতিরোধ করতে',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">তথ্য সুরক্ষা</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              আমরা আপনার ব্যক্তিগত তথ্যের সুরক্ষার জন্য সর্বোচ্চ স্তরের
              নিরাপত্তা ব্যবস্থা গ্রহণ করি:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  পাসওয়ার্ড এনক্রিপ্টেড (bcrypt) ফরম্যাটে সংরক্ষণ করা হয়
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  HTTPS প্রোটোকল ব্যবহার করে ডেটা ট্রান্সফার সুরক্ষিত
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  নিয়মিত নিরাপত্তা অডিট ও আপডেট
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  অননুমোদিত অ্যাক্সেস প্রতিরোধে ফায়ারওয়াল সুরক্ষা
                </span>
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">কুকিজ</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              আমাদের ওয়েবসাইট কুকিজ ব্যবহার করে। কুকিজ হল ছোট টেক্সট ফাইল যা
              আপনার ডিভাইসে সংরক্ষণ করা হয় এবং আমাদের সাইটের ব্যবহার উন্নত করতে
              সহায়তা করে।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আপনি আপনার ব্রাউজারের সেটিংস পরিবর্তন করে কুকিজ নিষ্ক্রিয় করতে
              পারেন, তবে এটি সাইটের কিছু ফাংশনালিটি সীমিত করতে পারে।
            </p>
          </div>

          {/* Third Party Sharing */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              তৃতীয় পক্ষের সাথে তথ্য ভাগাভাগি
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে নিম্নলিখিত
              পরিস্থিতিতে ভাগ করতে পারি:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>আইনগত প্রয়োজনীয়তা পূরণের জন্য</li>
              <li>
                আমাদের সেবা প্রদানের জন্য প্রয়োজনীয় ক্ষেত্রে (হোস্টিং, ইমেইল
                সেবা)
              </li>
              <li>আপনার অনুমতি সাপেক্ষে</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              আমরা কখনোই আপনার তথ্য বিপণন বা বিজ্ঞাপনের উদ্দেশ্যে তৃতীয় পক্ষের
              কাছে বিক্রি করি না।
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              আপনার অধিকার
            </h2>
            <ul className="space-y-3">
              {[
                'আপনার ব্যক্তিগত তথ্যে অ্যাক্সেস পাওয়ার অধিকার',
                'ভুল তথ্য সংশোধনের অধিকার',
                'আপনার তথ্য মুছে ফেলার অধিকার (অ্যাকাউন্ট ডিলিট)',
                'তথ্য প্রক্রিয়াকরণে আপত্তি জানানোর অধিকার',
                'যেকোনো সময় আপনার সম্মতি প্রত্যাহার করার অধিকার',
              ].map((right, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{right}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Children Privacy */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              শিশুদের গোপনীয়তা
            </h2>
            <p className="text-gray-600 leading-relaxed">
              আমাদের সেবা ১৩ বছরের নিচে শিশুদের জন্য নয়। আমরা ইচ্ছাকৃতভাবে ১৩
              বছরের নিচে শিশুদের কাছ থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না। যদি আপনি
              মনে করেন যে আমরা অনিচ্ছাকৃতভাবে এমন তথ্য সংগ্রহ করেছি, দয়া করে
              আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>

          {/* Policy Changes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                নীতির পরিবর্তন
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। যেকোনো
              পরিবর্তন এই পৃষ্ঠায় পোস্ট করা হবে এবং উপরের "সর্বশেষ হালনাগাদ"
              তারিখ আপডেট করা হবে। গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে আমরা ইমেইল
              বা ওয়েবসাইটে নোটিফিকেশনের মাধ্যমে আপনাকে জানাব।
            </p>
          </div>

          {/* Contact Us */}
          <div className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">যোগাযোগ করুন</h2>
            <p className="text-green-100 mb-6">
              এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন বা উদ্বেগ থাকলে, দয়া
              করে আমাদের সাথে যোগাযোগ করুন:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-200" />
                <a
                  href="mailto:privacy@landcalculator.com"
                  className="hover:underline"
                >
                  privacy@landcalculator.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-200" />
                <a href="tel:+8801234567890" className="hover:underline">
                  +৮৮০ ১২৩৪-৫৬৭৮৯০
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-200" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-green-500 text-center text-green-200 text-sm">
              <p>সাধারণত ২৪-৪৮ ঘন্টার মধ্যে উত্তর প্রদান করা হয়</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
