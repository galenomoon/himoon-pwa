import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";
import NextHeader from "@/components/NextHeader";
import { Carousel } from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import TabNavigator from "@/components/TabNavigation";
// import CategoriesList from "@/components/CategoriesList";

//styles
import toast from "react-hot-toast";
import { GoShare } from "react-icons/go";
import { SiWhatsapp } from "react-icons/si";
import { PiHeart, PiSpinner } from "react-icons/pi";

//admoon
import { getProduct, getProducts, IProduct } from "admoon";

//context
import { CartContext } from "@/contexts/cartContext";

export default function ProductPage() {
  const router = useRouter();
  const { addCartItem } = useContext(CartContext);
  const { productSlug, categorySlug } = router.query;
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState<boolean>(false);
  const url = `https://himoonstore.com/${categorySlug}/${productSlug}`;

  useEffect(() => {
    getCurrentProduct(productSlug);
    fetchProductsByCategory(categorySlug);
  }, [productSlug, categorySlug]);

  async function getCurrentProduct(
    product_slug: string | string[] | undefined
  ) {
    if (!product_slug) return;

    try {
      setIsLoading(true);
      const result = await getProduct(product_slug as string);

      setCurrentProduct(result as unknown as IProduct);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProductsByCategory(
    category_slug: string | string[] | undefined
  ) {
    if (!category_slug) return;

    try {
      setIsLoading(true);
      const response = await getProducts({
        category_slug: category_slug as string,
      });
      setProducts(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function copyURL(type: "whatsapp" | "link") {
    if (type === "whatsapp" && window !== undefined) {
      const whatsAppUrl = `https://api.whatsapp.com/send?text=${url}`;
      window?.open(whatsAppUrl, "_blank");
      return;
    }

    navigator.clipboard.writeText(url);
    toast("Link copiado com sucesso!", {
      icon: "🔗",
    });
  }

  return (
    <main className="flex flex-col h-fit w-screen items-center text-typography-primary bg-background-purple">
      <NextHeader
        statusColorType="default"
        title={currentProduct?.name}
        description={currentProduct?.description}
      />
      <Header backTo="/buscar" />
      <section className="text-center max-w-screen-desktop items-center  text-typography-primary desktop:py-12 pb-12 min-h-[90dvh] relative">
        <nav className="flex desktop:flex-row flex-col gap-6">
          <Carousel
            isLoading={isLoading}
            images={currentProduct?.images?.map((image) => image?.url) || []}
          />
          <article className="flex w-full max-w-screen-desktop flex-col gap-1 items-center relative desktop:p-8 p-3 desktop:mb-0 mb-16 bg-white rounded-3xl">
            <button
              onClick={() => setIsOpenShareModal(true)}
              className="rounded-full absolute right-3 top-3 h-9 w-9 flex items-center justify-center bg-background-gray flex-shrink-0"
            >
              <GoShare size={22} />
            </button>
            <Skeleton
              conditional={!isLoading}
              className="!w-[128px] !h-[32px] rounded-xl"
            >
              <p className="text-3xl font-light">
                {(currentProduct?.price || 0).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </Skeleton>
            <Skeleton
              conditional={!isLoading}
              className="!w-[256px] !h-[24px] rounded-lg"
            >
              <h1 className="desktop:text-xl text-2xl font-semibold">{currentProduct?.name}</h1>
            </Skeleton>
            <div className="flex items-center justify-between mx-3 my-4 gap-3 w-full mobile:hidden desktop:flex">
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
                  addCartItem(currentProduct as IProduct, 1);
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
            <Skeleton
              length={5}
              conditional={!isLoading}
              className="!w-[80%] !h-[16px] rounded-md"
            >
              <h1 className="text-sm font-light">
                {currentProduct?.description}
              </h1>
            </Skeleton>
            {/* <CategoriesList
            isRow
            isCenter
            categoriesIds={[currentProduct?.category?.id as never]}
          /> */}
            {products.length > 0 && (
              <div className="flex w-full flex-col pt-4 desktop:hidden">
                <p className="font-light text-xl self-start mb-4">
                  Veja também:
                </p>
                <ProductGrid
                  useWindowScroll
                  products={products}
                  className="!pb-0"
                />
              </div>
            )}
          </article>
        </nav>
        {products.length > 0 && (
          <article className="mobile:hidden desktop:flex w-full max-w-screen-desktop flex-col gap-1 items-center relative p-8 mb-[120px] mt-4 bg-white rounded-3xl">
            <div className="flex w-full flex-col mobile:hidden desktop:flex">
              <p className="font-light text-xl self-start mb-4">Veja também:</p>
              <ProductGrid
                useWindowScroll
                products={products}
                className="!pb-0"
              />
            </div>
          </article>
        )}
      </section>
      <Modal
        title="Compartilhar"
        isOpen={isOpenShareModal}
        className="!h-fit self-center m-2 !rounded-3xl"
        onClose={() => setIsOpenShareModal(false)}
      >
        <section className="flex flex-col gap-4">
          <button
            onClick={() => copyURL("whatsapp")}
            className="rounded-full flex gap-2 items-center justify-center w-full py-3 bg-[#25D366] text-white"
          >
            <SiWhatsapp size={20} />
            <p className="font-bold">Compartilhar no WhatsApp</p>
          </button>
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-background-black/20 p-2">
            <input
              disabled
              type="text"
              value={url}
              className="w-full outline-none select-text text-center bg-transparent"
            />
            <Button
              onClick={() => copyURL("link")}
              className="flex-shrink-0 w-[80px] font-bold !py-2 !text-sm"
            >
              <p>Copiar</p>
            </Button>
          </div>
        </section>
      </Modal>
      <TabNavigator product={currentProduct} />
    </main>
  );
}
