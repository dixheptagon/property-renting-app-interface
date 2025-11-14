import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle } from "lucide-react";
import { TenantProfile } from "../_types/tenant.profile.type";
import TenantProfileHeader from "./header";

interface VerifiedProfileCardProps {
  profile: TenantProfile;
}

export default function VerifiedProfileCard({
  profile,
}: VerifiedProfileCardProps) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <TenantProfileHeader />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Verification Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Contact
              </Label>
              <p className="text-sm">{profile.contact}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Address
              </Label>
              <p className="text-sm">{profile.address}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">City</Label>
              <p className="text-sm">{profile.city}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Country
              </Label>
              <p className="text-sm">{profile.country}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">
                Government ID Type
              </Label>
              <p className="text-sm">{profile.government_id_type}</p>
            </div>
          </div>
          {profile.government_id_path && (
            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-gray-600">
                Government ID Document
              </Label>
              <div className="mt-2">
                <a
                  href={profile.government_id_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FileText className="h-4 w-4" />
                  View Document
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
