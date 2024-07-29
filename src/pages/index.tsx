import { useState } from "react";

//components
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CategoriesList from "@/components/CategoriesList";

//assets
import canetas from "@/assets/banners/canetas.png";
import allProducts from "@/assets/banners/products.png";
import sketchbooks from "@/assets/banners/sketchbooks.png";
import marcaTextos from "@/assets/banners/marca-textos.png";

//admoon
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import TabNavigator from "@/components/TabNavigation";

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
    <main className="flex flex-col h-fit w-screen relative text-typography-primary">
      <Header searchTerm={search} onChange={setSearch} />
      <div className="bg-background-purple flex flex-col w-full h-fit">
        <figure className="my-4 z-20 scrollbar-hide overflow-auto flex gap-2 snap-x snap-mandatory">
          {banners?.map((banner, index) => (
            <Image
              key={index}
              alt="product"
              src={banner as any}
              className="first:ml-4 last:mr-12 rounded-[42px] w-[90%] overflow-hidden snap-always snap-center flex-shrink-0 object-cover"
            />
          ))}
        </figure>
        <section className="bg-white flex h-fit flex-col items-center relative">
          <section className="bg-white rounded-t-[34px] w-full h-[42px] absolute z-10 -top-[40px]" />
          <article className="flex flex-col gap-1 w-full pl-3">
            <h1 className="text-xl font-light">Comece por aqui:</h1>
            <CategoriesList useSearchMode isRow className="bg-white" />
          </article>

          <article className="flex flex-col gap-1 w-full">
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
      {/* <FirstSection /> */}
      {/* <ProductsSection products={products} /> */}
      {/* <SocialMediaSection /> */}
      <TabNavigator />
    </main>
  );
}
