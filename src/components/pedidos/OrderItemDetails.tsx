import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { formatCurrency } from "@/src/lib/utils/formatters";

interface OrderItemDetailsProps {
  item: {
    id: string;
    product: {
      _id: string;
      category: string;
      name: string;
      description: string;
      image: string;
      selectedSize?: {
        name: string;
        price: number;
        maxFruits: number;
        maxCreams: number;
        maxToppings: number;
        _id: string;
      };
      selectedCreams?: string[];
      selectedToppings?: string[];
      selectedFruits?: string[];
      selectedExtraToppings?: {
        _id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        category: string;
        sizes: any[];
        createdAt: string;
        updatedAt: string;
        __v: number;
      }[];
      comments?: string;
      price: number;
      quantity: number;
    };
    quantity: number;
    _id: string;
  };
}

export const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ item }) => (
  <Card className="mb-4 bg-violet-50">
    <CardHeader>
      <CardTitle>{item.product.name || "Produto"}</CardTitle>
    </CardHeader>
    <CardContent>
      {item.product.selectedSize && (
        <p>
          <strong>Tamanho:</strong> {item.product.selectedSize.name} <br />
          <strong>Quantidade:</strong> {item.quantity}
        </p>
      )}
      {item.product.selectedCreams &&
        item.product.selectedCreams?.length > 0 && (
          <p>
            <strong>Cremes:</strong> {item.product.selectedCreams.join(", ")}
          </p>
        )}
      {item.product.selectedFruits &&
        item.product.selectedFruits?.length > 0 && (
          <p>
            <strong>Frutas:</strong> {item.product.selectedFruits.join(", ")}
          </p>
        )}
      {item.product.selectedToppings &&
        item.product.selectedToppings?.length > 0 && (
          <p>
            <strong>Acompanhamentos:</strong>{" "}
            {item.product.selectedToppings.join(", ")}
          </p>
        )}
      {item.product.selectedExtraToppings &&
        item.product.selectedExtraToppings?.length > 0 && (
          <p>
            <strong>Extras:</strong>{" "}
            {item.product.selectedExtraToppings
              .map((extra) => extra.name)
              .join(", ")}
          </p>
        )}
      <p>
        <strong>Preço:</strong> {formatCurrency(item.product.price)}
      </p>
      {item.product.comments && (
        <p>
          <strong>Comentários:</strong> {item.product.comments}
        </p>
      )}
    </CardContent>
  </Card>
);
