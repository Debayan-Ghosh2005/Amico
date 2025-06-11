import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './client';

// Generic Firestore operations
export const createDocument = async (collectionName: string, data: any, documentId?: string) => {
  try {
    if (documentId) {
      await setDoc(doc(db, collectionName, documentId), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return documentId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const getDocument = async (collectionName: string, documentId: string) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, documentId: string, data: any) => {
  try {
    await updateDoc(doc(db, collectionName, documentId), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, documentId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Community Posts
export interface CommunityPost {
  id?: string;
  userId: string;
  userName: string;
  content: string;
  upvotes: number;
  comments: number;
  timestamp: Timestamp;
  tags?: string[];
}

export const createCommunityPost = async (post: Omit<CommunityPost, 'id' | 'upvotes' | 'comments' | 'timestamp'>) => {
  return createDocument('posts', {
    ...post,
    upvotes: 0,
    comments: 0
  });
};

export const getCommunityPosts = async (limitCount = 20) => {
  try {
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CommunityPost[];
  } catch (error) {
    console.error('Error getting community posts:', error);
    throw error;
  }
};

// Chat Sessions
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
}

export const saveChatMessage = async (userId: string, message: ChatMessage) => {
  try {
    const chatRef = doc(db, 'chat_sessions', userId);
    const chatSnap = await getDoc(chatRef);
    
    if (chatSnap.exists()) {
      const existingMessages = chatSnap.data().messages || [];
      await updateDoc(chatRef, {
        messages: [...existingMessages, message],
        lastMessage: message.content,
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(chatRef, {
        userId,
        messages: [message],
        lastMessage: message.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

export const getChatHistory = async (userId: string) => {
  try {
    const chatRef = doc(db, 'chat_sessions', userId);
    const chatSnap = await getDoc(chatRef);
    
    if (chatSnap.exists()) {
      return chatSnap.data().messages as ChatMessage[];
    }
    return [];
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
};

// User Profile Updates
export const updateUserCoins = async (userId: string, amount: number) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      coins: increment(amount),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user coins:', error);
    throw error;
  }
};

export const addUserBadge = async (userId: string, badge: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const currentBadges = userSnap.data().badges || [];
      if (!currentBadges.includes(badge)) {
        await updateDoc(userRef, {
          badges: [...currentBadges, badge],
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error adding user badge:', error);
    throw error;
  }
};