"use client";

import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { useAuthStore } from "../../_stores/auth.store";
import { auth, googleProvider } from "@/lib/firebase";
import { useGoogleLogin } from "../../_hooks/use.google.login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const { storeAuth } = useAuthStore();

  const { mutate: loginWithGoogle } = useGoogleLogin({
    onSuccess: (data) => {
      toast.success(data?.message);
      storeAuth(data?.data);
      router.push("/");
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    },
  });

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken();

    loginWithGoogle({ idToken });
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleLogin}
      className="border-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
      <span>Sign In/Sign Up with Google</span>
    </Button>
  );
}
