"use client";

import * as React from "react";
import {
  Settings,
  PieChart,
  ReceiptText,
  BaggageClaim,
  CirclePower,
  House,
  UsersRound,
  FileChartColumn,
  MapPinPlus,
  HousePlus,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { TenantProfile } from "./tenant.profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  tenant: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "[Username]",
      logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      plan: "Tenant",
    },
  ],
  navMain: [
    {
      title: "My Accomodation",
      url: "/tenant/my-accomodation",
      icon: House,
      isActive: true,
    },
    {
      title: "Order List",
      url: "/tenant/order-list",
      icon: BaggageClaim,
    },
    {
      title: "Review",
      url: "/tenant/reviews",
      icon: UsersRound,
    },
    {
      title: "Report",
      url: "/tenant/reports",
      icon: FileChartColumn,
    },
    {
      title: "Create Accomodation",
      url: "#",
      icon: HousePlus,
    },
  ],
  projects: [
    {
      name: "My Account",
      url: "#",
      icon: Settings,
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
        <TenantProfile teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
