import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import {
  FileText,
  Scale,
  Users,
  CreditCard,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import Image from "next/image";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-green-50">
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
              <div className="bg-whiterounded-full p-4">
                <Scale className="h-24 w-24 rounded-full bg-green-600 p-4 text-white" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Terms of <span className="text-green-600">Service</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-100">
              Please read these terms carefully before using our property rental
              services.
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
                  <FileText className="mr-3 h-6 w-6 text-green-600" />
                  Acceptance of Terms
                </h2>
                <p className="mb-6 text-gray-700">
                  By accessing and using Staysia&apos;s services, you accept and
                  agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <Users className="mr-3 h-6 w-6 text-blue-600" />
                  User Accounts
                </h2>
                <p className="mb-6 text-gray-700">
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. You are responsible for safeguarding the password and
                  for all activities that occur under your account.
                </p>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <CreditCard className="mr-3 h-6 w-6 text-purple-600" />
                  Bookings and Payments
                </h2>
                <ul className="mb-6 space-y-2 text-gray-700">
                  <li>
                    • All bookings are subject to availability and confirmation
                  </li>
                  <li>• Payment must be made in full at the time of booking</li>
                  <li>
                    • Cancellations must be made according to our cancellation
                    policy
                  </li>
                  <li>
                    • Refunds will be processed according to the applicable
                    policy
                  </li>
                  <li>
                    • We reserve the right to cancel bookings due to unforeseen
                    circumstances
                  </li>
                </ul>

                <h2 className="mt-12 mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
                  User Responsibilities
                </h2>
                <p className="mb-6 text-gray-700">
                  You agree to use our services only for lawful purposes and in
                  accordance with these Terms. You are responsible for
                  maintaining the confidentiality of your account and password.
                </p>

                <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
                  Prohibited Activities
                </h2>
                <ul className="mb-6 space-y-2 text-gray-700">
                  <li>• Using the service for any illegal purpose</li>
                  <li>
                    • Attempting to gain unauthorized access to our systems
                  </li>
                  <li>
                    • Interfering with the proper functioning of our services
                  </li>
                  <li>
                    • Posting harmful, offensive, or inappropriate content
                  </li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>

                <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
                  Limitation of Liability
                </h2>
                <p className="mb-6 text-gray-700">
                  In no event shall Staysia be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  arising out of or relating to your use of our services.
                </p>

                <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
                  Contact Information
                </h2>
                <p className="mb-6 text-gray-700">
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <div className="rounded-lg bg-gray-50 p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@staysia.com
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
