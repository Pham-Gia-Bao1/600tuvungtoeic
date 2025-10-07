import { useEffect, useState } from "react";
import type { Product } from "../../../types/product";
import { productService } from "../../../services/productService";

export const useProducts = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { productService.list().then(setItems); }, []);
  return items;
};
