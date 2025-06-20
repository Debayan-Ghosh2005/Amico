import { create } from 'zustand';
import { User } from 'firebase/auth';
import { UserProfile } from '../lib/firebase/auth';

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
  setLoading: (loading) => set({ loading }),
  signOut: () => set({ user: null, userProfile: null })
}));