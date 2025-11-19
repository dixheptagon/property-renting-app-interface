import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { MobileUserDropdown, UserDropdown } from "./user.dropdown";

export function AuthButtons({ handleAuth }: { handleAuth: () => void }) {
  const { access_token } = useAuthStore();

  return (
    <>
      {!access_token ? (
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="outline"
            onClick={handleAuth}
            className={`group : "border-2 hover:text-blue-600" relative overflow-hidden border-white bg-transparent text-white transition-all hover:bg-white`}
          >
            <User className="mr-2 h-4 w-4" />
            Log in
          </Button>
          <Button
            onClick={handleAuth}
            className="bg-blue-600 font-semibold shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            Register
          </Button>
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
  handleAuth,
  setMobileMenuOpen,
}: {
  handleAuth: () => void;
  setMobileMenuOpen: (value: boolean) => void;
}) {
  const { access_token } = useAuthStore();

  return (
    <>
      {!access_token ? (
        <div className="border-t p-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                setMobileMenuOpen(false);
                handleAuth();
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Log in
            </Button>
            <Button
              className="w-full font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl"
              onClick={() => {
                setMobileMenuOpen(false);
                handleAuth();
              }}
            >
              Register
            </Button>
          </div>
        </div>
      ) : (
        <MobileUserDropdown setMobileMenuOpen={setMobileMenuOpen} />
      )}
    </>
  );
}
