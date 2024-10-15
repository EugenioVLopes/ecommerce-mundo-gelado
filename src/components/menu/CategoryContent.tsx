import React from "react";
import { motion } from "framer-motion";
import { TabsContent } from "@components/ui/tabs";
import MenuItem from "@/src/components/menu/MenuItem";
import { MenuItemInterface } from "@/src/interfaces/MenuItem";

interface CategoryContentProps {
  category: { _id: string; name: string };
  menuItems: MenuItemInterface[];
  searchTerm: string;
}

export default function CategoryContent({
  category,
  menuItems,
  searchTerm,
}: CategoryContentProps) {
  const categoryItems =
    category.name === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.category === category.name);

  if (categoryItems.length === 0 && searchTerm) {
    return null;
  }

  return (
    <TabsContent value={category.name === "Todos" ? "all" : category.name}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryItems.map((item) => (
            <MenuItem key={item._id} {...item} />
          ))}
        </div>
      </motion.section>
    </TabsContent>
  );
}
