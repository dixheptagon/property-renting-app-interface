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
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoginSchema } from "../../_validations/login.form";
import { useAuthStore } from "../../_stores/auth.store";
import { useLoginAccount } from "../../_hooks/use.login.account";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./google.login.button";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const { email, storeAuth, storeEmail } = useAuthStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: loginAccount, error } = useLoginAccount({
    onSuccess: (data) => {
      storeAuth(data?.data);
      storeEmail(data?.data?.user?.email);
      toast.success(data?.message);
      router.push("/");
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email || "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      loginAccount(values);

      formik.setFieldValue("password", "");
    },
  });

  // Handle click setelah email dicek

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
                <h1 className="text-2xl font-bold">Great to see you again!</h1>
                <p className="text-muted-foreground text-balance">
                  Please enter your email and password to sign in.
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="flex gap-2 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {formik.errors.email}
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

                <span className="-mt-2">
                  <button
                    type="button"
                    className={`inline justify-start text-sm text-black hover:text-blue-700 hover:underline`}
                  >
                    forget password?
                  </button>
                </span>
              </Field>

              <Field>
                <Button type="submit">Login</Button>
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
