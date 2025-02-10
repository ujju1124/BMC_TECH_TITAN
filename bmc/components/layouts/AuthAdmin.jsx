"use client";

import useBusStore from "@/store/useBusStore";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function AuthProvider({ children }) {
  const { checkIsAdmin } = useBusStore();

  const { userId } = useAuth();

  useEffect(() => {
    checkIsAdmin(userId);
  }, [checkIsAdmin]);
  return <>{children}</>;
}
