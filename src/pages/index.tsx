import { useState } from "react";

//components
import Header from "@/components/Header";
import { Carousel } from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import TabNavigator from "@/components/TabNavigation";
import CategoriesList from "@/components/CategoriesList";

//assets
import canetas from "@/assets/banners/canetas.png";
import allProducts from "@/assets/banners/products.png";
import sketchbooks from "@/assets/banners/sketchbooks.png";
import marcaTextos from "@/assets/banners/marca-textos.png";

//hooks
import { useProducts } from "@/hooks/useProducts";

export default function LandingPage() {
  const [search, setSearch] = useState<string>("");
  const { products, hasMore, isLoading, loadMore } = useProducts(
    search,
    "",
    () => {},
    10
  );
  const banners = [sketchbooks, allProducts, marcaTextos, canetas];

  return (
    <main className="flex flex-col h-fit w-screen relative items-center text-typography-primary">
      <Header searchTerm={search} onChange={setSearch} />
      <div className="bg-background-purple desktop:bg-white max-w-screen-desktop flex flex-col w-full h-fit">
        <div className="desktop:hidden mobile:flex">
          <Carousel images={banners} />
        </div>
        <section className="bg-white flex h-fit flex-col items-center relative mt-3">
          <section className="bg-white rounded-t-[34px] w-full h-[164px] absolute z-0 -top-[138px]" />
          <article className="flex flex-col gap-1 w-full pl-3 z-10">
            <h1 className="text-xl font-light">Comece por aqui:</h1>
            <CategoriesList useSearchMode isRow className="bg-white" />
          </article>
          <article className="flex flex-col gap-1 w-full z-0">
            <h1 className="text-xl font-light px-3">Últimos Lançamentos:</h1>
            <ProductGrid
              useWindowScroll
              hasMore={hasMore}
              products={products}
              isLoading={isLoading}
              className="bg-white min-h-[75dvh] pb-3 px-2"
              endReached={loadMore}
            />
          </article>
        </section>
      </div>
      <TabNavigator />
    </main>
  );
}
