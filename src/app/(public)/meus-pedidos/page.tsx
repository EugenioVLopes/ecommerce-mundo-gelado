"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import SectionsHeaders from "@/src/components/layout/SectionsHeaders";
import { dbTimeForHuman } from "@/src/lib/datetime";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface Order {
  _id: string;
  user: any;
  items: any[];
  total: number;
  paymentMethod: string;
  status: string;
  address?: any;
  createdAt: string;
}

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-500",
  prepared: "bg-orange-500",
  paid: "bg-green-500",
  shipped: "bg-blue-500",
  delivered: "bg-purple-500",
  canceled: "bg-red-500",
};

const statusText: { [key: string]: string } = {
  pending: "Aguardando confirmação",
  prepared: "Em preparação",
  paid: "Pago",
  shipped: "Em entrega",
  delivered: "Entregue",
  canceled: "Cancelado",
};

const paymentMethodText: { [key: string]: string } = {
  credit: "Crédito",
  debit: "Débito",
  pix: "Pix",
  cash: "Dinheiro",
};

const formatCurrency = (value: any) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

function OrderItem({ order }: { order: Order }) {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow bg-fuchsia-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          Pedido #{order._id.slice(-6)}
        </CardTitle>
        <Badge className={statusColors[order.status]}>
          {statusText[order.status]}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Data:</span>
            <span className="ml-2">{dbTimeForHuman(order.createdAt)}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Pagamento:</span>
            <span className="ml-2">
              {paymentMethodText[order.paymentMethod]}
            </span>
          </div>
          <div className="flex items-center text-sm font-semibold">
            <span>Total:</span>
            <span className="ml-2">{formatCurrency(order.total)}</span>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="text-sm font-semibold mb-2">Itens do Pedido:</h4>
          <ul className="text-sm space-y-1">
            {order.items.map((item: any, index: any) => (
              <li key={index} className="text-muted-foreground">
                {item.product?.name}
                {item.product?.selectedSize?.name &&
                  ` - ${item.product.selectedSize.name}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-right">
          <Link href={`/meus-pedidos/${order._id}`}>
            <Button variant="outline" size="sm">
              Ver detalhes
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/meus-pedidos")
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoadingOrders(false);
      });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionsHeaders mainHeader="Meus Pedidos" />

      {loadingOrders ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[200px] mb-2" />
                <Skeleton className="h-4 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[100px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Você ainda não fez nenhum pedido.
            </p>
            <Link href="/menu">
              <Button>
                Ir para o Menu
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
