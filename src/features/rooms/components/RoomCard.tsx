import React from "react";

export const RoomCard: React.FC<{ id: string; name: string }> = ({ id, name }) => {
  return <div className="border p-3 rounded">{name}</div>;
};
