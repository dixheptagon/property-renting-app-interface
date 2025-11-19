"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { useUpdatePassword } from "@/app/(auth)/_hooks/use.update.password";
import { useUpdateProfileImage } from "@/app/(auth)/_hooks/use.update.profile.image";
import { UpdatePasswordSchema } from "@/app/(auth)/_validations/update.password";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function MyAccount() {
  const { first_name, last_name, email, image, display_name } = useAuthStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const updatePasswordMutation = useUpdatePassword({
    onSuccess: () => {
      toast.success("Password updated successfully!");
      formik.resetForm();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: (values) => {
      updatePasswordMutation.mutate(values);
    },
  });

  const fullName = display_name || `${first_name} ${last_name}`;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-600">
          Manage your profile and account settings
        </p>
      </div>

      <div>
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 py-10">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={imagePreview || image || undefined}
                  alt={fullName}
                />
                <AvatarFallback className="bg-linear-to-br from-blue-600 to-blue-800 text-lg text-white">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {fullName}
                </h3>
                <p className="text-gray-600">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
