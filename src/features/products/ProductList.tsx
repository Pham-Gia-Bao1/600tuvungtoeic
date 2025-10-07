import React, { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";

export const ProductList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => { productService.list().then(setItems); }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(p => <div key={p.id} className="border p-3 rounded">{p.name}</div>)}
    </div>
  );
};
