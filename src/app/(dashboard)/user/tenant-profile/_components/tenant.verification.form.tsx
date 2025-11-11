"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { useTenantVerification } from "../_hooks/use.tenant.verification";
import { TenantVerificationSchema } from "../_validations/tenant.verification.schema";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";

export default function TenantVerificationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const { setTenantRole } = useAuthStore();

  const tenantVerificationMutation = useTenantVerification({
    onSuccess: () => {
      setTenantRole();

      formik.resetForm();
      setSelectedFile(null);
      setFilePreview(null);
    },
  });

  const formik = useFormik({
    initialValues: {
      contact: "",
      address: "",
      city: "",
      country: "",
      government_id_type: "",
      government_id_file: null as File | null,
    },
    validationSchema: TenantVerificationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: any) {
    const formData = new FormData();
    formData.append("contact", values.contact);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("government_id_type", values.government_id_type);
    if (values.government_id_file) {
      formData.append("government_id_file", values.government_id_file);
    }

    tenantVerificationMutation.mutate(formData);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      formik.setFieldValue("government_id_file", file);
      setFilePreview(file.name);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    formik.setFieldValue("government_id_file", null);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Tenant Verification</CardTitle>
          <p className="text-sm text-gray-600">
            Please provide your information and upload your government ID for
            verification.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="e.g., +6281234567890"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.contact && formik.touched.contact
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.errors.contact && formik.touched.contact && (
                  <p className="text-xs text-red-500">
                    {formik.errors.contact}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="government_id_type">Government ID Type *</Label>
                <Select
                  value={formik.values.government_id_type}
                  onValueChange={(value) =>
                    formik.setFieldValue("government_id_type", value)
                  }
                >
                  <SelectTrigger
                    className={
                      formik.errors.government_id_type &&
                      formik.touched.government_id_type
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KTP">KTP</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="Driver's License">
                      Driver's License
                    </SelectItem>
                  </SelectContent>
                </Select>
                {formik.errors.government_id_type &&
                  formik.touched.government_id_type && (
                    <p className="text-xs text-red-500">
                      {formik.errors.government_id_type}
                    </p>
                  )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Full address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.address && formik.touched.address
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.address && formik.touched.address && (
                <p className="text-xs text-red-500">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.city && formik.touched.city
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.errors.city && formik.touched.city && (
                  <p className="text-xs text-red-500">{formik.errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.country && formik.touched.country
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.errors.country && formik.touched.country && (
                  <p className="text-xs text-red-500">
                    {formik.errors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="government_id_file">
                Government ID Document (Image) *
              </Label>
              {!filePreview ? (
                <div className="relative">
                  <Input
                    id="government_id_file"
                    name="government_id_file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/avif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="government_id_file"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    <FileText className="mb-3 h-12 w-12 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      JPEG, PNG, JPG, AVIF, WebP (MAX. 1MB)
                    </p>
                  </Label>
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {filePreview}
                      </p>
                      <p className="text-xs text-gray-500">Image Document</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              )}
              {formik.errors.government_id_file &&
                formik.touched.government_id_file && (
                  <p className="text-xs text-red-500">
                    {formik.errors.government_id_file}
                  </p>
                )}
            </div>

            <Button
              type="submit"
              disabled={tenantVerificationMutation.isPending || !formik.isValid}
              className="w-full"
            >
              {tenantVerificationMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Verification"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
