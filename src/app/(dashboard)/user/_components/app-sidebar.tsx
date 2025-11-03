"use client";

import * as React from "react";
import {
  ReceiptText,
  BaggageClaim,
  Settings,
  CirclePower,
  House,
  UsersRound,
  FileChartColumn,
  HousePlus,
  ShoppingBag,
  UserRoundCog,
  ShieldUser,
  HatGlasses,
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
} from "@/components/ui/sidebar";
import { NavTenant } from "./nav-tenant";

// This is sample data.
const data = {
  profiles: [
    {
      name: "[Username]",
      logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      plan: "Guest",
    },
  ],
  navMain: [
    {
      title: "My Booking",
      url: "/user/my-booking",
      icon: ReceiptText,
      isActive: true,
    },
    {
      title: "Purchase List",
      url: "/user/purchase-list",
      icon: ShoppingBag,
    },
  ],
  navTenant: [
    {
      title: "My Accomodation",
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
      title: "Review",
      url: "/user/tenant/reviews",
      icon: UsersRound,
    },
    {
      title: "Report",
      url: "/user/tenant/reports",
      icon: FileChartColumn,
    },
    {
      title: "Create Accomodation",
      url: "/create-property",
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
      url: "#",
      icon: CirclePower,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UserAvatar profiles={data.profiles} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTenant items={data.navTenant} />
        <NavAccounts projects={data.navAccount} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
