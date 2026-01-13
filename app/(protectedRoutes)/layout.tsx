"use client";

import GlobalLoader from "@/components/shared/GlobalLoader";
import { useAuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, firebaseUser, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !firebaseUser)) {
      router.push("/auth/sign-in");
    }
  }, [user, firebaseUser, isLoading, router]);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (!user || !firebaseUser) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoutesLayout;
