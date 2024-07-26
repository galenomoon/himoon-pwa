import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";
import NextHeader from "@/components/NextHeader";
import ProductGrid from "@/components/ProductGrid";
// import CategoriesList from "@/components/CategoriesList";

//styles
import toast from "react-hot-toast";
import { GoShare } from "react-icons/go";
import { SiWhatsapp } from "react-icons/si";

//admoon
import { getProduct, getProducts, IProduct } from "admoon";

//context
import TabNavigator from "@/components/TabNavigation";

export default function ProductPage() {
  const router = useRouter();
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
      <Header backTo="/buscar" />
      <section className="text-center items-center bg-background-purple text-typography-primary pb-12 flex flex-col min-h-[90dvh] relative">
        <figure className="py-4 scrollbar-hide overflow-auto min-h-[300px] flex gap-2 snap-x snap-mandatory">
          <Skeleton
            length={4}
            conditional={!isLoading || !currentProduct?.images.length}
            className="first:ml-4 last:mr-8 rounded-3xl h-[300px] border-2 border-light-gray overflow-hidden snap-always snap-center flex-shrink-0 !w-[80%] object-cover"
          >
            {currentProduct?.images?.map((image) => (
              <img
                key={image.id}
                src={image.url || "https://via.placeholder.com/800x800.png"}
                className="first:ml-4 last:mr-8 rounded-3xl max-h-[400px] border-2 border-light-gray overflow-hidden snap-always snap-center flex-shrink-0 w-[90%] object-cover"
                alt="product"
              />
            ))}
          </Skeleton>
        </figure>
        <article className="flex flex-col gap-1 items-center relative p-3 mb-16 bg-white rounded-3xl">
          <button
            onClick={() => setIsOpenShareModal(true)}
            className="rounded-full absolute right-3 top-3 h-9 w-9 flex items-center justify-center bg-background-gray flex-shrink-0"
          >
            <GoShare size={22} />
          </button>
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
          {/* <CategoriesList
            isRow
            isCenter
            categoriesIds={[currentProduct?.category?.id as never]}
          /> */}
          {products.length > 0 && (
            <div className="flex w-full flex-col pt-4">
              <p className="font-light text-xl self-start mb-4">Veja também:</p>
              <ProductGrid
                useWindowScroll
                products={products}
                className="!pb-0"
              />
            </div>
          )}
        </article>
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
