import { Order } from "@/src/types/Order";

export async function getOrders(): Promise<Order[]> {
  const res = await fetch("/api/pedidos", {
    next: { tags: ["orders"] },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: string
): Promise<Order> {
  const res = await fetch(`/api/pedidos/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}
