import axios from "axios";

export const API = axios.create({
  baseURL:
    "/https://portrait-ai-backend-staging-789341542834.us-central1.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
API.interceptors.request.use((config) => {
  //   const token = getAuthToken(); // From your auth store
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, redirect to login
    if (error.response?.status === 401) {
      // Handle logout
    }
    return Promise.reject(error);
  }
);
