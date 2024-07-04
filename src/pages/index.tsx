import { useEffect, useState } from "react";

//components
import FirstSection from "@/components/LandingPage/FirstSection";
import ProductsSection from "@/components/LandingPage/ProductsSection";
import SocialMediaSection from "@/components/LandingPage/SocialMediaSection";

//admoon
import { getProducts, IProduct } from "admoon";

export default function LandingPage() {
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
      <FirstSection />
      <ProductsSection products={products} />
      <SocialMediaSection />
    </main>
  );
}
