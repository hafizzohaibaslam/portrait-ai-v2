"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLmWQgwOPCfhb0qc2nj3C70druJ3NfCl0",
  authDomain: "portrait-ai-481612.firebaseapp.com",
  projectId: "portrait-ai-481612",
  storageBucket: "portrait-ai-481612.firebasestorage.app",
  messagingSenderId: "789341542834",
  appId: "1:789341542834:web:e456d0aa5969298ec52cab",
};

// Initialize Firebase (Singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Use device language for auth
auth.useDeviceLanguage();

export { auth, db, storage };
