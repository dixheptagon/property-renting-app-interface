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
import { AlertCircle, CircleCheck, TriangleAlert } from "lucide-react";
import { useCheckEmail } from "../../_hooks/use.check.email";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../_stores/auth.store";
import { useSendVerification } from "../../_hooks/use.send.verification";
import { EmailCheckingValidationSchema } from "../../_validations/email.checking";
import GoogleLoginButton from "./google.login.button";

export function CheckEmail({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { email: userEmail, storeEmail } = useAuthStore();
  const { mutate: sendVerification } = useSendVerification();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userEmail || "",
    },
    validationSchema: EmailCheckingValidationSchema,
    onSubmit: (values) => {
      if (data?.data?.exists) {
        storeEmail(values.email);
        router.push("/login");
      } else {
        storeEmail(values.email);
        sendVerification(values.email);
        router.push("/verify-email");
      }
    },
  });

  const { email, setEmail, data, isPending, error } = useCheckEmail();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
  };

  // 🚀 Trigger debounce + mutation only if valid
  useEffect(() => {
    const email = formik.values.email;

    // Kalau belum valid → jangan trigger
    if (!formik.isValid || !email) return;

    setEmail(email);
  }, [formik.values.email, formik.isValid]);

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
                <h1 className="text-2xl font-bold">Get Started!</h1>
                <p className="text-muted-foreground text-balance">
                  Let's get you set up. Enter your email.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.email}
                  </p>
                )}

                {/* Email checking status */}
                {isPending && !formik.errors.email && (
                  <p className="mt-1 text-xs text-gray-500">
                    Checking email...
                  </p>
                )}

                {data && data.data.exists && !formik.errors.email && (
                  <p className="mt-1 flex gap-2 text-xs text-yellow-600">
                    <TriangleAlert className="h-4 w-4" />
                    Email already registered
                  </p>
                )}

                {data && !data.data.exists && !formik.errors.email && (
                  <p className="mt-1 flex gap-2 text-xs text-green-500">
                    <CircleCheck className="h-4 w-4" />
                    Email available
                  </p>
                )}

                {error && !formik.errors.email && (
                  <p className="mt-1 flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong while checking email.
                  </p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={!formik.isValid || isPending}>
                  {isPending
                    ? "Checking..."
                    : data?.data?.exists
                      ? "Login"
                      : data
                        ? "Register"
                        : "Continue"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field className="">
                <GoogleLoginButton />
              </Field>

              <FieldDescription className="z-50 px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </FieldDescription>
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
