import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { MobileUserDropdown, UserDropdown } from "./user.dropdown";
import Link from "next/link";

export function AuthButtons() {
  const { access_token } = useAuthStore();

  return (
    <>
      {!access_token ? (
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/check-email">
            <Button
              variant="outline"
              className={`group relative overflow-hidden border border-blue-600 p-5 text-blue-600 transition-all`}
            >
              <User className="mr-2 h-4 w-4" />
              Log in
            </Button>
            <Button className="bg-blue-600 p-5 font-semibold shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl">
              Register
            </Button>
          </Link>
        </div>
      ) : (
        <div className="hidden items-center gap-3 lg:flex">
          <UserDropdown />
        </div>
      )}
    </>
  );
}

export function MobileAuthButton({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (value: boolean) => void;
}) {
  const { access_token } = useAuthStore();

  return (
    <>
      {!access_token ? (
        <div className="border-t p-4">
          <div className="space-y-3">
            <Link href="/check-email">
              <Button
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Log in
              </Button>
              <Button
                className="w-full font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <MobileUserDropdown setMobileMenuOpen={setMobileMenuOpen} />
      )}
    </>
  );
}
