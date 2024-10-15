export const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Aguardando confirmação" },
  { value: "prepared", label: "Já esta sendo preparado" },
  { value: "paid", label: "Pago" },
  { value: "shipped", label: "Saiu para Entrega" },
  { value: "delivered", label: "Entregue" },
  { value: "canceled", label: "Cancelado" },
];

export const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  prepared: "bg-orange-500",
  paid: "bg-green-500",
  shipped: "bg-blue-500",
  delivered: "bg-purple-500",
  canceled: "bg-red-500",
};
