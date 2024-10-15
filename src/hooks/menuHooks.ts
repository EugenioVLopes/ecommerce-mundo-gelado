import { useMemo } from "react";
import { MenuItemInterface } from "@/src/interfaces/MenuItem";

const categoryOrder = [
  "all",
  "Açaí",
  "Sorvetes",
  "Milkshakes",
  "Cremes",
  "Adicionais Premiun",
  "Frutas",
  "Acompanhamentos",
  "Bebidas",
];

export function useFilteredMenuItems(
  menuItems: MenuItemInterface[],
  searchTerm: string
) {
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menuItems, searchTerm]);

  const sortedMenuItems = useMemo(() => {
    return [...filteredMenuItems].sort((a, b) => {
      const categoryAIndex = categoryOrder.indexOf(a.category);
      const categoryBIndex = categoryOrder.indexOf(b.category);
      return categoryAIndex - categoryBIndex;
    });
  }, [filteredMenuItems]);

  return { filteredMenuItems, sortedMenuItems };
}

export function useSortedCategories(
  categories: { _id: string; name: string }[]
) {
  return useMemo(() => {
    return categories.sort((a, b) => {
      return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
    });
  }, [categories]);
}
