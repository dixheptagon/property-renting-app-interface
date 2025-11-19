import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  User,
  ShoppingBag,
  Calendar,
  UserCircle,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    icon: ShoppingBag,
    label: "Purchase List",
    href: "/user",
    description: "View your orders",
  },
  {
    icon: Calendar,
    label: "My Bookings",
    href: "/user/my-bookings",
    description: "Manage reservations",
  },
];

const accountItems = [
  {
    icon: UserCircle,
    label: "My Account",
    href: "/user",
    description: "Account settings",
  },
  {
    icon: Home,
    label: "Became a Host",
    href: "/user/tenant-profile",
    description: "Start hosting",
  },
];

export function UserDropdown() {
  const { first_name, clearToken } = useAuthStore();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-gray-300 p-5 shadow-lg transition-all duration-300 hover:bg-gray-200"
        >
          <span className="mr-2 rounded-full bg-blue-600 p-1.5 shadow-md">
            <User className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold">{first_name}</span>
          <ChevronDown className="ml-2 h-4 w-4 stroke-[2.5]" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 rounded-lg p-0 shadow-2xl" align="end">
        <div className="rounded-lg rounded-b-none border-b bg-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-600 p-2 shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Welcome back!</p>
              <p className="text-sm text-gray-600">{first_name}</p>
            </div>
          </div>
        </div>

        <div className="p-1">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50">
                <div className="mt-0.5 rounded-md bg-blue-100 p-2 transition-colors group-hover:bg-blue-200">
                  <item.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="p-1">
          {accountItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50">
                <div className="mt-0.5 rounded-md bg-purple-100 p-2 transition-colors group-hover:bg-purple-200">
                  <item.icon className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 transition-colors group-hover:text-purple-600">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="p-2 pb-3">
          <button
            onClick={() => clearToken()}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-red-50"
          >
            <div className="rounded-md bg-red-100 p-2 transition-colors group-hover:bg-red-200">
              <LogOut className="h-4 w-4 text-red-600" />
            </div>
            <span className="font-medium text-gray-900 transition-colors group-hover:text-red-600">
              Logout
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function MobileUserDropdown({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (value: boolean) => void;
}) {
  const { clearToken } = useAuthStore();

  return (
    <div className="border-t">
      {/* Menu Items */}
      <div className="p-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="group flex items-center justify-between rounded-lg px-3 py-3 transition-all duration-200 active:bg-blue-50">
              <div className="flex items-center gap-3">
                <div className={`rounded-md bg-blue-100 p-2`}>
                  <item.icon className={`h-4 w-4 text-blue-600`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      <Separator className="my-2" />

      {/* Account Items */}
      <div className="p-2">
        {accountItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="group flex items-center justify-between rounded-lg px-3 py-3 transition-all duration-200 active:bg-purple-50">
              <div className="flex items-center gap-3">
                <div className={`rounded-md bg-purple-100 p-2`}>
                  <item.icon className={`h-4 w-4 text-purple-600`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>

      <Separator className="my-2" />

      {/* Logout Button */}
      <div className="p-2 pb-4">
        <button
          onClick={() => {
            clearToken();
            setMobileMenuOpen(false);
          }}
          className="flex w-full items-center justify-between rounded-lg px-3 py-3 transition-all duration-200 active:bg-red-50"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-red-100 p-2">
              <LogOut className="h-4 w-4 text-red-600" />
            </div>
            <span className="font-medium text-gray-900">Logout</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
