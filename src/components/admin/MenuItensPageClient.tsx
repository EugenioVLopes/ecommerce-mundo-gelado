"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/src/models/MenuItem";
import { Button } from "@/src/components/ui/button";
import { PlusCircle } from "lucide-react";

interface MenuItensPageClientProps {
  initialMenuItems: MenuItem[];
}

export default function MenuItensPageClient({ initialMenuItems }: MenuItensPageClientProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <section className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-center items-center">
        <Button asChild className="bg-pink-400">
          <Link href="/dashboard/menu-itens/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Criar novo item
          </Link>
        </Button>
      </div>
      {menuItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((menuItem) => (
            <div
              key={menuItem._id}
              className="bg-purple-100 p-4 rounded-lg shadow-md text-center flex flex-col items-center hover:bg-pink-50 transition-all group"
            >
              {menuItem.image ? (
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  width={128}
                  height={128}
                  className="w-24 h-24  object-cover rounded-full"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              <h4 className="text-base sm:text-lg font-semibold my-2 bg-purple-100 group-hover:bg-pink-50 transition-colors duration-300">
                {menuItem.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 bg-purple-100 group-hover:bg-pink-50 transition-colors duration-300">
                {menuItem.description}
              </p>
              <p className="font-bold mt-2">R${menuItem.price.toFixed(2)}</p>
              <Button asChild className="mt-4 bg-pink-400">
                <Link href={`/dashboard/menu-itens/${menuItem._id}/edit`}>
                  Editar item
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      )}
    </section>
  );
}