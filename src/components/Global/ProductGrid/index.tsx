import React from "react";
import { IProduct } from "admoon";

//components
import { ProductCard } from "../ProductCard";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products = [] }: ProductGridProps) {
  return (
    <section className="grid grid-cols-2 w-full overflow-auto gap-2 gap-y-6 rounded-3xl">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
