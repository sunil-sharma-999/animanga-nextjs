import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_API_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_MESS_SEND_ID,
  appId: process.env.NEXT_PUBLIC_API_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;
