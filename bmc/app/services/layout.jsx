import React, { Suspense } from "react";
import Header from "../_navbar/page";
import Loader from "../loading";

export const metadata = {
  title: "Services - Path Finder",
};

const ServicesLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <main className="min-h-screen w-screen">
        <Header />
        <section>{children}</section>
      </main>
    </Suspense>
  );
};

export default ServicesLayout;
