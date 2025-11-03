"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTenantProfile } from "./_hooks/use.tenant.profile";
import LoadingSpinner from "./_components/loading.spinner";
import ErrorAlert from "./_components/error.alert";
import BannedAccountAlert from "./_components/banned.account.alert";
import VerifiedProfileCard from "./_components/verified.profile.card";
import PendingReviewAlert from "./_components/pending.review.alert";
import TenantVerificationForm from "./_components/tenant.verification.form";
import { AppSidebar } from "../_components/app-sidebar";

export default function TenantProfilePage() {
  const {
    data: profileResponse,
    isLoading,
    error,
    refetch,
  } = useTenantProfile();

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      console.error("Failed to fetch tenant profile:", error);
      return <ErrorAlert onRetry={() => refetch()} />;
    }

    const profile = profileResponse?.data;

    // Case 1: Banned account
    if (profile?.banned) {
      return <BannedAccountAlert />;
    }

    // Case 2: Verified account
    if (profile?.verified) {
      return <VerifiedProfileCard profile={profile} />;
    }

    // Case 3: Pending review (verified = false AND government_id_path exists)
    if (profile && !profile.verified && profile.government_id_path) {
      return <PendingReviewAlert />;
    }

    // Case 4: Show verification form (verified = false AND government_id_path is null/empty)
    return <TenantVerificationForm />;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold sm:text-base">
                Tenant Profile
              </span>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-4">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
