"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import MenuItem from "../menu/MenuItem";
import SectionsHeaders from "./SectionsHeaders";
import { MenuItemInterface } from "@/src/interfaces/MenuItem";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState<MenuItemInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch("/api/menu-itens");
        if (!response.ok) {
          throw new Error("Falha ao buscar os mais pedidos");
        }
        const data: MenuItemInterface[] = await response.json();
        if (data.length) {
          setBestSellers(data.slice(-3));
        }
      } catch (error) {
        console.error("Falha ao buscar os mais pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="overflow-hidden px-4 py-8">
      <div className="relative w-full flex justify-center items-center mb-8">
        <Image
          src="/sorvete-1.png"
          alt="Logo Mundo Gelado"
          width={300}
          height={300}
          className="h-48 w-48 absolute -left-28 md:-left-0"
        />
        <div className="text-center mt-20 mb-10 z-10">
          <SectionsHeaders subHeader="Os mais" mainHeader="Pedidos" />
        </div>
        <Image
          src="/sorvete-2.png"
          alt="Logo Mundo Gelado"
          width={300}
          height={300}
          className="h-48 w-48 z-10 absolute -right-28 md:-right-0"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Skeleton variant="circular" width={192} height={192} />
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={32}
                    className="mt-4"
                  />
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={36}
                    className="mt-3 rounded-full"
                  />
                </div>
              ))
          : bestSellers.length > 0 &&
            bestSellers.map((menuItem) => (
              <MenuItem key={menuItem._id} {...menuItem} />
            ))}
      </div>
    </section>
  );
}
