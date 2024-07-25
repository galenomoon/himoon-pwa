import { useEffect, useState } from "react";
import { getProducts, ICategory, IProduct } from "admoon";

export function useProducts(
  search: string,
  categorySlug: ICategory["slug"],
  callback?: () => void,
  perPage?: number
) {

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
      setHasMore(true);
      scrollToTop()
    }
  }, [categorySlug]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function fetchProducts(nextPage: number) {
    try {
      setIsLoading(true);
      const response = await getProducts({
        query: search,
        category_slug: categorySlug,
        page: nextPage,
        perPage: perPage || 10,
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
    isLoading: isLoading && hasMore,
    loadMore: () => fetchProducts(page + 1),
  };
}