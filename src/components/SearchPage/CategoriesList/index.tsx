import React, { useEffect, useState } from "react";
import { getCategories, ICategory } from "admoon";

export default function CategoriesList({ isRow = false, isCenter = false }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    ICategory["id"][]
  >([]);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectCategory(categoryId: ICategory["id"]) {
    const isSelected = selectedCategoryIds.includes(categoryId);

    if (isSelected) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    }
  }

  return (
    <section
      className={`flex gap-2 w-full ${
        isRow ? "!flex-no-wrap overflow-x-auto" : "flex-wrap !h-fit"
      } ${isCenter ? "justify-center" : "justify-start"}`}
    >
      {categories.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);

        return (
          <button
            onClick={() => (isCenter ? {} : handleSelectCategory(category.id))}
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
