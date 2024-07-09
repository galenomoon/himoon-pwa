import { useEffect, useState } from "react";

//components
import Header from "@/components/Global/Header";
import Button from "@/components/Global/Button";
import NextHeader from "@/components/Global/NextHeader";
import ProductGrid from "@/components/Global/ProductGrid";
import CategoriesList from "@/components/SearchPage/CategoriesList";

//icons
import { PiSpinner } from "react-icons/pi";

//admoon
import { getProducts, ICategory, IProduct } from "admoon";

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category_slug, setCategorySlug] = useState<ICategory["slug"]>();

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setIsLoading(true);
      const response = await getProducts({
        query: search,
        category_slug,
      });
      setProducts(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsFocused(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen justify-end w-screen text-typography-primary">
      <NextHeader
        statusColorType="default"
        title="Buscar produtos"
        description="Encontre os melhores produtos para você"
      />
      <section className="mt-4 px-3 rounded-t-[36px] text-typography-primary pb-12 flex flex-col min-h-[95dvh] bg-white relative">
        <Header />
        <section className="bg-white sticky top-[0px] z-20 pb-3">
          <div className="flex gap-2 py-2  bg-white z-10">
            <SearchBar
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={fetchAll}
              disabled={isLoading}
              className="font-medium min-w-[100px] px-5 text-lg"
            >
              {isLoading ? (
                <PiSpinner className="animate-spin" size={24} />
              ) : (
                <span>Buscar</span>
              )}
            </Button>
          </div>
          <CategoriesList
            onSelectCategory={setCategorySlug}
            isRow={!isFocused}
            selectUnique
          />
        </section>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}

import { IoSearchOutline } from "react-icons/io5";

export function SearchBar({
  onChange,
  onFocus,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}) {
  return (
    <div className="flex w-full items-center text-lg gap-2 p-3 rounded-full border-typography-primary/20 border-2 text-typography-primary">
      <IoSearchOutline size={24} />
      <input
        type="text"
        onFocus={onFocus}
        onChange={onChange}
        placeholder="Buscar produtos..."
        className="w-full h-full outline-none"
      />
    </div>
  );
}
