import { useEffect, useState } from "react";

//components
import Button from "@/components/Global/Button";
import ProductGrid from "@/components/Global/ProductGrid";

//admoon
import { getProducts, IProduct } from "admoon";

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const response = await getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col h-fit w-screen text-typography-primary">
      <section className="mt-8 rounded-t-[36px] px-3 text-typography-primary pt-8 pb-12 flex flex-col justify-between gap-3 min-h-[90vh] bg-white relative">
        <header className="flex w-full justify-between items-center">
          <Link href="/" className="flex justify-center itemx-center w-fit">
            <Logo size={74} />
          </Link>
          <button className="relative flex items-center justify-center">
            <div className="bg-typography-yellow w-[20px] h-[16px] z-10 bottom-1 absolute" />
            <FaBasketShopping size={40} className="z-20" />
            <data className="absolute z-30 -top-1 -right-1 bg-background-black text-typography-yellow border border-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              12
            </data>
          </button>
        </header>
        <div className="flex gap-2">
          <SearchBar />
          <Button className="font-medium px-5 text-lg">Buscar</Button>
        </div>
        <CategoriesList isRow />
        <ProductGrid products={products} />
      </section>
    </main>
  );
}

import { IoSearchOutline } from "react-icons/io5";
import CategoriesList from "@/components/SearchPage/CategoriesList";
import Logo from "@/components/Global/Logo";
import { FaBasketShopping } from "react-icons/fa6";
import Link from "next/link";

export function SearchBar() {
  return (
    <div className="flex w-full items-center text-lg gap-2 p-3 rounded-full border-typography-primary/20 border-2 text-typography-primary">
      <IoSearchOutline size={24} />
      <input
        type="text"
        placeholder="Buscar produtos..."
        className="w-full h-full outline-none"
      />
    </div>
  );
}
