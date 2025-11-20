"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { PaymentProofUploadProps } from "../../_types/upload.payment.proof";
import { useUploadPaymentProof } from "../../_hooks/use.upload.payment.proof";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { UploadPaymentProofValidationSchema } from "../../_validations/upload.payment.proof";

export default function PaymentProofUpload({
  bookingId,
  onUploadSuccess,
}: PaymentProofUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const uploadPaymentProofMutation = useUploadPaymentProof();

  const formik = useFormik({
    initialValues: {
      paymentProof: null as File | null,
      accountName: "",
      notes: "",
    },
    validationSchema: UploadPaymentProofValidationSchema,
    onSubmit: async (values) => {
      if (!values.paymentProof) return;

      try {
        await uploadPaymentProofMutation.mutateAsync({
          paymentProof: values.paymentProof,
          accountName: values.accountName,
          notes: values.notes,
          orderId: bookingId || "",
        });

        toast.success("Payment proof uploaded successfully!");

        formik.resetForm();
        setPreview(null);

        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred during upload"
        );
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("paymentProof", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("paymentProof", null);
    setPreview(null);
  };

  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Upload Payment Proof
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Upload Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Transfer Proof <span className="text-red-500">*</span>
          </label>

          {!preview ? (
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
                id="paymentProof"
              />
              <label
                htmlFor="paymentProof"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
              >
                <svg
                  className="mb-3 h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (MAX. 5MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center space-x-4">
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={50}
                  className="h-auto w-24 rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {formik.values.paymentProof?.name}
                </p>
              </div>
            </div>
          )}

          {formik.touched.paymentProof && formik.errors.paymentProof && (
            <p className="mt-2 text-sm text-red-600">
              {formik.errors.paymentProof}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploadPaymentProofMutation.isPending || !formik.isValid}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {uploadPaymentProofMutation.isPending ? (
            <div className="flex w-full items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading...
            </div>
          ) : (
            "Upload Payment Proof"
          )}
        </button>
      </form>
    </div>
  );
}
