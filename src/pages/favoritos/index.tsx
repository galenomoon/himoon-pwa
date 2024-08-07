import { useEffect, useState } from "react";

//components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import TabNavigator from "@/components/TabNavigation";
import { ProductSkeleton } from "@/components/Skeleton";

//requests
import { getFavorites } from "@/requests/favorite/getFavorites";

export default function FavoritePage() {
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoaded(false);
    try {
      const data = await getFavorites()
      setFavorites(data as any);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  }

  return (
    <main className="flex flex-col h-fit w-screen relative items-center text-typography-primary">
      <Header searchTerm={search} onChange={setSearch} />
      <div className="bg-background-purple desktop:bg-white max-w-screen-desktop flex flex-col w-full h-fit">
        <section className="bg-white flex h-fit flex-col items-center relative mt-3">
          <section className="bg-white rounded-t-[34px] w-full h-[164px] absolute z-0 -top-[138px]" />
          <article className="flex flex-col gap-1 w-full z-0">
            <h1 className="text-xl font-light px-3">
              Favoritos
              <span className="text-sm font-normal">
                {" "}
                ({favorites.length})
              </span>
            </h1>
            <div className="grid grid-cols-2 desktop:grid-cols-4 px-3 gap-3 mt-3">
              <ProductSkeleton
                length={30}
                conditional={!!favorites.length || isLoaded}
              />
            </div>
            <ProductGrid
              useWindowScroll
              products={favorites}
              isLoading={isLoaded}
              className="bg-white min-h-[75dvh] pb-3 px-2"
            />
          </article>
        </section>
      </div>
      <Footer />
      <TabNavigator />
    </main>
  );
}
