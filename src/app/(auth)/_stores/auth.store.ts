import { set } from "date-fns";
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

  storeEmail: (email: string) => void;
  clearEmail: () => void;

  storeToken: (access_token: string) => void;
  clearToken: () => void;

  storeAuthRegister: (data: any) => void;
  storeAuth: (data: any) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      first_name: "",
      last_name: "",
      display_name: "",
      role: "",
      image: null,
      access_token: "",

      storeEmail: (email) => set({ email }),
      clearEmail: () => set({ email: "" }),

      storeToken: (access_token) => set({ access_token }),
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
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        email: state.email,
        first_name: state.first_name,
        last_name: state.last_name,
        display_name: state.display_name,
        access_token: state.access_token,
      }),
    }
  )
);
