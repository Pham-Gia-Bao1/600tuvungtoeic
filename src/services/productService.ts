import { axiosClient } from "./axiosClient";
import type { Product } from "../types/product";

export const productService = {
  async list(): Promise<Product[]> {
    // replace with real API call
    // const res = await axiosClient.get('/products');
    // return res.data;
    return [
      { id: "p1", name: "Product A", price: 1000, description: "Demo product" },
      { id: "p2", name: "Product B", price: 2000, description: "Demo product 2" },
    ];
  }
};
