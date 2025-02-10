"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (
      isLoaded &&
      user?.emailAddresses?.[0]?.emailAddress === ADMIN_EMAIL
    ) {
      setIsAdmin(true);
    }
  }, [isLoaded, user]);

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
