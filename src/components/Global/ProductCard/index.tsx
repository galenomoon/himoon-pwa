import { useContext, useState } from "react";

//next
import Link from "next/link";
import Image from "next/image";

//utils
import { ICartItem, IProduct } from "admoon";
import { TbBasketCheck, TbBasketPlus } from "react-icons/tb";

//contexts
import { CartContext } from "@/contexts/cartContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";

interface ProductCardProps {
  product: IProduct;
  isCartItem?: boolean;
  cartItem?: ICartItem;
}

export function ProductCard({
  product,
  isCartItem,
  cartItem,
}: ProductCardProps) {
  const { addCartItem } = useContext(CartContext);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const AddCartButton = () => {
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
          addCartItem(product, isAddedToCart ? -1 : 1);
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
      href={`/${product.category?.slug}/${product.slug}`}
      className={`flex flex-shrink-0 gap-3 rounded-2xl ${
        isCartItem ? "flex-row" : "flex-col"
      }`}
    >
      <figure
        className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden ${
          isCartItem ? "h-20 w-20 rounded-[16px]" : "h-48 w-full rounded-[32px]"
        }`}
      >
        <Image
          alt={product.name}
          width={264}
          height={264}
          className="h-full w-full flex-shrink-0 object-cover"
          src={product.images?.[0]?.url}
        />
      </figure>
      <div className="flex h-full w-full flex-col items-start justify-between text-start">
        <article className="flex w-full h-full justify-between flex-col">
          <h1 title={product.name} className="font-semibold w-full leading-5">
            {product.name}
          </h1>
          <span className="flex items-center gap-2">
            {isCartItem ? (
              <></>
            ) : (
              <h1 className="font-bold whitespace-nowrap text-xl">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
            )}
          </span>
          <div className="flex gap-2">
            <p
              title={product.description}
              className="font-regular line-clamp-2 text-xs opacity-80"
            >
              {product.description}
            </p>
            {isCartItem ? <></> : <AddCartButton />}
          </div>
          {isCartItem ? (
            <div className="flex gap-2 w-full items-center justify-between">
              <h1 className="font-bold whitespace-nowrap text-xl">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <ProductCartCounter product={product} cartItem={cartItem} />
            </div>
          ) : null}
        </article>
      </div>
    </Link>
  );
}

export function ProductCartCounter({
  product,
  cartItem,
}: {
  product: IProduct;
  cartItem: ICartItem | undefined;
}) {
  const { removeCartItem, incrementCartItem, decrementCartItem } =
    useContext(CartContext);

  return (
    <section className="rounded-lg flex items-center justify-center border-background-black/20 overflow-hidden">
      <button
        onClick={() => cartItem?.quantity === 1 ? removeCartItem(product.id) : decrementCartItem(product)}
        className="flex items-center rounded-l-lg justify-center px-2 py-1 w-full h-full bg-background-gray"
      >
        {cartItem?.quantity === 1 ? (
          <LuTrash2 size={20} />
        ) : (
          <FaMinus size={20} />
        )}
      </button>
      <div className="flex items-center justify-center w-ful h-full text-center">
        <p className="px-4 py-2">{cartItem?.quantity}</p>
      </div>
      <button
        onClick={() => incrementCartItem(product)}
        className="flex items-center rounded-r-lg justify-center px-2 py-1 w-full h-full bg-background-gray"
      >
        <FaPlus size={20} />
      </button>
    </section>
  );
}
