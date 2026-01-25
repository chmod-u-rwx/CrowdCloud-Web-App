import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserAuth } from "@/types";

type AuthStateStore = {
  user: UserAuth | null;
  setUser: (user: UserAuth) => void;
  logout: () => void;
}

const authStoreLogic = persist<AuthStateStore>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
      localStorage.removeItem("access_token");
      set({ user: null });
    },
  }),
  {
    name: "user-auth-storage"
  }
);

export const useAuthStore = create<AuthStateStore>()(
  authStoreLogic
);