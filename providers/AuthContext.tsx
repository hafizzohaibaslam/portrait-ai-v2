"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { API } from "@/lib/api";
import GlobalLoader from "@/components/shared/GlobalLoader";
import type { User } from "@/types/global-types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      try {
        // Token is automatically attached by API interceptor
        const response = await API.get<User>("/users/me");
        setUser(response.data);
        Cookie.set("fb_user_id", userId);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await fetchUserData(firebaseUser.uid);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoading(false);
        Cookie.remove("fb_user_id");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    Cookie.remove("fb_user_id");
    router.push("/auth/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut: handleSignOut,
      }}
    >
      {isLoading ? <GlobalLoader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
