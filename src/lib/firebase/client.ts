import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig, validateFirebaseConfig } from './config';

// Validate configuration before initializing
validateFirebaseConfig();

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export types
export type { User } from 'firebase/auth';
export type { DocumentData, QuerySnapshot } from 'firebase/firestore';