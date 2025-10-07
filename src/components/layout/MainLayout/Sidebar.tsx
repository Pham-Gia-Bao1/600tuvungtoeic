import React from "react";

export const Sidebar: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <div className="mb-4 font-semibold">Sidebar</div>
      <div>{children}</div>
    </aside>
  );
};
