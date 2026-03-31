// app/about/page.tsx
import {
  Award,
  Calculator,
  CheckCircle,
  Clock,
  Landmark,
  Mail,
  Scale,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'আমাদের সম্পর্কে | ভূমি হিসেব ক্যালকুলেটর',
  description:
    'ভূমি হিসেব ক্যালকুলেটর সম্পর্কে জানুন। আমাদের মিশন, ভিশন এবং কেন আপনি আমাদের ওয়েবসাইট ব্যবহার করবেন।',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-green-800 to-green-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              নির্ভুল জমি পরিমাপের সহজ সমাধান
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                আমাদের মিশন
              </h2>
              <p className="text-gray-600 leading-relaxed">
                বাংলাদেশের ভূমি ব্যবস্থাপনায় ডিজিটাল রূপান্তর ঘটানো। সহজ,
                নির্ভুল এবং দ্রুত জমি পরিমাপের মাধ্যমে সাধারণ মানুষ থেকে শুরু
                করে ভূমি উন্নয়ন কর্মকর্তা পর্যন্ত সবাইকে সেবা প্রদান করা।
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                আমাদের ভিশন
              </h2>
              <p className="text-gray-600 leading-relaxed">
                বাংলাদেশের সর্বাধিক নির্ভরযোগ্য এবং জনপ্রিয় ভূমি পরিমাপ
                প্ল্যাটফর্ম হয়ে ওঠা। প্রতিটি ভূমি লেনদেনে স্বচ্ছতা ও নির্ভুলতা
                নিশ্চিত করা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              কেন আমাদের বেছে নেবেন?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমরা আপনার জমি পরিমাপের অভিজ্ঞতাকে সহজ, দ্রুত এবং নির্ভুল করতে
              প্রতিশ্রুতিবদ্ধ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Calculator,
                title: 'নির্ভুল গণনা',
                description:
                  'সঠিক এবং নির্ভুল ভূমি পরিমাপের ফলাফল। ১০০% নির্ভুলতা নিশ্চিত।',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: Clock,
                title: 'দ্রুত ফলাফল',
                description:
                  'সেকেন্ডের মধ্যে আপনার জমির সঠিক পরিমাণ জানুন। সময় সাশ্রয়ী।',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Shield,
                title: 'নিরাপদ তথ্য',
                description:
                  'আপনার তথ্য সম্পূর্ণ নিরাপদ। আমরা ডেটা গোপনীয়তা নিশ্চিত করি।',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
              {
                icon: Users,
                title: 'ব্যবহারকারী বান্ধব',
                description:
                  'সহজ ইন্টারফেস, সব বয়সের মানুষের জন্য ব্যবহার উপযোগী।',
                color: 'text-orange-600',
                bg: 'bg-orange-50',
              },
              {
                icon: Landmark,
                title: 'সরকারি স্বীকৃতি',
                description:
                  'বাংলাদেশ সরকারের ভূমি মন্ত্রণালয়ের নিয়ম অনুসারে পরিমাপ।',
                color: 'text-red-600',
                bg: 'bg-red-50',
              },
              {
                icon: Scale,
                title: 'একাধিক ইউনিট',
                description:
                  'আনা, গন্ডা, কাঠা, বিঘা, একরসহ সব ধরনের ইউনিটে পরিমাপ।',
                color: 'text-teal-600',
                bg: 'bg-teal-50',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`${item.bg} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              কিভাবে কাজ করে?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              মাত্র কয়েকটি ধাপে আপনার জমির সঠিক পরিমাণ জানুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '১',
                title: 'ইউনিট নির্বাচন',
                desc: 'জমির পরিমাপের ইউনিট নির্বাচন করুন',
              },
              {
                step: '২',
                title: 'মান ইনপুট',
                desc: 'আপনার জমির পরিমাণ ইনপুট দিন',
              },
              { step: '৩', title: 'গণনা', desc: 'ক্যালকুলেট বাটনে ক্লিক করুন' },
              { step: '৪', title: 'ফলাফল', desc: 'সকল ইউনিটে ফলাফল দেখুন' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              আমাদের মূল্যবোধ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              আমরা যা বিশ্বাস করি এবং যেভাবে কাজ করি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'নির্ভুলতা', desc: '১০০% সঠিক ফলাফল নিশ্চিত করা' },
              { title: 'স্বচ্ছতা', desc: 'সবকিছু খোলামেলা এবং স্বচ্ছ' },
              { title: 'গ্রাহক সেবা', desc: '২৪/৭ গ্রাহক সহায়তা' },
              { title: 'উদ্ভাবন', desc: 'প্রযুক্তির সর্বোচ্চ ব্যবহার' },
              { title: 'সততা', desc: 'নৈতিক ও সৎ উপায়ে কাজ করা' },
              { title: 'টিমওয়ার্ক', desc: 'সবাই মিলে সম্মিলিত প্রচেষ্টা' },
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-linear-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            আরও জানতে চান?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            আমাদের সাথে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail className="h-5 w-5" />
              যোগাযোগ করুন
            </Link>
            <Link
              href="/dashboard/calculator"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              <Calculator className="h-5 w-5" />
              ক্যালকুলেটর ব্যবহার করুন
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              আমাদের টিম
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              দক্ষ ও অভিজ্ঞ টিম আপনার সেবায়
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'জনাব আবদুল করিম',
                role: 'প্রধান নির্বাহী কর্মকর্তা',
                email: 'karim@landcalculator.com',
              },
              {
                name: 'জনাব মোহাম্মদ আলী',
                role: 'প্রযুক্তি বিশেষজ্ঞ',
                email: 'ali@landcalculator.com',
              },
              {
                name: 'জনাবা ফাতেমা খাতুন',
                role: 'গ্রাহক সেবা প্রধান',
                email: 'fatema@landcalculator.com',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 text-sm mb-2">{member.role}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-500 text-sm hover:text-green-600"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
