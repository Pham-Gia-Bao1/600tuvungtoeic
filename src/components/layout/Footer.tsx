import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto p-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};
