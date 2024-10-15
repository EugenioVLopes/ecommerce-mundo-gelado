"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import useProfile from "@/src/hooks/useProfile";
import CartHeader from "./CartHeader";
import { useCart } from "../AppContext";
import { UserAvatar } from "@components/layout/Avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, noPermission } = useProfile();
  const { cartProducts } = useCart();

  const session = useSession();
  const status = session.status;
  let userName = userData?.name || userData?.email;

  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  type NavLinkProps = {
    href: string;
    children: React.ReactNode;
  };

  const NavLink = ({ href, children }: NavLinkProps) => (
    <Link
      href={href}
      className="w-full md:w-auto text-center py-2 md:py-0 text-gray-700 hover:text-pink-500 transition-colors duration-300 border-b-2 border-transparent hover:border-pink-500"
      onClick={closeMenu}
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="flex items-center justify-between px-2 py-4 md:px-8 lg:px-16 relative">
        <link rel="icon" href="/favicon.svg" />

        <Link className="transition-transform duration-500  z-50" href="/">
          <Image
            src={"/logo_header.svg"}
            alt={"Logo Mundo Gelado"}
            width={250}
            height={250}
            className="rounded-full"
          />
        </Link>

        {/* Hamburger menu para mobile */}
        <button
          className="menu-toggle md:hidden text-pink-500 hover:text-pink-600 transition-colors duration-300 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav
          className={`
        flex flex-col md:flex-row gap-4 md:gap-24 items-center
        fixed md:relative top-0 md:top-auto left-0
        w-full md:w-auto h-screen md:h-auto
        py-4 md:py-0 ml-2
        shadow-md md:shadow-none
        z-40
        transition-all duration-300 ease-in-out
        ${
          isMenuOpen
            ? "translate-x-0 bg-purple-50"
            : "-translate-x-full md:translate-x-0"
        }
      `}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center w-full h-full justify-center md:justify-start">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/menu">Menu</NavLink>
            {/* <NavLink href="/sobre">Sobre</NavLink> */}
            <NavLink href="/contato">Contato</NavLink>
          </div>
          <div className="flex items-center gap-4">
            {status === "authenticated" && (
              <>
                {userName ? (
                  <div className="flex items-center space-x-4">
                    <UserAvatar
                      userName={userName}
                      userEmail={userData?.email || ""}
                      userImage={userData?.image || ""}
                      noPermission={noPermission}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-4 pr-8">
                    <Avatar>
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </>
            )}
            <Link href={"/carrinho"} onClick={closeMenu}>
              <div className="hidden md:block w-full text-nowrap text-center">
                <CartHeader
                  itemCount={cartProducts.length}
                  totalValue={cartProducts.reduce(
                    (total, product) => total + product.price,
                    0
                  )}
                />
              </div>
            </Link>
            {(status === "unauthenticated" || status === "loading") && (
              <div className=" w-full md:w-auto flex items-center gap-4">
                <Link href={"/login"} onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  href={"/cadastro"}
                  className="bg-pink-300 text-white px-4 py-2 rounded-full w-full md:w-auto text-center whitespace-nowrap hover:bg-pink-400 transition-colors duration-300 shadow-md hover:shadow-lg"
                  onClick={closeMenu}
                >
                  Cadastre-se
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-purple-200 z-50 shadow-top text-center flex justify-between">
        <Link href={"/carrinho"} onClick={closeMenu}>
          <CartHeader
            itemCount={cartProducts.length}
            totalValue={cartProducts.reduce(
              (total, product) => total + product.price,
              0
            )}
          />
        </Link>
        <div className="flex items-center gap-4">
          {status === "authenticated" && (
            <>
              {userName ? (
                <div className="flex items-center space-x-4 pr-8">
                  <UserAvatar
                    userName={userName}
                    userEmail={userData?.email || ""}
                    userImage={userData?.image || ""}
                    noPermission={noPermission}
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-4 pr-8">
                  <Avatar>
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </>
          )}
          {(status === "unauthenticated" || status === "loading") && (
            <div className=" w-full md:w-auto flex items-center gap-4 mr-2">
              <Link href={"/login"} onClick={closeMenu}>
                Login
              </Link>
              <Link
                href={"/cadastro"}
                className="bg-pink-300 text-white px-4 py-2 rounded-full w-full md:w-auto text-center whitespace-nowrap hover:bg-pink-400 transition-colors duration-300 shadow-md hover:shadow-lg"
                onClick={closeMenu}
              >
                Cadastre-se
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}