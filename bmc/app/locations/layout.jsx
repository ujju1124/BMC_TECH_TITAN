import React from "react";
import UsersLayout from "@/components/layouts/UsersLayout";

const LocationsLayout = ({ children }) => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">{children}</main>
  );
};

export default LocationsLayout;
