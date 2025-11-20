import RouteGuard from "@/components/guards/route.guard";
import { UserRole } from "@/lib/constants/roles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteGuard allowedRoles={[UserRole.TENANT]}>{children}</RouteGuard>
    </>
  );
}
