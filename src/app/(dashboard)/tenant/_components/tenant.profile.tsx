"use client";

import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TenantProfile({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType | string | any;
    plan: string;
  }[];
}) {
  const renderLogo = (
    logo: React.ElementType | string | any,
    className: string
  ) => {
    if (typeof logo === "string") {
      return (
        <Image
          width={400}
          height={400}
          src={logo}
          className={`${className} h-8 w-8 rounded-full object-cover`}
          alt="logo"
        />
      );
    }
    if (logo && typeof logo === "object" && "src" in logo) {
      return (
        <Image
          width={400}
          height={400}
          src={logo.src}
          className={`${className} h-8 w-8 rounded-full object-cover`}
          alt="logo"
        />
      );
    }
    const LogoComponent = logo;
    return <LogoComponent className={className} />;
  };

  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
            {renderLogo(activeTeam.logo, "size-4")}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
