import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD8m782b7Ayby_5M_CVE5LZLvfBAdMVyu8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "luy-genz.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "luy-genz",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "luy-genz.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1035654840971",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1035654840971:web:f84a553707a62852a68a8e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BYM7YQRVMW",
};

// Safe Initialize Firebase
let app = null;
let db = null;
let auth = null;
const googleProvider = new GoogleAuthProvider();

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  // Explicitly lock session persistence to localStorage (Never log out on app close)
  if (auth) {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
  }
} catch (err) {
  console.warn("Firebase initialization warning (running in safe mode):", err);
}

export { app, db, auth, googleProvider };

export {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
};

// Initialize Analytics if supported in the browser
let analytics = null;
try {
  if (typeof window !== "undefined" && app && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
  }
} catch {}
export { analytics };

export default app;

