import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://portrait-ai-backend-staging-789341542834.us-central1.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
API.interceptors.request.use(async (config) => {
  // Only attach token if Authorization header is not already set
  // This allows manual override if needed
  if (!config.headers.Authorization) {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        // If token retrieval fails, continue without token
        // The request will fail with 401 if auth is required
        console.error("Failed to get auth token:", error);
      }
    }
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Sign out user and redirect to sign-in page
      try {
        await signOut(auth);
        // Redirect to sign-in page (only on client side)
        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign-in";
        }
      } catch (signOutError) {
        console.error("Failed to sign out on 401:", signOutError);
      }
    }
    return Promise.reject(error);
  }
);
