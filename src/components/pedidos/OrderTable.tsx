import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Badge } from "@components/ui/badge";
import { formatCurrency } from "@/src/lib/utils/formatters";
import { Order } from "@/src/types/Order";
import { statusColors, statusOptions } from "@/src/constants/orderStatus";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

interface OrderTableProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<void>;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  updateOrderStatus,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuário</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order.user.name}</TableCell>
            <TableCell>
              {order.address && (
                <>
                  <div>
                    {order.address.street}, {order.address.number}
                  </div>
                  <div>{order.address.complement}</div>
                  <div>{order.address.neighborhood}</div>
                </>
              )}
            </TableCell>
            <TableCell>{formatCurrency(order.total)}</TableCell>
            <TableCell>
              <Badge className={statusColors[order.status]}>
                {
                  statusOptions.find((status) => status.value === order.status)
                    ?.label
                }
              </Badge>
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <OrderDetailsDialog
                order={order}
                onStatusChange={updateOrderStatus}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
