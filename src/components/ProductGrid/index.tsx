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
  className?: string;
  useWindowScroll?: boolean;
  itemWrapperClassName?: string;
}

export default function ProductGrid({
  hasMore,
  isLoading,
  products = [],
  endReached = () => {},
  className = "",
  useWindowScroll = false,
  itemWrapperClassName = "",
}: ProductGridProps) {
  return (
    <section
      className={`w-full h-full pb-[128px] ${className} ${
        isLoading ? "animate-[pulse_600ms_ease-in-out_infinite]" : ""
      }`}
    >
      <VirtuosoGrid
        data={products}
        useWindowScroll={useWindowScroll}
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
            <ItemWrapper className={itemWrapperClassName}>
              <ProductCard key={product.id} product={product} />
            </ItemWrapper>
          );
        }}
      />
    </section>
  );
}

const List = forwardRef(
  ({ style, children, ...props }: { style: any; children: any }, ref) => (
    <div
      {...props}
      ref={ref as any}
      className="grid grid-cols-2 bg-white scrollbar-hide"
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
  <div ref={ref as any} {...props}>
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
