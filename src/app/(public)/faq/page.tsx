/* eslint-disable react/no-unescaped-entities */
// app/terms/page.tsx
import {
  AlertTriangle,
  Calculator,
  CheckCircle,
  CreditCard,
  FileCheck,
  FileText,
  Globe,
  Lock,
  Mail,
  Phone,
  Scale,
  Shield,
  UserCheck,
  XCircle,
} from 'lucide-react';

export const metadata = {
  title: 'ব্যবহারের শর্তাবলী | ভূমি হিসেব ক্যালকুলেটর',
  description:
    'আমাদের ওয়েবসাইট ব্যবহারের শর্তাবলী সম্পর্কে জানুন। আপনার অধিকার, দায়িত্ব এবং সীমাবদ্ধতাগুলি পড়ুন।',
};

export default function TermsOfService() {
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-800 to-blue-900 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              ব্যবহারের শর্তাবলী
            </h1>
            <p className="text-gray-200">
              আমাদের প্ল্যাটফর্ম ব্যবহারের পূর্বে অনুগ্রহ করে এই শর্তাবলী
              внимательно পড়ুন
            </p>
            <p className="text-sm text-gray-300 mt-4">
              সর্বশেষ হালনাগাদ: {currentDate}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Acceptance of Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                শর্তাবলীর স্বীকৃতি
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              ভূমি হিসেব ক্যালকুলেটর ("আমরা", "আমাদের", "প্ল্যাটফর্ম") ব্যবহার
              করে, আপনি এই ব্যবহারের শর্তাবলী মেনে চলতে সম্মতি প্রদান করছেন।
              আপনি যদি এই শর্তাবলীর কোনো অংশের সাথে একমত না হন, তাহলে দয়া করে
              আমাদের প্ল্যাটফর্ম ব্যবহার করবেন না।
            </p>
            <p className="text-gray-600 leading-relaxed">
              এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত হবে এবং ব্যাখ্যা করা
              হবে।
            </p>
          </div>

          {/* Services Provided */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                প্রদত্ত সেবাসমূহ
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              আমাদের প্ল্যাটফর্ম নিম্নলিখিত সেবা প্রদান করে:
            </p>
            <ul className="space-y-3">
              {[
                'জমি পরিমাপের বিভিন্ন ইউনিটে (আনা, গন্ডা, কাঠা, বিঘা, একর, শতাংশ) নির্ভুল ক্যালকুলেশন',
                'জমির হিসাব সংরক্ষণ ও ব্যবস্থাপনা',
                'ব্যবহারকারী প্রোফাইল ও হিসাবের ইতিহাস',
                'প্রিমিয়াম সাবস্ক্রিপশন ভিত্তিক উন্নত ফিচার (ভবিষ্যতে)',
                'ভূমি সংক্রান্ত তথ্য ও নির্দেশিকা',
              ].map((service, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                ব্যবহারকারী অ্যাকাউন্ট
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  অ্যাকাউন্ট তৈরি:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  আমাদের সেবা ব্যবহারের জন্য আপনাকে একটি অ্যাকাউন্ট তৈরি করতে
                  হবে। আপনি যে তথ্য প্রদান করেন তা সঠিক, সম্পূর্ণ এবং আপ-টু-ডেট
                  হতে হবে। আপনি আপনার অ্যাকাউন্টের তথ্যের জন্য দায়ী।
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  অ্যাকাউন্ট সুরক্ষা:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  আপনি আপনার পাসওয়ার্ড এবং অ্যাকাউন্টের তথ্যের নিরাপত্তার জন্য
                  সম্পূর্ণ দায়ী। আপনার অ্যাকাউন্টের অননুমোদিত ব্যবহার সম্পর্কে
                  আমাদের তাৎক্ষণিকভাবে জানাতে হবে।
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  অ্যাকাউন্ট ডিলিট:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  আপনি যেকোনো সময় আপনার অ্যাকাউন্ট ডিলিট করতে পারেন। অ্যাকাউন্ট
                  ডিলিট করলে আপনার সংরক্ষিত তথ্য স্থায়ীভাবে মুছে ফেলা হবে।
                </p>
              </div>
            </div>
          </div>

          {/* Subscription & Payments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                সাবস্ক্রিপশন ও পেমেন্ট
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  বিনামূল্যে সেবা:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  বর্তমানে আমাদের ক্যালকুলেটর সেবা সম্পূর্ণ বিনামূল্যে। তবে
                  ভবিষ্যতে কিছু প্রিমিয়াম ফিচার সাবস্ক্রিপশনের আওতায় আনা হতে
                  পারে।
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  প্রিমিয়াম সাবস্ক্রিপশন (ভবিষ্যতে):
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>সাবস্ক্রিপশন ফি আগাম জানিয়ে দেওয়া হবে</li>
                  <li>পেমেন্ট নিরাপদ অনলাইন গেটওয়ের মাধ্যমে গ্রহণ করা হবে</li>
                  <li>
                    সাবস্ক্রিপশন স্বয়ংক্রিয়ভাবে নবায়নযোগ্য হবে (যদি না বাতিল
                    করা হয়)
                  </li>
                  <li>
                    সাবস্ক্রিপশন বাতিল করতে চাইলে পরবর্তী বিলিং চক্রের আগে
                    জানাতে হবে
                  </li>
                  <li>ব্যবহৃত সময়ের জন্য কোন রিফান্ড প্রদান করা হবে না</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  মূল্য পরিবর্তন:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  আমরা যেকোনো সময় সাবস্ক্রিপশনের মূল্য পরিবর্তন করতে পারি।
                  মূল্য পরিবর্তনের ক্ষেত্রে ব্যবহারকারীদের আগাম জানানো হবে।
                </p>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                ব্যবহারকারীর দায়িত্ব
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              আপনি নিম্নলিখিত বিষয়গুলো মেনে চলতে সম্মত হচ্ছেন:
            </p>
            <ul className="space-y-3">
              {[
                'আইনসম্মত ও নৈতিক উদ্দেশ্যে প্ল্যাটফর্ম ব্যবহার করা',
                'ভুল বা বিভ্রান্তিকর তথ্য প্রদান না করা',
                'অন্যের অ্যাকাউন্টে অনধিকার প্রবেশ না করা',
                'প্ল্যাটফর্মের নিরাপত্তা ব্যবস্থা ভঙ্গ না করা',
                'অটোমেটেড স্ক্রিপ্ট বা বট ব্যবহার না করে কেবল ম্যানুয়ালি প্ল্যাটফর্ম ব্যবহার করা',
                'ক্যালকুলেশনের ফলাফল ব্যবহারের পূর্বে যাচাই করা',
              ].map((responsibility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                নিষিদ্ধ কার্যক্রম
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'হ্যাকিং, ভাইরাস বা ক্ষতিকর কোড ছড়ানো',
                'সার্ভার ওভারলোড করার উদ্দেশ্যে অতিরিক্ত রিকোয়েস্ট পাঠানো',
                'অবৈধ বা প্রতারণামূলক কার্যক্রমে প্ল্যাটফর্ম ব্যবহার করা',
                'আমাদের কপিরাইট বা ট্রেডমার্ক লঙ্ঘন করা',
                'অন্যের ব্যক্তিগত তথ্য সংগ্রহ করা',
                'প্ল্যাটফর্মের কোনো অংশ রিভার্স ইঞ্জিনিয়ারিং বা ডিকম্পাইল করা',
              ].map((activity, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accuracy of Calculations */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                গণনার নির্ভুলতা
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              আমরা আমাদের ক্যালকুলেটর যতটা সম্ভব নির্ভুল করার চেষ্টা করি। তবে:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>
                ক্যালকুলেশনের ফলাফল শুধুমাত্র তথ্যগত উদ্দেশ্যে প্রদান করা হয়
              </li>
              <li>
                আমরা ফলাফলের উপর নির্ভর করে নেওয়া কোনো সিদ্ধান্তের জন্য
                আইনগতভাবে দায়ী নই
              </li>
              <li>
                ভূমি সংক্রান্ত গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে সরকারি ভূমি
                অফিস বা বিশেষজ্ঞের সাথে পরামর্শ করার পরামর্শ দেওয়া হয়
              </li>
              <li>ক্যালকুলেশন পদ্ধতি ও সূত্র সময়ে সময়ে আপডেট হতে পারে</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                বৌদ্ধিক সম্পত্তি
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              প্ল্যাটফর্মের সমস্ত কন্টেন্ট, সফটওয়্যার, ডিজাইন, লোগো, টেক্সট,
              গ্রাফিক্স এবং কোড আমাদের মালিকানাধীন এবং কপিরাইট আইন দ্বারা
              সুরক্ষিত।
            </p>
            <p className="text-gray-600 leading-relaxed">
              আমাদের পূর্ব লিখিত অনুমতি ছাড়া প্ল্যাটফর্মের কোনো অংশ কপি,
              পরিবর্তন, বা পুনঃপ্রকাশ করা যাবে না।
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                দায়িত্বের সীমাবদ্ধতা
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              সর্বোচ্চ আইনগত সীমার মধ্যে, আমরা নিম্নলিখিত বিষয়গুলোর জন্য দায়ী
              থাকব না:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>ক্যালকুলেশন ফলাফলের ভুল বা অসম্পূর্ণতার জন্য</li>
              <li>সার্ভার ডাউনটাইম বা প্রযুক্তিগত সমস্যার জন্য</li>
              <li>আপনার তথ্যের অননুমোদিত অ্যাক্সেস বা ব্যবহারের জন্য</li>
              <li>তৃতীয় পক্ষের মাধ্যমে ঘটিত কোনো ক্ষতির জন্য</li>
              <li>সাবস্ক্রিপশন বাতিল বা পরিবর্তনের ফলে ক্ষতির জন্য</li>
            </ul>
          </div>

          {/* Account Suspension */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                অ্যাকাউন্ট স্থগিত ও বাতিল
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-3">
              আমরা নিম্নলিখিত ক্ষেত্রে আপনার অ্যাকাউন্ট স্থগিত বা বাতিল করতে
              পারি:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>শর্তাবলী লঙ্ঘন করলে</li>
              <li>জালিয়াতি বা প্রতারণামূলক কার্যকলাপে জড়িত থাকলে</li>
              <li>অন্য ব্যবহারকারীদের ক্ষতি করার চেষ্টা করলে</li>
              <li>আইনগত প্রয়োজনীয়তা পূরণে</li>
              <li>অবৈতনিক সাবস্ক্রিপশন ফি থাকলে</li>
            </ul>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              শর্তাবলীর পরিবর্তন
            </h2>
            <p className="text-gray-600 leading-relaxed">
              আমরা যেকোনো সময় এই শর্তাবলী আপডেট বা পরিবর্তন করতে পারি।
              পরিবর্তনগুলি এই পৃষ্ঠায় পোস্ট করা হবে এবং উপরের "সর্বশেষ
              হালনাগাদ" তারিখ আপডেট করা হবে। গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে
              আমরা ইমেইল বা ওয়েবসাইটে নোটিফিকেশনের মাধ্যমে আপনাকে জানাব।
            </p>
          </div>

          {/* Contact */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">যোগাযোগ করুন</h2>
            <p className="text-blue-100 mb-6">
              এই ব্যবহারের শর্তাবলী সম্পর্কে আপনার কোনো প্রশ্ন বা উদ্বেগ থাকলে,
              দয়া করে আমাদের সাথে যোগাযোগ করুন:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <a
                  href="mailto:legal@landcalculator.com"
                  className="hover:underline"
                >
                  legal@landcalculator.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <a href="tel:+8801234567890" className="hover:underline">
                  +৮৮০ ১২৩৪-৫৬৭৮৯০
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-200" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-500 text-center text-blue-200 text-sm">
              <p>সাধারণত ২৪-৪৮ ঘন্টার মধ্যে উত্তর প্রদান করা হয়</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
