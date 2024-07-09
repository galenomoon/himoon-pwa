import React, { useEffect, useState } from "react";
import { getCategories, ICategory } from "admoon";

export default function CategoriesList({ 
  isRow = false, 
  isCenter = false, 
  categoriesIds = [],
  onSelectCategory = (slug: string | undefined) => {},
  selectUnique = false,
}) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    ICategory["id"][]
  >([]);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (categoriesIds?.length) {
      setCategories(categories.filter((category) => categoriesIds.includes(category.id as never)));
    }
  }, [categoriesIds, isLoading]);

  async function fetchAll() {
    try {
      setIsLoading(true);
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectCategory(category: ICategory) {
    const isSelected = selectedCategoryIds.includes(category.id);

    if (selectUnique) {
      onSelectCategory(isSelected ? undefined : category.slug);
      setSelectedCategoryIds(isSelected ? [] : [category.id]);
      return
    }

    if (isSelected) {
      setSelectedCategoryIds(selectedCategoryIds.filter((id) => id !== category.id));
      return
    }
    
    setSelectedCategoryIds([...selectedCategoryIds, category.id]);
  }

  return (
    <section
      className={`flex gap-2 w-full scrollbar-hide ${
        isRow ? "!flex-no-wrap overflow-x-auto" : "flex-wrap !h-fit"
      } ${isCenter ? "justify-center" : "justify-start"}`}
    >
      {categories.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);
        return (
          <button
            onClick={() => (isCenter ? {} : handleSelectCategory(category))}
            key={category.id}
            className={
              "border-2 font-semibold rounded-full h-fit text-nowrap whitespace-nowrap px-3 py-0.5 " +
              (isSelected
                ? "border-typography-purple/40 text-typography-purple bg-background-purpleLight font-bold"
                : "")
            }
          >
            {category.name}
          </button>
        );
      })}
    </section>
  );
}
