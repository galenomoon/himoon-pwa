import React, { useContext } from "react";
import { IProduct } from "admoon";

//next
import Link from "next/link";
import { usePathname } from "next/navigation";

//components
import Button from "../Button";
import AuthModal from "../AuthModal";

//styles
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsBox2Heart, BsBox2HeartFill } from "react-icons/bs";
import {
  PiBell,
  PiBellFill,
  PiHeart,
  PiHeartFill,
  PiSpinner,
  PiUserCircle,
  PiUserCircleFill,
} from "react-icons/pi";

//context
import { CartContext } from "@/contexts/cartContext";
import { AuthContext } from "@/contexts/authContext";

//requests
import { createFavorite } from "@/requests/favorite/createFavorite";

export default function TabNavigator({
  product,
  isLoading,
}: {
  product?: IProduct;
  isLoading?: boolean;
}) {
  const pathname = usePathname();
  const { openModal = () => {}, currentUser } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = React.useState(currentUser?.favorites?.includes(product?.id));
  const [isFavoriteLoading, setIsFavoriteLoading] = React.useState(false);
  const { addCartItem } = useContext(CartContext);
  const isAuthenticated = !!currentUser?.id;

  const tabs = [
    {
      isAuthRequired: false,
      icon: {
        disabled: GoHome,
        active: GoHomeFill,
        props: {
          size: 28,
        },
      },
      label: "Início",
      href: pathname === "/buscar" ? "/" : "/buscar",
    },
    {
      isAuthRequired: false,
      icon: {
        disabled: PiHeart,
        active: PiHeartFill,
        props: {
          size: 28,
        },
      },
      label: "Favoritos",
      href: "/favoritos",
    },
    {
      isAuthRequired: false,
      icon: {
        disabled: BsBox2Heart,
        active: BsBox2HeartFill,
        props: {
          size: 22,
          className: "px-2",
        },
      },
      label: "Meus pedidos",
      href: "/pedidos",
    },
    {
      isAuthRequired: false,
      icon: {
        disabled: PiBell,
        active: PiBellFill,
        props: {
          size: 28,
        },
      },
      label: "Notificações",
      href: "/notificacoes",
    },
    {
      isAuthRequired: true,
      icon: {
        disabled: PiUserCircle,
        active: PiUserCircleFill,
        props: {
          size: 28,
        },
      },
      label: "Perfil",
      href: "/perfil",
    },
  ];

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

    try {
      if (!product?.id) return;
      await createFavorite(String(product?.id) as string);
      toast("Produto favoritado com sucesso!", { icon: "❤️" });
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao favoritar produto");
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <>
      <AuthModal />
      <section
        className={`z-30 flex items-center shadow-2xl tabnavigation-shadow justify-around h-24 w-full fixed bottom-0 bg-white ${
          product ? "desktop:hidden" : ""
        }`}
      >
        <nav className="flex items-center justify-around h-full w-full max-w-screen-desktop">
          {/*   */}
          {product ? (
            <div className="flex items-center justify-between mx-3 mb-4 gap-3 w-full">
              <button onClick={handleFavorite} className="flex-shrink-0">
                {isFavoriteLoading ? <ImSpinner8 size={34} className="animate-spin" /> : isFavorite ? <PiHeartFill size={34} /> : <PiHeart size={34} />}
              </button>
              <Button
                onClick={() => {
                  addCartItem(product as IProduct, 1);
                  toast("Produto adicionado ao carrinho!", {
                    icon: "🛒",
                  });
                }}
                disabled={isLoading}
                className="w-full uppercase font-bold"
              >
                {isLoading ? (
                  <PiSpinner size={24} className="animate-spin" />
                ) : (
                  "Adicionar ao carrinho"
                )}
              </Button>
            </div>
          ) : (
            tabs.map((tab, index) => {
              const isActive =
                (pathname === "/buscar" || pathname === "/") &&
                (tab.href === "/" || tab.href === "/buscar")
                  ? true
                  : pathname === tab.href;
              const Icon = tab.icon[isActive ? "active" : "disabled"];
              const props = tab.icon.props;

              const Element =
                tab.isAuthRequired && !isAuthenticated
                  ? "button"
                  : (Link as unknown as React.ElementType);

              const elementProps =
                tab.isAuthRequired && !isAuthenticated
                  ? { onClick: openModal }
                  : { href: tab.href };

              return (
                <Element
                  key={index}
                  {...elementProps}
                  className="flex text-center h-full min-w-16 flex-col pt-2 pb-10 items-center justify-between"
                >
                  <div className="h-12 flex items-center justify-center">
                    <Icon {...props} className="flex-shrink-0" />
                  </div>
                  <span className="text-xs whitespace-nowrap">{tab.label}</span>
                </Element>
              );
            })
          )}
        </nav>
      </section>
    </>
  );
}
