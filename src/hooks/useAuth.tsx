import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { onAuthStateChange, getUserProfile } from '../lib/firebase/auth';

export const useAuth = () => {
  const { setUser, setUserProfile, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserProfile, setLoading]);
};