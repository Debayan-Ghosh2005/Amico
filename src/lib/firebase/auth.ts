import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './client';

const googleProvider = new GoogleAuthProvider();

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'free_user' | 'premium_user' | 'admin';
  coins: number;
  badges: string[];
  joinedAt: Date;
  mood?: 'great' | 'good' | 'okay' | 'not_good' | 'terrible';
  lastActive: Date;
}

// Create or update user profile in Firestore
const createUserProfile = async (user: User, additionalData = {}) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    const userProfile: UserProfile = {
      uid: user.uid,
      email: email || '',
      displayName: displayName || 'Anonymous User',
      role: 'free_user',
      coins: 100, // Welcome bonus
      badges: ['welcome'],
      joinedAt: createdAt,
      lastActive: createdAt,
      ...additionalData
    };

    try {
      await setDoc(userRef, userProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  return userRef;
};

// Email/Password Authentication
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await createUserProfile(user);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Google Authentication
export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    await createUserProfile(user);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth State Observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get User Profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};