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
import { useAuthStore } from "../../_stores/auth.store";
import { AlertCircle, BadgeCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import { RegisterFormValidationSchema } from "../../_validations/register.form";
import Link from "next/link";
import { useRegisterAccount } from "../../_hooks/use.register.account";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { email, storeAuth, storeEmail, storeToken } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: registerAccount, isPending } = useRegisterAccount({
    onSuccess: (data) => {
      console.log(data);
      storeAuth(data.data);
      toast.success(data?.message);
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error);

        if (error.response?.status === 409) {
          toast.error(error.response?.data.error);
          router.push("/login");
        } else if (error.response?.status === 400) {
          toast.error(error.response?.data.error);
          router.push("/verify-email");
        }
      } else {
        console.log(error);
        toast.error(error?.message);
        // router.push("/");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values) => {
      registerAccount({ ...values, email });
    },
    validationSchema: RegisterFormValidationSchema,
  });

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
                <h1 className="text-2xl font-bold">Create New Account</h1>
                <p className="text-muted-foreground text-balance">
                  Your email has been verified.
                </p>
                <p className="flex w-full items-center justify-center rounded-lg border-2 bg-gray-200 p-2">
                  {email}
                  <BadgeCheck className="ml-2 fill-green-500 text-green-700" />
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                <Input
                  id="first_name"
                  type="name"
                  placeholder="first name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.first_name}
                  </p>
                )}

                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                <Input
                  id="last_name"
                  type="name"
                  placeholder="last name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.last_name}
                  </p>
                )}

                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  {/* Icon toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.password}
                  </p>
                )}

                <FieldLabel htmlFor="confirm_password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="confirm password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                />
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password && (
                    <p className="flex gap-2 text-xs text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      {formik.errors.confirm_password}
                    </p>
                  )}
              </Field>

              <Field>
                <Button type="submit" disabled={isPending}>
                  Register Account
                </Button>
              </Field>

              <FieldDescription className="z-50 px-6 text-center">
                By creating an account, you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>.
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
