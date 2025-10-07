import React from "react";
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button/Button";
import { menuItems } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext"; // 👈 import Auth

const NavbarDesktop: React.FC = () => {
  const { user, login, logout } = useAuth(); // 👈 lấy user từ context

  return (
    <div className="hidden md:flex h-16 w-full items-center justify-between">
      {/* Logo */}
      <Link to={menuItems[0].path} className="text-xl font-semibold text-sky-600">
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
          <Link key={idx} to={item.path} className="hover:text-sky-600">
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

        {/* Profile or Login/Register */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <img
                src="/images/on-luyen-tieng-anh-avata.jpg"
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">Ranking member</p>
              </div>
              <Button
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={() => login("Gia Bao")}
              >
                Login
              </Button>
              <Link
                to="/register"

              >
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarDesktop;
