// Importing Firebase into project
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// config firebase through env variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initializes Firebase for Server Side Rendering
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestoreDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
    app,
    firestoreDb,
    auth,
    storage
};
