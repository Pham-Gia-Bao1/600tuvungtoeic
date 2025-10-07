import React from "react";
import type { CartItem } from "../../../types/cart";

export const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {
  return <div className="flex justify-between p-2 border-b">{item.name} <span>{item.qty}</span></div>;
};
