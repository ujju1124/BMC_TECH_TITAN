import React from "react";
import Header from "../../app/_navbar/page";
import Footer from "../Footer/page";

const UsersLayout = ({ children }) => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default UsersLayout;
