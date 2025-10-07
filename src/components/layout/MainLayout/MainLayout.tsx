import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="container mx-auto flex-1 mt-16 xs:mt-32 ">{children}</main>
      <Footer />
    </div>
  );
};
