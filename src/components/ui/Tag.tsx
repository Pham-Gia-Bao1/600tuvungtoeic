import React from "react";

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="inline-block px-2 py-1 bg-gray-200 rounded text-sm">{children}</span>;
};
