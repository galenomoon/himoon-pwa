import { CartContext } from "@/contexts/cartContext";
import { AuthContext } from "@/contexts/authContext";
import { usePathname } from "next/navigation";
import { Bell, Heart, House, Package, Student, User } from "@phosphor-icons/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { IProduct } from "admoon";
import AuthModal from "../AuthModal";
import { PiHeart, PiSpinner } from "react-icons/pi";
import Button from "../Button";
import toast from "react-hot-toast";

export default function TabNavigatior({
  product,
  isLoading,
}: {
  product?: IProduct;
  isLoading?: boolean;
}) {
  const pathname = usePathname();
  const { openModal, currentUser } = useContext(AuthContext);
  const { addCartItem } = useContext(CartContext);
  const isAuthenticated = !!currentUser?.id;

  const pages = [
    [
      {
        label: "Início",
        icon: House,
        path: pathname === "/buscar" ? "/" : "/buscar",
      },
      {
        label: "Favoritos",
        icon: Heart,
        path: "/favoritos",
        // isAuthRequired: true,
      },
      {
        label: "Meus pedidos",
        icon: Package,
        path: "/pedidos",
        // isAuthRequired: true,
      },
      {
        label: "Notificações",
        icon: Bell,
        path: "/notificacoes",
        // isAuthRequired: true,
      },
      // {
      //   label: "Perfil",
      //   icon: Student,
      //   path: "/perfil",
        // isAuthRequired: true,
      // },
    ],
  ];

  useEffect(() => {
    const secondPagePaths = pages?.[1]
      ?.map((item) => item.path)
      .filter(Boolean);
    const shouldScrollToSecondPage = secondPagePaths?.includes(pathname);

    if (shouldScrollToSecondPage) {
      setTimeout(() => {
        const container = document.querySelector(".overflow-x-scroll");
        if (container) {
          container.scrollTo({
            left: container.scrollWidth,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [pathname, pages]);

  return (
    <>
      <AuthModal />
      {product ? (
        <nav className="fixed flex bottom-0 left-0 right-0 snap-x snap-mandatory overflow-x-scroll scrollbar-hide bg-white shadow-sm z-90 pt-2 pb-10">
          <div className="flex items-center justify-between mx-3 mb-4 gap-3 w-full">
            <button
              onClick={() => {
                toast("Em breve você poderá favoritar produtos!", {
                  icon: "❤️",
                });
              }}
              className="flex-shrink-0"
            >
              <PiHeart size={34} />
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
        </nav>
      ) : (
        <nav className="fixed flex bottom-0 left-0 right-0 snap-x snap-mandatory overflow-x-scroll scrollbar-hide bg-background-purple shadow-sm z-90 pt-2 pb-10">
          {pages.map((page, index) => (
            <section
              key={index}
              className="flex justify-evenly snap-start flex-shrink-0 w-full"
            >
              {page.map(({ label, path, icon: Icon, isAuthRequired }: any) => {
                const isActive =
                  (pathname === "/buscar" || pathname === "/") &&
                  (path === "/" || path === "/buscar")
                    ? true
                    : pathname === path;

                const Element =
                  isAuthRequired && !isAuthenticated
                    ? "button"
                    : (Link as unknown as React.ElementType);
                const elementProps =
                  isAuthRequired && !isAuthenticated
                    ? { onClick: openModal }
                    : { href: path };

                return (
                  <Element
                    key={path || label}
                    className={`flex flex-col items-center text-xs transition-all ${
                      isActive ? "text-yellow font-semibold" : "text-white/60"
                    } disabled:opacity-30`}
                    {...elementProps}
                  >
                    <Icon
                      size={24}
                      weight={isActive ? "fill" : "regular"}
                      className={isActive ? "text-yellow" : "text-white/60"}
                    />
                    <span>{label}</span>
                  </Element>
                );
              })}
            </section>
          ))}
        </nav>
      )}
    </>
  );
}
