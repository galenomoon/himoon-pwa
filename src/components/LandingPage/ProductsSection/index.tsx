
//interfaces
import { IProduct } from "admoon";

//components
import ProductGrid from "../ProductGrid";
import Button from "@/components/Global/Button";

export default function ProductsSection({ products }: { products: IProduct[] }) {
  return (
    <section className="px-4 text-typography-secondary py-12 flex flex-col justify-between gap-8 min-h-[90vh] bg-background-black relative">
      <article className="flex flex-col text-center items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Vela algum dos nossos produtos</h1>
      </article>
      <ProductGrid products={products} />
      <Button href="/produtos" invert className="font-bold">
        VER MAIS PRODUTOS
      </Button>
    </section>
  );
}