// app/contact/page.tsx
'use client';

import { toast } from '@/components/ui/toast';
import {
  Clock,
  Facebook,
  FileText,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  User,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';

// export const metadata = {
//   title: 'যোগাযোগ | ভূমি হিসেব ক্যালকুলেটর',
//   description:
//     'আমাদের সাথে যোগাযোগ করুন। আপনার যেকোনো প্রশ্ন বা মতামত আমাদের জানান।',
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success(
        'বার্তা পাঠানো হয়েছে!',
        'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ।',
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-green-800 to-green-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              যোগাযোগ করুন
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শ আমাদের জানান
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                যোগাযোগের তথ্য
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">ঠিকানা</h3>
                    <p className="text-gray-600 text-sm">
                      ভূমি হিসেব ক্যালকুলেটর
                      <br />
                      হাউস নং ১২, রোড নং ৫,
                      <br />
                      গুলশান-১, ঢাকা-১২১২, বাংলাদেশ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">ফোন</h3>
                    <p className="text-gray-600 text-sm">
                      <a
                        href="tel:+8801234567890"
                        className="hover:text-green-600 transition-colors"
                      >
                        +৮৮০ ১২৩৪-৫৬৭৮৯০
                      </a>
                      <br />
                      <a
                        href="tel:+8809876543210"
                        className="hover:text-green-600 transition-colors"
                      >
                        +৮৮০ ৯৮৭৬-৫৪৩২১০
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">ইমেইল</h3>
                    <p className="text-gray-600 text-sm">
                      <a
                        href="mailto:info@landcalculator.com"
                        className="hover:text-green-600 transition-colors"
                      >
                        info@landcalculator.com
                      </a>
                      <br />
                      <a
                        href="mailto:support@landcalculator.com"
                        className="hover:text-green-600 transition-colors"
                      >
                        support@landcalculator.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      অফিস সময়
                    </h3>
                    <p className="text-gray-600 text-sm">
                      রবিবার - বৃহস্পতিবার: সকাল ৯টা - সন্ধ্যা ৬টা
                      <br />
                      শুক্রবার - শনিবার: বন্ধ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                সোশ্যাল মিডিয়া
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-600">
                    Facebook
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors group"
                >
                  <Twitter className="h-5 w-5 text-sky-500" />
                  <span className="text-sm text-gray-700 group-hover:text-sky-500">
                    Twitter
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
                >
                  <Youtube className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-gray-700 group-hover:text-red-600">
                    YouTube
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-blue-700" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-700">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group col-span-2"
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 group-hover:text-green-600">
                    WhatsApp: +৮৮০ ১২৩৪-৫৬৭৮৯০
                  </span>
                </a>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">সহায়তা প্রয়োজন?</h3>
              <p className="text-green-100 mb-4">
                আমাদের হেল্পলাইনে কল করুন অথবা ইমেইল করুন। আমরা ২৪/৭ আপনার
                সেবায় আছি।
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>হটলাইন: ১৬৪২৫</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>help@landcalculator.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                বার্তা পাঠান
              </h2>
              <p className="text-gray-600 mb-6">
                আপনার প্রশ্ন বা মতামত লিখুন। আমরা যত দ্রুত সম্ভব উত্তর দেব।
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="আপনার পুরো নাম"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ইমেইল ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিষয় <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      <option value="general">সাধারণ প্রশ্ন</option>
                      <option value="technical">প্রযুক্তিগত সহায়তা</option>
                      <option value="feedback">মতামত ও পরামর্শ</option>
                      <option value="complaint">অভিযোগ</option>
                      <option value="partnership">সহযোগিতার প্রস্তাব</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="আপনার বার্তা এখানে লিখুন..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>বার্তা পাঠান</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                আমাদের অবস্থান
              </h2>
              <p className="text-gray-600 mt-1">
                গুগল ম্যাপে আমাদের ঠিকানা দেখুন
              </p>
            </div>
            <div className="h-96 bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902195943361!2d90.3911305!3d23.7461626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b3a4f8e2b7%3A0x8b9c7e0f2e5e5e5e!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              সচরাচর জিজ্ঞাসিত প্রশ্ন
            </h2>
            <p className="text-gray-600">
              আপনার মনে হতে পারে এমন কিছু প্রশ্নের উত্তর
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'কিভাবে ক্যালকুলেটর ব্যবহার করব?',
                a: 'প্রথমে আপনার জমির পরিমাণ এবং ইউনিট নির্বাচন করুন, তারপর "গণনা করুন" বাটনে ক্লিক করুন। ফলাফল স্বয়ংক্রিয়ভাবে দেখাবে।',
              },
              {
                q: 'ক্যালকুলেটর কি নির্ভুল?',
                a: 'হ্যাঁ, আমাদের ক্যালকুলেটর ১০০% নির্ভুল। এটি সরকারি ভূমি মন্ত্রণালয়ের নিয়ম অনুসারে তৈরি।',
              },
              {
                q: 'কি কি ইউনিটে পরিমাপ করা যায়?',
                a: 'আনা, গন্ডা, কাঠা, বিঘা, একর, শতাংশসহ সব প্রচলিত ইউনিটে পরিমাপ করা যায়।',
              },
              {
                q: 'সেবাটি কি ফ্রি?',
                a: 'হ্যাঁ, আমাদের ক্যালকুলেটর সম্পূর্ণ ফ্রি। নিবন্ধন করলেই আপনি সব ফিচার ব্যবহার করতে পারবেন।',
              },
              {
                q: 'কিভাবে একাউন্ট তৈরি করব?',
                a: 'হোম পেজে "রেজিস্টার" বাটনে ক্লিক করুন এবং প্রয়োজনীয় তথ্য প্রদান করুন।',
              },
              {
                q: 'পাসওয়ার্ড ভুলে গেলে কি করব?',
                a: 'লগইন পেজে "পাসওয়ার্ড ভুলে গেছেন?" লিংকে ক্লিক করে পাসওয়ার্ড রিসেট করুন।',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
                  <span className="text-green-600">প্রশ্ন:</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm pl-6">
                  <span className="text-blue-600">উত্তর:</span> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
