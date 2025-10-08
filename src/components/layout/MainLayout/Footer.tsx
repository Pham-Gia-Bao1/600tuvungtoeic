import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-gray-700">
      {/* Subscribe Section */}
      <div className="border-b border-gray-200 py-6 px-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Nhận thông tin bài học mới và cập nhật TOEIC hàng tuần từ Toeic
              Mastery.
            </p>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <input
              type="email"
              placeholder="Write Email"
              className="px-4 py-2 border border-gray-300 rounded-l-lg w-full md:w-72 focus:outline-none"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid gap-8 md:grid-cols-5">
        {/* Brand Info */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold">
            TOEIC <span className="text-primary">Mastery</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Nền tảng tự học TOEIC toàn diện cho người Việt.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link to="https://facebook.com" target="_blank">
              <Facebook className="text-gray-500 hover:text-primary" size={18} />
            </Link>
            <Link to="https://twitter.com" target="_blank">
              <Twitter className="text-gray-500 hover:text-primary" size={18} />
            </Link>
            <Link to="https://linkedin.com" target="_blank">
              <Linkedin className="text-gray-500 hover:text-primary" size={18} />
            </Link>
            <Link to="https://instagram.com" target="_blank">
              <Instagram className="text-gray-500 hover:text-primary" size={18} />
            </Link>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm">
            <li>Planning</li>
            <li>Research</li>
            <li>Consulting</li>
            <li>Analysis</li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h4 className="font-semibold mb-3">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Listening Practice</li>
            <li>Reading Tests</li>
            <li>Vocabulary Builder</li>
            <li>Mock Exams</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm">
            <strong>Call:</strong> +84 123 456 789
          </p>
          <p className="text-sm">
            <strong>Email:</strong> support@toeicmastery.com
          </p>
          <iframe
            title="map"
            className="mt-3 w-full h-24 rounded-lg border border-gray-200"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9114!2d105.7750!3d21.0362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab54b2cf6cf1%3A0xe2d1b87ec2a86c71!2sVietnam!5e0!3m2!1sen!2s!4v0000000000000"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-gray-300 text-sm py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-2">
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/history" className="hover:text-white">
              Our History
            </Link>
            <Link to="/what-we-do" className="hover:text-white">
              What We Do
            </Link>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Toeic Mastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;