import React, { forwardRef, useMemo } from "react";
import { IProduct } from "admoon";

//components
import { VirtuosoGrid } from "react-virtuoso";
import { PiSpinner } from "react-icons/pi";
import { ProductCard } from "../ProductCard";

interface ProductGridProps {
  hasMore?: boolean;
  isLoading?: boolean;
  products: IProduct[];
  endReached?: () => void;
}

const List = forwardRef(
  ({ style, children, ...props }: { style: any; children: any }, ref) => (
    <div
      {...props}
      ref={ref as any}
      className="grid grid-cols-2 space scrollbar-hide"
      style={{ ...style }}
    >
      {children}
    </div>
  )
);

List.displayName = "List";


// const Footer = forwardRef(({ ...props }) => (
//     <div {...props} className="flex justify-center items-center">
//       <PiSpinner size={24} className="animate-spin" />
//     </div>
//   ));

export default function ProductGrid({
  hasMore,
  isLoading,
  products = [],
  endReached = () => {},
}: ProductGridProps) {
  return (
    <section
      className={`w-full rounded-3xl scrollbar-hide ${
        isLoading ? "animate-[pulse_600ms_ease-in-out_infinite]" : ""
      }`}
    >
      <VirtuosoGrid
        data={products}
        style={{ height: "74dvh" }}
        endReached={endReached}
        overscan={5}
        components={
          {
            List,
          } as any
        }
        itemContent={(_, product) => {
          return <ProductCard key={product.id} product={product} />;
        }}
      />
    </section>
  );
}