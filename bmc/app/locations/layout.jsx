import React from "react";
import Header from "../_navbar/page";

export const metadata = {
  title: "Avilable Locations - Path Finder",
};


// Layout for Locations
const LocationsLayout = ({ children }) => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      <Header />
      <section className="mt-20">{children}</section>
    </main>
  );
};

export default LocationsLayout;
