import React from "react";

export const RoomCard: React.FC<{ name: string }> = ({ name }) => {
  return <div className="border p-3 rounded">{name}</div>;
};
