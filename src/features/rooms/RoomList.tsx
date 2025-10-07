import React, { useEffect, useState } from "react";
import { roomService } from "../../services/roomService";

export const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<{id:string;name:string}[]>([]);
  useEffect(() => { roomService.list().then(setRooms); }, []);
  return (
    <div>
      {rooms.map(r => <div key={r.id} className="p-2 border mb-2">{r.name}</div>)}
    </div>
  );
};
