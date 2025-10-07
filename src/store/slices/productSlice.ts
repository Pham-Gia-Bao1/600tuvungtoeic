import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

type State = { items: Product[] };
const initialState: State = { items: [] };

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (s, a: PayloadAction<Product[]>) => { s.items = a.payload; },
  },
});

export const { setProducts } = slice.actions;
export default slice.reducer;
