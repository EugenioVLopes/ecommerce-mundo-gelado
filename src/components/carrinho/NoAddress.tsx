import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";

export const NoAddress: React.FC = () => (
  <div className="flex-col text-center space-y-4">
    <p>Por favor, preencha o endereço de entrega!</p>
    <Link href="/perfil" className="inline-block">
      <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
        Preencher Endereço
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </Link>
  </div>
);
