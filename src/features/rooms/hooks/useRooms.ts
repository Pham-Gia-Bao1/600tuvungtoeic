import { useEffect, useState } from "react";
import { roomService } from "../../services/roomService";

export const useRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  useEffect(() => { roomService.list().then(setRooms); }, []);
  return rooms;
};
