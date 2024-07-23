import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Modal from "@/components/Global/Modal";
import Header from "@/components/Global/Header";
import Button from "@/components/Global/Button";
import Skeleton from "@/components/Global/Skeleton";
import NextHeader from "@/components/Global/NextHeader";
import ProductGrid from "@/components/Global/ProductGrid";
import CategoriesList from "@/components/SearchPage/CategoriesList";

//styles
import toast from "react-hot-toast";
import { GoShare } from "react-icons/go";
import { PiSpinner } from "react-icons/pi";
import { SiWhatsapp } from "react-icons/si";

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
    <main className="flex flex-col h-fit w-screen text-typography-primary">
      <NextHeader
        statusColorType="default"
        title={currentProduct?.name}
        description={currentProduct?.description}
      />
      <section className="text-center items-center rounded-t-[36px] text-typography-primary pb-12 flex flex-col min-h-[90dvh] bg-white relative">
        <Header backTo="/buscar" />
        <figure className="my-4 scrollbar-hide overflow-auto min-h-[300px] flex gap-2 snap-x snap-mandatory">
          <Skeleton
            length={4}
            conditional={!isLoading || !currentProduct?.images.length}
            className="first:ml-4 last:mr-8 rounded-[42px] h-[300px] border-2 border-light-gray overflow-hidden snap-always snap-center flex-shrink-0 !w-[80%] object-cover"
          >
            {currentProduct?.images?.map((image) => (
              <img
                key={image.id}
                src={image.url || "https://via.placeholder.com/800x800.png"}
                className="first:ml-4 last:mr-8 rounded-[42px] max-h-[400px] border-2 border-light-gray overflow-hidden snap-always snap-center flex-shrink-0 w-[90%] object-cover"
                alt="product"
              />
            ))}
          </Skeleton>
        </figure>
        <article className="flex flex-col gap-1 items-center px-3">
          <Skeleton conditional={!isLoading} className="w-[128px] rounded-xl">
            <p className="text-3xl font-light">
              {(currentProduct?.price || 0).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Skeleton>
          <Skeleton
            conditional={!isLoading}
            className="w-[256px] h-[24px] rounded-lg"
          >
            <h1 className="text-2xl font-semibold">{currentProduct?.name}</h1>
          </Skeleton>
          <Skeleton
            conditional={!isLoading}
            className="w-[300px] h-[16px] rounded-md"
          >
            <h1 className="text-sm font-light">
              {currentProduct?.description}
            </h1>
          </Skeleton>
        </article>

        <div className="flex flex-col p-3 w-full">
          <CategoriesList
            isRow
            isCenter
            categoriesIds={[currentProduct?.category?.id as never]}
          />
          <div className="flex gap-2 my-4">
            <Button
              onClick={() => {
                addCartItem(currentProduct as IProduct, 1);
                toast("Produto adicionado ao carrinho!", {
                  icon: "🛒",
                });
              }}
              className="w-full uppercase font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <PiSpinner size={24} className="animate-spin" />
              ) : (
                "Adicionar ao carrinho"
              )}
            </Button>
            <button
              onClick={() => setIsOpenShareModal(true)}
              className="rounded-full h-12 w-12 flex items-center justify-center bg-background-gray flex-shrink-0"
            >
              <GoShare size={24} />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col px-3">
          <p className="font-light text-xl self-start mb-4">Veja também:</p>
          <ProductGrid products={products} />
        </div>
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
    </main>
  );
}
