import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

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

export const getFirebaseDatabase = (): Database | null => {
  if (!firebaseApp) {
    firebaseApp = initializeFirebase();
  }
  return firebaseApp ? getDatabase(firebaseApp) : null;
};