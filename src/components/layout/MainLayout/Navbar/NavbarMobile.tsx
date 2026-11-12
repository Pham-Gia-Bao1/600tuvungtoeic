import React, { useEffect, useRef, useState } from "react";
import { Menu, Search, X, Bell } from "lucide-react";
import Link from "next/link";
import { menuItems } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext"; // 👈 lấy auth
import { Button } from "@/components/common/Button/Button";

const NavbarMobile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await logout();
    } catch (error: unknown) {
      setLogoutError(error instanceof Error ? error.message : "Unable to log out.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:hidden w-full">
      {/* Header Row */}
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={menuItems[0].path}
          className="text-xl font-semibold text-sky-600"
        >
          Toeic <span className="text-black">Mastery</span>
        </Link>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 hover:text-sky-600"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 px-4 py-2">
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          className="w-full bg-transparent px-2 py-1 text-sm text-gray-700 outline-none"
        />
        <button className="rounded-md bg-sky-500 p-1 text-white hover:bg-sky-600">
          <Search size={18} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <nav
          ref={navRef}
          className="flex flex-col space-y-4 bg-white px-4 py-4 text-sm font-medium text-gray-700"
        >
          {menuItems.slice(1).map((item, idx) => (
            <Link key={idx} href={item.path} className="hover:text-sky-600">
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              {/* Notification */}
              <button className="flex items-center gap-2 text-gray-600 hover:text-sky-600">
                <Bell size={20} />
                Thông báo
              </button>

              {/* Profile */}
              <div className="flex items-center justify-between gap-3 border-t pt-3">
                <Link href="/profile" onClick={() => setOpen(false)} className="flex min-w-0 items-center space-x-3 hover:text-sky-600">
                  <img
                    src={user.avatarUrl ?? "/images/on-luyen-tieng-anh-avata.jpg"}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">My Profile</p>
                  </div>
                </Link>
                <Button onClick={() => void handleLogout()} variant="destructive">
                  Logout
                </Button>
              </div>
              {logoutError && <p className="text-sm text-red-600" role="alert">{logoutError}</p>}
            </>
          ) : (
            <div className="flex flex-col space-y-3 pt-2 ">
              <Link className="w-full" href="/login">
                <Button variant="primary">Login with Google</Button>
              </Link>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default NavbarMobile;
