import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import { OrderItemDetails } from "./OrderItemDetails";
import { formatCurrency } from "@/src/lib/utils/formatters";
import { statusOptions } from "@/src/constants/orderStatus";

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-500",
  paid: "bg-green-500",
  cancelled: "bg-red-500",
};

const paymentMethodTranslations: { [key: string]: string } = {
  credit: "Cartão de Crédito",
  cash: "Dinheiro",
  pix: "Pix",
};

interface OrderDetailsProps {
  order: any;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-fuchsia-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Detalhes do Pedido</CardTitle>
          <Badge className={statusColors[order.status]}>
            {statusOptions.find((option) => option.value === order.status)
              ?.label || order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Data do Pedido</p>
            <p>{new Date(order.createdAt).toLocaleString("pt-BR")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Método de Pagamento</p>
            <p>
              {paymentMethodTranslations[order.paymentMethod] ||
                order.paymentMethod}
            </p>
          </div>
          {order.change > 0 && (
            <div>
              <p className="text-sm text-gray-500">Troco para</p>
              <p>{formatCurrency(order.change)}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-bold">{formatCurrency(order.total)}</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Itens do Pedido</h3>
            {order.items.map((item: any, index: number) => (
              <OrderItemDetails key={index} item={item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
