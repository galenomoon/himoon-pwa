import { useState } from "react";

//next
import Link from "next/link";
import Image from "next/image";

//utils
import { IProduct } from "admoon";
import { TbBasketCheck, TbBasketPlus } from "react-icons/tb";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const CartButton = () => {
    const colors = isAddedToCart
      ? "bg-background-black text-typography-yellow"
      : "";
    const Icon = isAddedToCart ? TbBasketCheck : TbBasketPlus;
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsAddedToCart(!isAddedToCart);
        }}
        className={
          "rounded-full self-end h-fit w-fit flex items-center justify-center px-2 py-1 border " +
          colors
        }
      >
        <Icon size={24} />
      </button>
    );
  };

  return (
    <Link
      key={product.id}
      href={`/produtos/${product.category?.slug}/${product.slug}`}
      className="flex flex-shrink-0 flex-col gap-3 rounded-2xl"
    >
      <figure className="relative flex h-48 w-full flex-shrink-0 items-center justify-center rounded-xl">
        <Image
          alt={product.name}
          width={264}
          height={264}
          className="h-full w-full flex-shrink-0 rounded-[32px] object-cover"
          src={product.images?.[0]?.url}
        />
      </figure>
      <div className="flex h-full w-full flex-col items-start justify-between text-start">
        <article className="flex w-full flex-col">
          <h1 title={product.name} className="font-semibold w-full leading-5">
            {product.name}
          </h1>
          <span className="flex items-center gap-2">
            <h1 className="font-bold whitespace-nowrap text-xl">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h1>
          </span>
          <div className="flex gap-2">
            <p
              title={product.description}
              className="font-regular line-clamp-2 text-xs opacity-80"
            >
              {product.description}
            </p>
            <CartButton />
          </div>
        </article>
      </div>
    </Link>
  );
}
