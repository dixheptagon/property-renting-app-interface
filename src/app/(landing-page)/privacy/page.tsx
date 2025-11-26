import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import { Shield, Eye, Lock, Users, FileText, Calendar } from "lucide-react";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-3 py-20">
          {/* Background Image */}
          <Image
            src="/background/landing-page.jpg"
            alt="background"
            width={1080}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Content */}

          <div className="relative mx-auto max-w-7xl rounded-2xl bg-white/25 p-4 text-center shadow-2xl shadow-blue-700/80 backdrop-blur-md sm:p-6 lg:p-8">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-blue-100 p-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-100">
              Your privacy is important to us. Learn how we collect, use, and
              protect your personal information.
            </p>
            <p className="mt-4 text-sm text-amber-100">
              Last updated: <Calendar className="mr-1 inline h-4 w-4" />
              November 19, 2024
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white p-8 shadow-xl md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <Eye className="mr-3 h-6 w-6 text-blue-600" />
                  Information We Collect
                </h2>
                <p className="mb-6 text-gray-700">
                  We collect information you provide directly to us, such as
                  when you create an account, make a booking, or contact us for
                  support. This may include your name, email address, phone
                  number, payment information, and property preferences.
                </p>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <Lock className="mr-3 h-6 w-6 text-green-600" />
                  How We Use Your Information
                </h2>
                <ul className="mb-6 space-y-2 text-gray-700">
                  <li>
                    • To provide and maintain our property rental services
                  </li>
                  <li>• To process bookings and payments</li>
                  <li>• To communicate with you about your reservations</li>
                  <li>
                    • To send you marketing communications (with your consent)
                  </li>
                  <li>• To improve our services and develop new features</li>
                  <li>• To comply with legal obligations</li>
                </ul>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <Users className="mr-3 h-6 w-6 text-purple-600" />
                  Information Sharing
                </h2>
                <p className="mb-6 text-gray-700">
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  described in this policy. We may share your information with
                  trusted service providers who assist us in operating our
                  website and conducting our business.
                </p>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <FileText className="mr-3 h-6 w-6 text-orange-600" />
                  Data Security
                </h2>
                <p className="mb-6 text-gray-700">
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission
                  over the internet is 100% secure.
                </p>

                <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
                  Your Rights
                </h2>
                <p className="mb-6 text-gray-700">
                  You have the right to access, update, or delete your personal
                  information. You may also opt out of marketing communications
                  at any time. To exercise these rights, please contact us using
                  the information provided below.
                </p>

                <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
                  Contact Us
                </h2>
                <p className="mb-6 text-gray-700">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="rounded-lg bg-gray-50 p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@staysia.com
                    <br />
                    <strong>Phone:</strong> +62 812-123-1234
                    <br />
                    <strong>Address:</strong> ID, Jakarta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
