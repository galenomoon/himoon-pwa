import { useState } from "react";
import { useRouter } from "next/router";

//components
import Header from "@/components/Global/Header";
import NextHeader from "@/components/Global/NextHeader";
import ProductGrid from "@/components/Global/ProductGrid";

//hooks
import { useProducts } from "@/hooks/useProducts";

export default function SearchPage() {
  const router = useRouter();
  const { query } = router;
  const [search, setSearch] = useState<string>(query.search as string);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [categorySlug, setCategorySlug] = useState<string | undefined>();
  const { products, hasMore, isLoading, loadMore } = useProducts(
    search,
    categorySlug,
    () => setIsFocused(false),
    10
  );

  return (
    <main className="flex flex-col h-fit relative w-full bg-white text-typography-primary">
      <NextHeader
        statusColorType="default"
        title="Buscar produtos"
        description="Encontre os melhores produtos para você"
      />
      <Header
        onSelectCategory={setCategorySlug}
        isCategoryListOpen={isFocused}
        onFocus={setIsFocused}
        onChange={setSearch}
        searchTerm={search}
        showCategories
        backTo="/"
      />
      <ProductGrid
        useWindowScroll
        hasMore={hasMore}
        products={products}
        isLoading={isLoading}
        className="bg-white pb-3"
        endReached={loadMore}
      />
    </main>
  );
}
