import React from "react";
import type { Product } from "../../../types/product";

export const ProductCard: React.FC<{ item: Product }> = ({ item }) => {
  return (
    <div className="border p-3 rounded">
      <h4 className="font-semibold">{item.name}</h4>
      <p className="text-sm">{item.description}</p>
      <div className="mt-2 font-bold">{item.price}</div>
    </div>
  );
};
