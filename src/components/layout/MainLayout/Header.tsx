import React from "react";
import NavbarDesktop from "./Navbar/NavbarDesktop";
import NavbarMobile from "./Navbar/NavbarMobile";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <NavbarDesktop />
        <NavbarMobile />
      </div>
    </header>
  );
};

export default Header;
