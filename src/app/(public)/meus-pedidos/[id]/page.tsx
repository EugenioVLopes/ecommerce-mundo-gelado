"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { OrderDetails } from "@/src/components/pedidos/OrderDetails";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/meus-pedidos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Carregando detalhes do pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
        <Link
          href="/meus-pedidos"
          className="text-center text-blue-500 hover:underline"
        >
          Voltar para Meus Pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/meus-pedidos"
        className="flex justify-center items-center text-blue-500 hover:underline mb-6"
      >
        <ChevronLeft className="mr-1" size={20} />
        Voltar para Meus Pedidos
      </Link>
      <OrderDetails order={order} />
    </div>
  );
}
