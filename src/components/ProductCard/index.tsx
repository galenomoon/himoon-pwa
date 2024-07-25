import { useContext, useState } from "react";

//next
import Link from "next/link";
import Image from "next/image";

//utils
import { ICartItem, IProduct } from "admoon";
import { TbBasketCheck, TbBasketPlus } from "react-icons/tb";

//contexts
import { CartContext } from "@/contexts/cartContext";

//styles
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
          if (!isAddedToCart) {
            toast("Produto adicionado ao carrinho", {
              icon: "🛒",
            });
          } else {
            toast.error("Produto removido do carrinho", {
              icon: "🗑️",
            });
          }
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
      className={`flex flex-shrink-0 gap-3 relative min-h-[300px] rounded-2xl ${
        isCartItem ? "flex-row" : "flex-col"
      }`}
    >
      <figure
        className={`relative flex scrollbar-hide overflow-auto flex-shrink-0 snap-x snap-mandatory items-center justify-start ${
          isCartItem
            ? "h-20 w-20 rounded-[16px]"
            : "h-48 w-full min-w-44 rounded-[32px]"
        }`}
      >
        {product.images.map((image) => (
          <Image
            width={264}
            height={264}
            key={image.id}
            src={image?.url}
            alt={product.name}
            className="h-full w-full flex-shrink-0 object-cover snap-always snap-center"
          />
        ))}
      </figure>
      <div className="flex h-full w-full flex-col items-start justify-between text-start">
        <article className="flex w-full h-full justify-between flex-col">
          <h1
            title={product.name}
            className="text-sm font-medium w-full leading-5 line-clamp-2"
          >
            {product.name}
          </h1>
          <span className="flex items-center gap-2">
            {isCartItem ? (
              <></>
            ) : (
              <h1 className="font-light whitespace-nowrap text-2xl">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
            )}
          </span>
          {/* 
            <p
              title={product.description}
              className="font-regular line-clamp-1 w-[85%] text-xs opacity-60"
            >
              {product.description}
            </p> 
          */}
          <div className="flex gap-2 absolute bottom-3 right-0">
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
        onClick={() =>
          cartItem?.quantity === 1
            ? removeCartItem(product.id)
            : decrementCartItem(product)
        }
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
