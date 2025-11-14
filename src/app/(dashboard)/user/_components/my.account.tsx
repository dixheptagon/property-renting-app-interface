"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import Image from "next/image";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { useUpdatePassword } from "@/app/(auth)/_hooks/use.update.password";
import { useUpdateProfileImage } from "@/app/(auth)/_hooks/use.update.profile.image";
import { UpdatePasswordSchema } from "@/app/(auth)/_validations/update.password";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Upload, User } from "lucide-react";

export default function MyAccount() {
  const { first_name, last_name, email, image, display_name } = useAuthStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const updateImageMutation = useUpdateProfileImage({
    onSuccess: (data) => {
      toast.success("Profile image updated successfully!");
      // Update auth store with new image
      useAuthStore
        .getState()
        .storeAuth({ user: { ...useAuthStore.getState(), image: data.image } });
      setSelectedImage(null);
      setImagePreview(null);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update profile image"
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      updateImageMutation.mutate(formData);
    }
  };

  const fullName = display_name || `${first_name} ${last_name}`;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-600">
          Manage your profile and account settings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
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

            <Separator />

            <div className="space-y-4">
              <Label htmlFor="image-upload" className="text-sm font-medium">
                Update Profile Image
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </Label>
                {selectedImage && (
                  <Button
                    onClick={handleImageUpload}
                    disabled={updateImageMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {updateImageMutation.isPending ? "Uploading..." : "Upload"}
                  </Button>
                )}
              </div>
              {selectedImage && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedImage.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password Update */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formik.values.current_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.current_password &&
                      formik.touched.current_password
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formik.errors.current_password &&
                  formik.touched.current_password && (
                    <p className="text-sm text-red-600">
                      {formik.errors.current_password}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new_password"
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.new_password && formik.touched.new_password
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formik.errors.new_password && formik.touched.new_password && (
                  <p className="text-sm text-red-600">
                    {formik.errors.new_password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.confirm_password &&
                      formik.touched.confirm_password
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formik.errors.confirm_password &&
                  formik.touched.confirm_password && (
                    <p className="text-sm text-red-600">
                      {formik.errors.confirm_password}
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending
                  ? "Updating..."
                  : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
