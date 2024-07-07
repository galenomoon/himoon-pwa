import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Header from "@/components/Global/Header";
import Button from "@/components/Global/Button";
import NextHeader from "@/components/Global/NextHeader";
import ProductGrid from "@/components/Global/ProductGrid";

//icons
import { PiSpinner } from "react-icons/pi";

//admoon
import { getProduct, getProducts, IProduct } from "admoon";
import CategoriesList from "@/components/SearchPage/CategoriesList";
import { GoShare } from "react-icons/go";

export default function ProductPage() {
  const router = useRouter();
  const { productSlug, categorySlug } = router.query;
  const [currentProduct, setCurrentProduct] = useState<IProduct>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      console.log(result);

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

  return (
    <main className="flex flex-col h-fit w-screen text-typography-primary">
      <NextHeader
        statusColorType="default"
        title={currentProduct?.name || "Produto não encontrado"}
        description={currentProduct?.description}
      />
      <section className="mt-4 px-3 text-center rounded-t-[36px] text-typography-primary pb-12 flex flex-col min-h-[90dvh] bg-white relative">
        <Header backTo="/buscar" />
        <img
          src={
            currentProduct?.images?.[1]?.url ||
            "https://via.placeholder.com/800x800.png"
          }
          className="rounded-[42px] max-h-[400px] mt-4 mb-4 border-2 border-light-gray overflow-hidden w-full object-cover "
          alt="product"
        />
        <p className="text-3xl font-light">
          {currentProduct?.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <h1 className="text-2xl font-semibold mb-1">{currentProduct?.name}</h1>
        <h1 className="text-sm font-light">{currentProduct?.description}</h1>
        <div className="flex flex-col py-3">
          <CategoriesList isRow isCenter categoriesIds={[currentProduct?.category?.id as never]} />
          <div className="flex gap-2 my-4">
            <Button className="w-full uppercase font-bold">
              Adicionar ao carrinho
            </Button>
            <button className="rounded-full h-12 w-12 flex items-center justify-center bg-background-gray flex-shrink-0">
              <GoShare size={24} />
            </button>
          </div>
        </div>
        <p className="font-light text-xl text-start mb-4">
          Veja também:
        </p>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
