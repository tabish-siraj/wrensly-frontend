import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";


export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.replace("/auth/login");
        return set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);

export default useUserStore;
