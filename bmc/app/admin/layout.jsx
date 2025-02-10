"use client";
import React, { Suspense } from "react";


// Admin Page Layout
const AdminPage = ({ children }) => {
  return (
    <main className="h-screen w-screen overflow-x-hidden">
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default AdminPage;
