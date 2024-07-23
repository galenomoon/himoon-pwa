import { useEffect, useState } from "react";
import { getProducts, ICategory, IProduct } from "admoon";

export function useProducts(
  search: string,
  categorySlug: ICategory["slug"],
  callback?: () => void
) {

  console.log({ categorySlug })
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory["slug"]>();

  useEffect(() => {
    fetchProducts(page);
  }, [search]);

  useEffect(() => {
    if (categorySlug !== selectedCategory) {
      setSelectedCategory(categorySlug);
      fetchProducts(1);
    }
  }, [categorySlug]);

  async function fetchProducts(nextPage: number) {

    try {
      setIsLoading(true);
      const response = await getProducts({
        query: search,
        category_slug: categorySlug,
        page: nextPage,
      });

      setPage(response.currentPage);
      setHasMore(response.currentPage < response.totalPages);
      if (Number(nextPage) > 1 && categorySlug === selectedCategory) {
        setProducts((prevProducts) => [...prevProducts, ...response.results]);
        return;
      }

      setProducts(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      if (callback) callback();
    }
  }

  return {
    products,
    hasMore,
    isLoading,
    loadMore: () => fetchProducts(page + 1),
  };
}