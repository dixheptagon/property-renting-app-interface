"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useFormik } from "formik";
import { AlertCircle, ArrowLeft, TriangleAlert } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../../_stores/auth.store";
import { useEffect, useRef, useState } from "react";
import { OTPValidationSchema } from "../../_validations/verify.email";
import { UseVerifyEmail } from "../../_hooks/use.verify.email";
import { toast } from "sonner";
import axios from "axios";
import { useResendVerification } from "../../_hooks/use.resend.verification";
import { useVerifyEmailByLink } from "../../_hooks/use.verify.email.by.link";

export function VerifyEmail({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { email } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [cooldown, setCooldown] = useState(0);
  const verification_token = searchParams.get("verification_token");

  const {
    mutate: verifyEmail,
    isPending: isVerifying,
    error,
  } = UseVerifyEmail({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else {
        toast.error(error?.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/register");
    },
  });

  const { mutate: verifyEmailByLink } = useVerifyEmailByLink({
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/register");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Something went wrong");
      } else {
        toast.error(error?.message || "Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (verification_token) {
      verifyEmailByLink({ verification_token });
    }
  }, [verification_token]);

  const {
    mutate: resendVerification,
    isPending: isResending,
    error: resendError,
  } = useResendVerification({
    onError: (error) => {
      console.log(error);
      if (error?.response?.data?.error) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong, please try again later.");
        router.push("/");
      }
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: OTPValidationSchema,
    onSubmit: (values) => {
      verifyEmail({ email, verification_code: values.otp });
      console.log(error);
    },
  });

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value !== "" && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update formik value
    formik.setFieldValue("otp", newOtp.join(""));

    // Move to next input if value is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      while (newOtp.length < 6) newOtp.push("");
      setOtp(newOtp);
      formik.setFieldValue("otp", pastedData);

      // Focus on the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = () => {
    // Prevent multiple clicks
    if (cooldown > 0) return;

    resendVerification(email);
    setCooldown(60);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="z-50 overflow-hidden border-none p-0 shadow-2xl shadow-orange-600/50">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Enter Verification Code</h1>
                <p className="text-muted-foreground text-balance">
                  Please enter the verification code that we sent to{" "}
                  <span className="font-bold">{email}</span>
                </p>
              </div>

              <Field>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="h-12 w-12 text-center text-lg font-semibold"
                    />
                  ))}
                </div>

                {formik.touched.otp && formik.errors.otp && (
                  <p className="mt-2 flex justify-center gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.otp}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={
                    !formik.isValid ||
                    (otp.join("").length !== 6 && isVerifying)
                  }
                >
                  Verify
                </Button>

                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={handleResend}
                  disabled={cooldown > 0 || isResending}
                  className={`${
                    cooldown > 0
                      ? "cursor-not-allowed bg-gray-300"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {cooldown > 0
                    ? `Wait ${cooldown}s to Resend Verification`
                    : "Resend Verification"}
                </Button>

                <Button
                  type="button"
                  variant={"link"}
                  onClick={() => router.push("/check-email")}
                  className="text-black hover:text-blue-600"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Field>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/background/auth-images.jpg"
              alt="Image"
              width={1080}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
