"use client";

import * as React from "react";
import {
  ReceiptText,
  BaggageClaim,
  CirclePower,
  House,
  UsersRound,
  FileChartColumn,
  HousePlus,
  ShoppingBag,
  UserRoundCog,
  HatGlasses,
  Star,
} from "lucide-react";

import { NavMain } from "@/app/(dashboard)/user/_components/nav-main";
import { NavAccounts } from "@/app/(dashboard)/user/_components/nav-account";
import { UserAvatar } from "@/app/(dashboard)/user/_components/user.avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavTenant } from "./nav-tenant";
import { useRoleContext } from "@/components/providers/role.provider";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import capitalize from "../my-reviews/_utils/capitalize.letter";
import { useIsDraftProperty } from "./hooks/use.is.draft.property";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get User Profile
  const { first_name, last_name, image, role } = useAuthStore();
  const isDraft = useIsDraftProperty();

  // This is sample data.
  const data = {
    profiles: [
      {
        name: `${first_name} ${last_name}`,
        logo: image,
        plan: capitalize(role),
      },
    ],
    navMain: [
      {
        title: "My Bookings",
        url: "/user/my-bookings",
        icon: ReceiptText,
        isActive: true,
      },
      {
        title: "Purchase List",
        url: "/user/purchase-list",
        icon: ShoppingBag,
      },
      {
        title: "My Reviews",
        url: "/user/my-reviews",
        icon: Star,
      },
    ],
    navTenant: [
      {
        title: "My Accomodations",
        url: "/user/tenant/my-accomodation",
        icon: House,
        isActive: true,
      },
      {
        title: "Order List",
        url: "/user/tenant/order-list",
        icon: BaggageClaim,
      },
      {
        title: "Reviews & Ratings",
        url: "/user/tenant/reviews-ratings",
        icon: UsersRound,
      },
      {
        title: "Report",
        url: "/user/tenant/reports",
        icon: FileChartColumn,
      },
      {
        title: "Create Accomodation",
        url: `${isDraft ? "/create-property/summary" : "/create-property"}`,
        icon: HousePlus,
      },
    ],
    navAccount: [
      {
        name: "My Account",
        url: "/user",
        icon: UserRoundCog,
      },
      {
        name: "Become a Host",
        url: "/user/tenant-profile",
        icon: HatGlasses,
      },
      {
        name: "Log Out",
        url: "/",
        icon: CirclePower,
      },
    ],
  };

  const { canAccessMenu } = useRoleContext();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UserAvatar profiles={data.profiles} />
      </SidebarHeader>
      <SidebarContent>
        {canAccessMenu("general") && <NavMain items={data.navMain} />}
        {canAccessMenu("property") && <NavTenant items={data.navTenant} />}
        {canAccessMenu("account") && <NavAccounts projects={data.navAccount} />}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Link href="/">
          <Image
            src={open ? "/logo/staysia-logo.png" : "/logo/staysia.icon.png"}
            alt="Staysia Logo"
            width={100}
            height={100}
            className={`mx-auto w-24 transition-transform hover:scale-105 sm:w-28 md:w-30`}
          />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
