import React, { useEffect, useRef, useState } from "react";
import { Menu, Search, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { menuItems } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext"; // 👈 lấy auth
import { Button } from "@/components/common/Button/Button";

const NavbarMobile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);
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
          to={menuItems[0].path}
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
            <Link key={idx} to={item.path} className="hover:text-sky-600">
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
              <div className="flex items-center space-x-3 pt-2 border-t">
                <img
                  src="/images/on-luyen-tieng-anh-avata.jpg"
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">Ranking member</p>
                </div>
                <Button onClick={logout} variant="destructive">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3 pt-2 ">
              <Link className="w-full" to="/">
                <Button onClick={() => login("Gia Bao")} variant="primary">
                  Login
                </Button>
              </Link>
              <Link className="w-full" to="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default NavbarMobile;
