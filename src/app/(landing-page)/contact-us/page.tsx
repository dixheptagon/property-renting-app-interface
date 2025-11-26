import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-3 py-35">
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
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-100">
              Have questions about our properties or need assistance? We&apos;re
              here to help you find your perfect stay.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Information Cards */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
                    Contact Information
                  </h2>
                  <p className="text-gray-600">
                    We&apos;re available to answer your questions and provide
                    assistance with your property needs.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {/* Email Card */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Email
                    </h3>
                    <p className="mb-1 font-medium text-gray-900">
                      support@staysia.com
                    </p>
                    <p className="text-sm text-gray-500">
                      We respond within 24 hours
                    </p>
                  </div>

                  {/* Phone Card */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Phone
                    </h3>
                    <p className="mb-1 font-medium text-gray-900">
                      +62 812-123-1234
                    </p>
                    <p className="text-sm text-gray-500">
                      Mon-Fri 9 AM-6 PM EST
                    </p>
                  </div>

                  {/* Office Card */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1 xl:col-span-2">
                    <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Office
                    </h3>
                    <p className="text-gray-600">ID, Jakarta</p>
                  </div>
                </div>
              </div>

              {/* Why Choose Staysia Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl bg-linear-to-br from-blue-500 via-blue-600 to-blue-800 p-8 shadow-xl">
                  <h3 className="mb-6 text-2xl font-bold text-white">
                    Why Choose Staysia?
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-white">24/7 customer support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-white">
                        Verified property listings
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-white">Secure booking process</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <span className="text-xs text-white">✓</span>
                      </div>
                      <span className="text-white">Best price guarantee</span>
                    </li>
                  </ul>
                  <div className="mt-8 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-sm text-white/90">
                      Join thousands of satisfied customers who trust Staysia
                      for their accommodation needs.
                    </p>
                  </div>
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
