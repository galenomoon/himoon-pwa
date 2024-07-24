import React, { useEffect, useState } from "react";
import { getCategories, ICategory } from "admoon";
import { categoriesEmojis } from "@/constants/categoriesEmojis";

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
      setCategories(
        categories.filter((category) =>
          categoriesIds.includes(category.id as never)
        )
      );
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
      return;
    }

    if (isSelected) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((id) => id !== category.id)
      );
      return;
    }

    setSelectedCategoryIds([...selectedCategoryIds, category.id]);
  }

  return (
    <section
      className={`flex gap-2 w-full pb-3 snap-x snap-mandatory scrollbar-hide ${
        isRow
          ? "!flex-no-wrap overflow-x-auto"
          : "flex-wrap items-baseline justify-center text-center !h-fit"
      } ${isCenter ? "justify-center" : "justify-start"}`}
    >
      {categories.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);
        return (
          <button
            onClick={() => (isCenter ? {} : handleSelectCategory(category))}
            key={category.id}
            className={`${
              isRow ? "first:ml-3 last:mr-4" : ""
            } snap-center flex flex-col gap-1 items-center justify-center h-fit text- p-0.5`}
          >
            <div
              className={
                "text-2xl border-2 w-12 h-12 flex items-center justify-center rounded-full bg-white " +
                (isSelected ? "border-typography-purpleDark/60" : "")
              }
            >
              {categoriesEmojis[
                category.slug as keyof typeof categoriesEmojis
              ] || "📦"}
            </div>
            <span
              className={
                "text-[10px] leading-[12px] w-12 text-center flex flex-col items-center justify-center " +
                (isSelected
                  ? "text-typography-purpleDark font-light"
                  : "font-normal")
              }
            >
              {category.name}
            </span>
          </button>
        );
      })}
    </section>
  );
}
