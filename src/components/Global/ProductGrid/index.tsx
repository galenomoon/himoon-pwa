import React, { forwardRef } from "react";
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
      className="grid grid-cols-2 scrollbar-hide"
      style={{ ...style }}
    >
      {children}
    </div>
  )
);

const Footer = forwardRef(({ ...props }, ref) => (
  <div ref={ref as any} {...props} className="flex justify-center items-center">
    <PiSpinner size={24} className="animate-spin" />
  </div>
));

const Item = forwardRef(({ children, ...props }: any, ref) => (
  <div
    ref={ref as any}
    {...props}
    style={{
      width: "100%",
      display: "flex",
      flex: "none",
      alignContent: "stretch",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
));

const ItemWrapper = ({ children, ...props }: any) => (
  <div
    className="w-full"
    {...props}
    style={{
      padding: "0.25rem",
    }}
  >
    {children}
  </div>
);

List.displayName = "List";
Footer.displayName = "Footer";
Item.displayName = "Item";

const gridComponents = {
  List,
  Footer,
  Item,
};

export default function ProductGrid({
  hasMore,
  isLoading,
  products = [],
  endReached = () => {},
}: ProductGridProps) {
  return (
    <section
      className={`w-full h-full px-2 rounded-3xl scrollbar-hide ${
        isLoading ? "animate-[pulse_600ms_ease-in-out_infinite]" : ""
      }`}
    >
      <VirtuosoGrid
        data={products}
        style={{ height: "100%" }}
        endReached={endReached}
        totalCount={products.length / 2}
        overscan={200}
        components={
          {
            ...gridComponents,
            Footer: hasMore ? gridComponents.Footer : () => <br />,
          } as any
        }
        itemContent={(_, product) => {
          return (
            <ItemWrapper>
              <ProductCard key={product.id} product={product} />
            </ItemWrapper>
          );
        }}
      />
    </section>
  );
}
