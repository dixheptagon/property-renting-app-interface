"use client";

import * as React from "react";
import {
  Settings,
  PieChart,
  ReceiptText,
  BaggageClaim,
  CirclePower,
} from "lucide-react";

import { NavMain } from "@/app/(dashboard)/user/_components/nav-main";
import { NavProjects } from "@/app/(dashboard)/user/_components/nav-projects";
import { TeamSwitcher } from "@/app/(dashboard)/user/_components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
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
      title: "Order List",
      url: "/user/order-list",
      icon: BaggageClaim,
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
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
