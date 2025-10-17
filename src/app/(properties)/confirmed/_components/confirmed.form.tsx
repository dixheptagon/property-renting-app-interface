import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Mail,
  Phone,
  User,
  QrCode,
  MessageCircle,
  Headphones,
} from "lucide-react";

export default function ConfirmedForm() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Success Banner */}
      <div className="mb-6 hidden items-center gap-3 rounded-xl bg-green-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
        <CheckCircle className="h-8 w-8 flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
          <p className="text-sm text-green-50">
            Your reservation has been successfully processed
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Order ID */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <h2 className="text-2xl font-bold text-gray-900">[ORDER-1XXXX]</h2>
          </div>
          <div className="rounded-full bg-green-100 px-4 py-2">
            <span className="text-sm font-semibold text-green-700">
              Confirmed
            </span>
          </div>
        </div>

        {/* QR Code and Instructions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex h-64 w-full items-center justify-center rounded-2xl bg-blue-500 bg-gradient-to-br p-6 shadow-lg transition-transform hover:scale-105">
              <QrCode className="h-32 w-32 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white opacity-10"></div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Save or screenshot this QR code for check-in
            </p>
          </div>

          {/* Instructions Section */}
          <div className="flex flex-col justify-center space-y-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              Important Instructions
            </h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  1
                </span>
                <span className="leading-relaxed">
                  <strong>Check-in:</strong> From 2:00 PM |{" "}
                  <strong>Check-out:</strong> Before 12:00 PM
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                  2
                </span>
                <span className="leading-relaxed">
                  Present this ticket and your ID when checking in
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Guest Information */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <User className="h-5 w-5 text-blue-500" />
            Guest Information
          </h3>
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">[GUEST NAME]</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-900">[GUEST EMAIL]</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-semibold text-gray-900">[GUEST PHONE]</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Have questions? We're here to help!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="flex items-center gap-2 bg-blue-600 px-6 py-6 transition-all hover:bg-blue-700 hover:shadow-lg">
                <Headphones className="h-5 w-5" />
                Contact Customer Service
              </Button>
              <Button className="flex items-center gap-2 bg-purple-600 px-6 py-6 transition-all hover:bg-purple-700 hover:shadow-lg">
                <MessageCircle className="h-5 w-5" />
                Contact Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
