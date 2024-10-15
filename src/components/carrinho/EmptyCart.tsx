import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

export const EmptyCart: React.FC = () => (
  <div className="flex-col text-center space-y-4">
    <p>Carrinho vazio</p>
    <Link href="/menu" className="inline-block">
      <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
        Ir para o Menu
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </Link>
  </div>
);
