import React from "react";

export const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};
