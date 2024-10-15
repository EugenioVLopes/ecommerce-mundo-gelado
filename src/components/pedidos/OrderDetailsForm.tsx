import React, { useState } from "react";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { OrderDetails } from "@/src/components/pedidos/OrderDetails";
import { formatCurrency } from "@/src/lib/utils/formatters";
import { Order } from "@/src/types/Order";
import { statusOptions } from "@/src/constants/orderStatus";

interface OrderDetailsFormProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
}

export const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({
  order,
  onStatusChange,
}) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatusChange = async (newStatus: string) => {
    await onStatusChange(order._id, newStatus);
    setCurrentStatus(newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="flex items-center gap-4 print:flex-col print:items-start">
        <Label htmlFor="user" className="print:font-bold">Usuário</Label>
        <Input id="user" value={order.user.name} readOnly className="print:border-none print:p-0" />
      </div>
      <div className="flex items-center gap-4 print:flex-col print:items-start">
        <Label htmlFor="status" className="print:font-bold">Status</Label>
        <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
          <SelectTrigger className="print:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions
              .filter((status) => status.value !== "all")
              .map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <span className="hidden print:inline">{currentStatus}</span>
      </div>
      <div className="flex items-center gap-4 print:flex-col print:items-start">
        <Label htmlFor="address" className="text-right print:text-left print:font-bold">
          Endereço
        </Label>
        <div>
          {order.address && (
            <>
              <div>
                {order.address.street}, {order.address.number}
              </div>
              <div>{order.address.complement}</div>
              <div>{order.address.neighborhood}</div>
            </>
          )}
        </div>
      </div>
      <OrderDetails order={order} />
      <button 
        onClick={handlePrint} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 print:hidden"
      >
        Imprimir Detalhes do Pedido
      </button>
    </div>
  );
};