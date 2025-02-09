import React from "react";

export const metadata = {
  title: "Admin page",
  description: "Admin page for public bus route configurations",
};

const AdminPage = ({ children }) => {
  return (
    <main className="h-screen w-screen overflow-x-hidden">{children}</main>
  );
};

export default AdminPage;
