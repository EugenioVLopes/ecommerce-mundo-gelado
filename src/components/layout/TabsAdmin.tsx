"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const adminTabs = [
  { href: "/perfil", label: "Informações Pessoais" },
  { href: "/categorias", label: "Categorias" },
  { href: "/menu-itens", label: "Menu Itens" },
  { href: "/usuarios", label: "Usuários" },
  { href: "/pedidos", label: "Pedidos" },
];

export default function TabsAdmin({ isAdmin }: { isAdmin: boolean }) {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <nav className="relative mb-4">
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10/12 py-2 px-4 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Menu
        </button>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row justify-center items-center gap-2 mt-2 md:mt-0 bg-white md:bg-transparent absolute md:relative w-full md:w-auto z-10`}
      >
        {adminTabs.map((tab) => (
          <li key={tab.href} className="w-full md:w-auto">
            <Link
              href={tab.href}
              className={`block py-2 px-4 text-center rounded-md transition-colors ${
                (
                  tab.href === "/menu-itens" || tab.href === "/usuarios"
                    ? new RegExp(tab.href).test(path)
                    : path === tab.href
                )
                  ? "bg-pink-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
