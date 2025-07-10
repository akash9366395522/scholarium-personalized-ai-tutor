// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNzBOYEZAhK5KueDhQTW4X4JKjgpJYsRI",
  authDomain: "scholarium-52fbb.firebaseapp.com",
  projectId: "scholarium-52fbb",
  storageBucket: "scholarium-52fbb.firebasestorage.app",
  messagingSenderId: "294702838030",
  appId: "1:294702838030:web:9c0510d1334f2e87af675f",
  measurementId: "G-4124QJGYQF"
};

// ✅ Only initialize Firebase if it hasn't been already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Only initialize auth once
let auth;
try {
  auth = getAuth(app);
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Optional: Only initialize analytics if supported (to fix warning)
isAnalyticsSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { auth, db };
