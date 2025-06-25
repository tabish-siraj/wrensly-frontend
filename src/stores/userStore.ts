import { create } from "zustand";
import { persist } from "zustand/middleware";

// interfaces/user.ts

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  avatar: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Profile: UserProfile;
}


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
