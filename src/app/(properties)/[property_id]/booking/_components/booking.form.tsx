"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "@/app/(properties)/_stores/booking.store";
import { usePaymentStore } from "@/app/(properties)/_stores/payment.store";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import { BookingFormValidationSchema } from "../_validations/booking.form";
import { formatPrice } from "../_utils/format.price";
import { useParams, useRouter } from "next/navigation";
import { useCreateBooking } from "../_hooks/use.create.booking";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function BookingForm() {
  const bookingState = useBookingStore();
  const paymentStore = usePaymentStore();
  const router = useRouter();
  const createBookingMutation = useCreateBooking();

  // Get Property_Id
  const params = useParams();
  const property_id = params.property_id;

  const handleSubmit = (values: FormikValues) => {
    if (
      !bookingState.propertyId ||
      !bookingState.selectedRoom?.id ||
      !bookingState.dateRange?.from ||
      !bookingState.dateRange?.to
    ) {
      toast.error("Missing required booking data");
      router.push(`/${property_id}/property-details`);
      return;
    }

    const payload = {
      room_id: bookingState.selectedRoom.id.toString(),
      property_id: bookingState.propertyId,
      check_in_date: format(bookingState.dateRange.from, "yyyy-MM-dd"),
      check_out_date: format(bookingState.dateRange.to, "yyyy-MM-dd"),
      fullname: values.fullName,
      email: values.email,
      phone_number: `${values.countryCode}${values.mobileNumber}`,
    };

    createBookingMutation.mutate(payload, {
      onSuccess: (data) => {
        // Store order response in payment store
        paymentStore.setOrderResponse(data);
        // Remove booking data from store
        bookingState.clearBooking();
        // Redirect to payment page on success
        router.push(`/${property_id}/payment`);
      },
    });
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
        {() => (
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
              disabled={createBookingMutation.isPending}
              className="mt-6 w-full py-4 text-base shadow-md md:py-6 md:text-lg"
            >
              {createBookingMutation.isPending && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {createBookingMutation.isPending
                ? "Creating Booking..."
                : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
