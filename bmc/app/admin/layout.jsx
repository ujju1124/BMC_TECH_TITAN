"use client";
import React, { Suspense, useEffect } from "react";
import useBusStore from "@/store/useBusStore";

// Admin Page Layout
const AdminPage = ({ children }) => {
  const { isAdmin, isLoading } = useBusStore();
  useEffect(() => {
    if (!isAdmin) {
      window.location.href = "/";
    }
  }, [isAdmin]);

  if (isLoading) {
    return null;
  }

  return (
    <main className="h-screen w-screen overflow-x-hidden">
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default AdminPage;
