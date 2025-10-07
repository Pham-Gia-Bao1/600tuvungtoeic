import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary">
              Toeic <span className="text-gray-800">Mastery</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Nền tảng tự học tiếng Anh trực tuyến hàng đầu Việt Nam.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/about" className="hover:text-primary">
              Giới thiệu
            </Link>
            <Link to="/terms" className="hover:text-primary">
              Điều khoản
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              Chính sách bảo mật
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Liên hệ
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <Link to="https://facebook.com" target="_blank">
              <Facebook
                size={22}
                className="text-gray-500 hover:text-primary transition"
              />
            </Link>
            <Link to="https://twitter.com" target="_blank">
              <Twitter
                size={22}
                className="text-gray-500 hover:text-primary transition"
              />
            </Link>
            <Link to="https://instagram.com" target="_blank">
              <Instagram
                size={22}
                className="text-gray-500 hover:text-primary transition"
              />
            </Link>
            <Link to="https://linkedin.com" target="_blank">
              <Linkedin
                size={22}
                className="text-gray-500 hover:text-primary transition"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8  pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Toeic Mastery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
