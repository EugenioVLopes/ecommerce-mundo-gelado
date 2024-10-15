"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@components/ui/card";
import { Order } from "@/src/types/Order";
import { OrderFilters } from "@/src/components/pedidos/OrderFilters";
import { OrderTable } from "@/src/components/pedidos/OrderTable";
import { Pagination } from "@/src/components/pedidos/Pagination";
import { updateOrderStatus } from "@/src/lib/orders";
import useSWR from "swr";
import toast from "react-hot-toast";
import Layout from "@/src/components/admin/Layout";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminOrdersPage() {
  const {
    data: orders,
    error,
    mutate,
  } = useSWR<Order[]>("/api/pedidos", fetcher, {
    refreshInterval: 10000, // Revalida a cada 5 segundos
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const previousOrdersCount = useRef(0);

  useEffect(() => {
    if (orders && orders.length > previousOrdersCount.current) {
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.success("Novo pedido recebido!", {
        duration: 3000,
        icon: "🔔",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
    previousOrdersCount.current = orders ? orders.length : 0;
  }, [orders]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Erro ao carregar os pedidos!</p>
      </div>
    );
  }

  if (!orders) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
          <span className="ml-2 text-xl font-semibold">
            Carregando pedidos...
          </span>
        </div>{" "}
      </Layout>
    );
  }

  const filteredOrders = orders.filter((order) => {
    return (
      (order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || order.status === statusFilter)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  async function handleUpdateOrderStatus(orderId: string, newStatus: string) {
    try {
      await updateOrderStatus(orderId, newStatus);
      mutate(); // Revalida os dados após a atualização
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  }

  return (
          <div className="container mx-auto px-4 py-8">
            <OrderFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              fetchOrders={mutate}
            />
            <Card className="bg-fuchsia-50">
              <CardContent>
                <OrderTable
                  orders={paginatedOrders}
                  updateOrderStatus={handleUpdateOrderStatus}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  totalItems={filteredOrders.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </CardContent>
            </Card>
          </div>
  );
}
