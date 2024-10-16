"use client";
import React, { useState } from "react";
import { MenuItemInterface } from "@/src/interfaces/MenuItem";
import { Tabs } from "@components/ui/tabs";
import SearchBar from "@components/menu/SearchBar";
import CategoryList from "@components/menu/CategoryList";
import CategoryContent from "@components/menu/CategoryContent";
import {
  useFilteredMenuItems,
  useSortedCategories,
} from "@/src/hooks/menuHooks";

interface Category {
  _id: string;
  name: string;
}

interface MenuPageClientProps {
  initialCategories: Category[];
  initialMenuItems: MenuItemInterface[];
}

export default function MenuPageClient({
  initialCategories,
  initialMenuItems,
}: MenuPageClientProps) {
  const [categories] = useState<Category[]>(initialCategories);
  const [menuItems] = useState<MenuItemInterface[]>(initialMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { filteredMenuItems, sortedMenuItems } = useFilteredMenuItems(
    menuItems,
    searchTerm
  );
  const sortedCategories = useSortedCategories(categories);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <CategoryList categories={sortedCategories} />

        <div>
          <CategoryContent
            category={{ _id: "all", name: "Todos" }}
            menuItems={sortedMenuItems}
            searchTerm={searchTerm}
          />
          {categories.length > 0 ? (
            sortedCategories.map((category) => (
              <CategoryContent
                key={category._id}
                category={category}
                menuItems={filteredMenuItems}
                searchTerm={searchTerm}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">
              Nenhum item encontrado.
            </p>
          )}
        </div>
      </Tabs>
    </section>
  );
}
