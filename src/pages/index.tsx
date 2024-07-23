import { useEffect, useState } from "react";

//components
import Header from "@/components/Global/Header";
import FirstSection from "@/components/LandingPage/FirstSection";
import ProductsSection from "@/components/LandingPage/ProductsSection";
import SocialMediaSection from "@/components/LandingPage/SocialMediaSection";

//admoon
import { getProducts, IProduct } from "admoon";

export default function LandingPage() {
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
    <main className="flex flex-col h-fit w-screen relative text-typography-primary">
      <Header
        className="sticky top-0"
        searchTerm={search}
        onChange={setSearch}
      />
      <FirstSection />
      <ProductsSection products={products} />
      <SocialMediaSection />
    </main>
  );
}
