import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import { menuItems } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";

const NavbarDesktop: React.FC = () => {
  const { user, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logout();
    } catch (error: unknown) {
      setLogoutError(error instanceof Error ? error.message : "Unable to log out.");
    }
  };

  return (
    <div className="hidden md:flex h-16 w-full items-center justify-between">
      {/* Logo */}
      <Link href={menuItems[0].path} className="text-xl font-semibold text-sky-600">
        Toeic <span className="text-black">Mastery</span>
      </Link>

      {/* Search Bar */}
      <div className="flex w-full max-w-md items-center rounded-md bg-gray-50 px-2">
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          className="w-full bg-transparent px-2 py-1 text-sm outline-none"
        />
        <Button className="rounded-md bg-sky-500 p-1 text-white hover:bg-sky-600">
          <Search size={18} />
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
        {menuItems.slice(1, menuItems.length).map((item, idx) => (
          <Link key={idx} href={item.path} className="hover:text-sky-600">
            {item.label}
          </Link>
        ))}

        {/* Notification */}
        {user && (
          <button className="relative text-gray-600 hover:text-sky-600">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        )}

        {/* Profile or Google login */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile" className="flex items-center space-x-2 rounded-md hover:text-sky-600" aria-label="My Profile">
                <img
                  src={user.avatarUrl ?? "/images/on-luyen-tieng-anh-avata.jpg"}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">My Profile</p>
                </div>
              </Link>
              <Button
                variant="destructive"
                onClick={() => void handleLogout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex">
              <Link href="/login">
                <Button variant="primary">Login with Google</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      {logoutError && <p className="text-sm text-red-600" role="alert">{logoutError}</p>}
    </div>
  );
};

export default NavbarDesktop;
