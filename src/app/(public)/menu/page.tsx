import { Suspense } from "react";
import Loading from "./loading";
import MenuPageClient from "@/src/components/menu/MenuPageClient";

async function getMenuData() {
  const [categoriesResponse, menuItemsResponse] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/categorias`),
    fetch(`${process.env.NEXTAUTH_URL}/api/menu-itens`),
  ]);

  if (!categoriesResponse.ok || !menuItemsResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  const categories = await categoriesResponse.json();
  const menuItems = await menuItemsResponse.json();

  return { categories: categories.categories, menuItems };
}

export default async function MenuPage() {
  const { categories, menuItems } = await getMenuData();

  return (
    <Suspense fallback={<Loading />}>
      <MenuPageClient
        initialCategories={categories}
        initialMenuItems={menuItems}
      />
    </Suspense>
  );
}
