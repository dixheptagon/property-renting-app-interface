"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "../../property-details/_stores/booking.store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BookingFormValidationSchema } from "../_validations/booking.form";
import { formatPrice } from "../_utils/format.price";

export default function BookingForm() {
  const bookingState = useBookingStore();

  const handleSubmit = (values: any) => {
    console.log("Form submitted with values:", values);
    // Handle form submission here
  };

  return (
    <div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          countryCode: "+62",
          mobileNumber: "",
        }}
        validationSchema={BookingFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="mx-auto flex min-h-full max-w-7xl flex-col rounded-xl bg-white p-4 text-gray-600 shadow-md md:p-8">
              <div className="space-y-2 pb-6">
                <h2 className="text-xl font-bold text-black md:text-2xl">
                  Contact Details
                </h2>
                <p className="text-sm font-semibold md:text-base">
                  Please fill in all fields correctly to ensure you receive the
                  booking confirmation voucher in your email.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fullname" className="text-sm md:text-base">
                  Full Name (as in Passport/Official ID Card)
                </label>
                <Field
                  as={Input}
                  type="text"
                  name="fullName"
                  id="name"
                  placeholder="Fullname"
                  className="text-sm md:text-base"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-xs text-red-500"
                />
                <span className="text-xs md:text-sm">
                  Please use only alphabet (A-Z), without title, special
                  characters, and punctuation.
                </span>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 pt-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm md:text-base">
                    Email
                  </label>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    className="text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-500"
                  />
                  <span className="text-xs md:text-sm">
                    Please use a valid email address
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="mobile" className="text-sm md:text-base">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <Field
                      as={Input}
                      type="text"
                      name="countryCode"
                      id="countryCode"
                      placeholder="+62"
                      className="w-20 text-sm md:text-base"
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="mobileNumber"
                      id="mobile"
                      placeholder="812345678910"
                      className="flex-1 text-sm md:text-base"
                    />
                  </div>
                  <ErrorMessage
                    name="countryCode"
                    component="div"
                    className="text-xs text-red-500"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="text-xs text-red-500"
                  />
                  <span className="text-xs md:text-sm">
                    Please use a valid mobile number
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 text-gray-500 shadow-md md:p-8">
              <h3 className="text-xl font-bold text-black md:text-2xl">
                Price Details
              </h3>
              <p className="mb-4 text-sm font-semibold md:text-base">
                Please review the price details below.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {formatPrice(bookingState?.basePrice)} x{" "}
                    {bookingState?.normalNights} nights
                  </span>
                  <span>
                    {formatPrice(
                      bookingState?.basePrice * bookingState?.normalNights
                    )}
                  </span>
                </div>
                {bookingState?.peakSeasonNights > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {formatPrice(bookingState?.peakSeasonPrice)} x{" "}
                      {bookingState?.peakSeasonNights} nights
                    </span>
                    <span>
                      {formatPrice(
                        bookingState?.peakSeasonPrice *
                          bookingState?.peakSeasonNights
                      )}
                    </span>
                  </div>
                )}
                <hr className="border-gray-300" />
                <div className="text-xl md:text-2xl">
                  <div className="flex justify-between font-bold text-black">
                    <span>Total</span>
                    <span>{formatPrice(bookingState?.total)}</span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm font-semibold">
                      for {bookingState?.totalNights} night
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full py-4 text-base shadow-md md:py-6 md:text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
