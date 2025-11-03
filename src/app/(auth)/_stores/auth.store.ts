import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  email: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  role: string;
  image: string | null;
  access_token: string;

  isHydrated: boolean;
  setHydrated: (state: boolean) => void;

  storeEmail: (email: string) => void;
  clearEmail: () => void;

  storeToken: (access_token: string) => void;
  clearToken: () => void;

  storeAuthRegister: (data: any) => void;
  storeAuth: (data: any) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      email: "",
      first_name: "",
      last_name: "",
      display_name: "",
      role: "",
      image: null,
      access_token: "",

      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),

      storeEmail: (email) => set({ email }),
      clearEmail: () => set({ email: "" }),

      storeToken: (access_token) => {
        const currentEmail = get().email;
        const currentFirstName = get().first_name;
        const currentLastName = get().last_name;
        const currentDisplayName = get().display_name;
        const currentRole = get().role;
        const currentImage = get().image;

        set({
          email: currentEmail,
          first_name: currentFirstName,
          last_name: currentLastName,
          display_name: currentDisplayName,
          role: currentRole,
          image: currentImage,
          access_token,
        });
      },
      clearToken: () => set({ access_token: "" }),

      storeAuthRegister: (data) =>
        set({
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          display_name: data.display_name,
          access_token: data.access_token,
        }),

      storeAuth: (data) =>
        set({
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          display_name: data.user.display_name,
          access_token: data.access_token,
          email: data.user.email,
          role: data.user.role,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        email: state.email,
        first_name: state.first_name,
        last_name: state.last_name,
        display_name: state.display_name,
        role: state.role,
        access_token: state.access_token,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error(error);
          toast.error("Something went wrong, please try again later.");
          window.location.href = "/";
        } else {
          // Mark hydrated after rehydration is done
          state?.setHydrated(true);
        }
      },
    }
  )
);
