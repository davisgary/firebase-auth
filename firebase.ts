import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "#",
  authDomain: "#",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "#",
  measurementId: "#"
};

let firebaseApp: FirebaseApp | undefined;

export const initializeFirebase = (): FirebaseApp | undefined => {
  if (typeof window !== 'undefined' && getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
    if ('measurementId' in firebaseConfig) {
      getAnalytics(firebaseApp);
    }
    return firebaseApp;
  }
  return firebaseApp;
};

export const getFirebaseAuth = (): Auth | null => {
  if (!firebaseApp) {
    firebaseApp = initializeFirebase();
  }
  return firebaseApp ? getAuth(firebaseApp) : null;
};

export const getFirestoreDB = (): Firestore | null => {
  if (!firebaseApp) {
    firebaseApp = initializeFirebase();
  }
  return firebaseApp ? getFirestore(firebaseApp) : null;
};

// Function to create a user profile in Firestore
export const createUserProfile = async (userId: string, profileData: any) => {
  const db = getFirestoreDB();
  if (!db) return;

  try {
    await setDoc(doc(db, 'users', userId), profileData);
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

// Function to fetch a user profile from Firestore
export const getUserProfile = async (userId: string) => {
  const db = getFirestoreDB();
  if (!db) return null;

  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};