import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Room = { id: string; name: string };
type State = { items: Room[] };
const initialState: State = { items: [] };

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (s, a: PayloadAction<Room[]>) => { s.items = a.payload; },
  },
});

export const { setRooms } = slice.actions;
export default slice.reducer;
