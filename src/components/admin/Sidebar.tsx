"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Button } from "@components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Menu as MenuIcon,
  FolderTree,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
  { name: "Usuários", href: "/dashboard/usuarios", icon: Users },
  { name: "Itens do menu", href: "/dashboard/menu-itens", icon: MenuIcon },
  { name: "Categorias", href: "/dashboard/categorias", icon: FolderTree },
  { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const SidebarContent = () => (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="mb-2 px-4 text-lg font-semibold tracking-tight">
          <Image
            src="/logo_header.svg"
            alt="Logo Mundo Gelado"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href
                  ? "bg-pink-100 text-pink-700 hover:bg-pink-200 hover:text-pink-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
              asChild
              onClick={() => isMobile && setIsOpen(false)}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40 md:hidden"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="pb-12 w-64 hidden md:block">
      <SidebarContent />
    </aside>
  );
}
