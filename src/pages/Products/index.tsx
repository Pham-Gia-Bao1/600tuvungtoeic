import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { productService } from "../../services/productService";
import type { Product } from "../../types/product";
import { Card } from "../../components/ui/Card";

const Products: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    productService.list().then(setItems);
  }, []);
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => (
          <Card key={p.id} title={p.name}>
            <div>Price: {p.price}</div>
            <div className="text-sm text-gray-600">{p.description}</div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Products;
