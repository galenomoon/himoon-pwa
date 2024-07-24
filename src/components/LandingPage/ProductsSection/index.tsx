
//interfaces
import { IProduct } from "admoon";

//components
import Button from "@/components/Global/Button";
import ProductGrid from "@/components/Global/ProductGrid";

export default function ProductsSection({ products }: { products: IProduct[] }) {
  return (
    <section className="px-4 text-typography-secondary py-12 flex flex-col justify-between gap-8 min-h-[90vh] bg-background-black relative">
      <article className="flex flex-col text-center items-center justify-center gap-2">
        <h1 className="text-3xl font-bold">Vela algum dos nossos produtos</h1>
      </article>
      <div className="!h-[70vh]">
      <ProductGrid itemWrapperClassName="bg-black" products={products} />
      </div>
      <Button href="/buscar" invert className="font-bold">
        VER MAIS PRODUTOS
      </Button>
    </section>
  );
}