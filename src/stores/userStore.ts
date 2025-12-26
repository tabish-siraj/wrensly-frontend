import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    likes: boolean;
    comments: boolean;
    follows: boolean;
    reposts: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  preferences: UserPreferences;
  _hasHydrated: boolean;

  // Actions
  setUser: (user: User) => void;
  clearUser: (redirectCallback?: () => void) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  toggleNotificationSetting: (key: keyof UserPreferences['notifications']) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    likes: true,
    comments: true,
    follows: true,
    reposts: true,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
  },
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      preferences: defaultPreferences,
      _hasHydrated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearUser: (redirectCallback) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");

          // Use callback if provided, otherwise fallback to window.location
          if (redirectCallback) {
            redirectCallback();
          } else {
            window.location.replace("/auth/login");
          }
        }
        return set({
          user: null,
          isAuthenticated: false,
          preferences: defaultPreferences
        });
      },

      updatePreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs }
      })),

      toggleNotificationSetting: (key) => set((state) => ({
        preferences: {
          ...state.preferences,
          notifications: {
            ...state.preferences.notifications,
            [key]: !state.preferences.notifications[key]
          }
        }
      })),

      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: "user-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        preferences: state.preferences,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useUserStore;
