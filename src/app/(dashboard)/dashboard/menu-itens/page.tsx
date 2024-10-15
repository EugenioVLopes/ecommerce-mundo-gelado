import React, { Suspense } from "react";
import Loading from "./loading";
import MenuItensPageClient from "@/src/components/admin/MenuItensPageClient";

async function getMenuItems() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/menu-itens`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch menu items");
  }
  return response.json();
}

export default async function MenuItensPage() {
  const menuItems = await getMenuItems();

  return (
    <Suspense fallback={<Loading />}>
      <MenuItensPageClient initialMenuItems={menuItems} />
    </Suspense>
  );
}