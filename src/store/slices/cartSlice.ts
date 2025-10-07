import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";

type State = { items: CartItem[] };
const initialState: State = { items: [] };

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (s, a: PayloadAction<CartItem>) => { s.items.push(a.payload); },
    removeItem: (s, a: PayloadAction<string>) => { s.items = s.items.filter(i => i.id !== a.payload); },
  },
});

export const { addItem, removeItem } = slice.actions;
export default slice.reducer;
