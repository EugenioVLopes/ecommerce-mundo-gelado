import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface CartItemProps {
  product: any;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (product: any) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  updateQuantity,
  removeFromCart,
}) => (
  <div className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm">
    <div className="w-24 md:w-32">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-auto rounded-md"
      />
    </div>

    <div className="grow text-left">
      <h2 className="font-semibold">{product.name}</h2>
      {product.selectedSize && (
        <p className="text-sm text-gray-600">{product.selectedSize.name}</p>
      )}
      {product.selectedCreams && (
        <p className="text-sm text-gray-600">
          Cremes: <br /> {product.selectedCreams.join(", ")}
        </p>
      )}
      {product.selectedFruits && (
        <p className="text-sm text-gray-600">
          Frutas: <br /> {product.selectedFruits.join(", ")}
        </p>
      )}
      {product.selectedToppings && (
        <p className="text-sm text-gray-600">
          Acompanhamentos: <br /> {product.selectedToppings.join(", ")}
        </p>
      )}
      {product.selectedExtraToppings && (
        <p className="text-sm text-gray-600">Acompanhamentos Extras: </p>
      )}
      {product.selectedExtraToppings &&
        product.selectedExtraToppings.map((topping: any) => (
          <p className="text-sm text-gray-600" key={topping._id}>
            {Array.isArray(topping.name)
              ? topping.name.join(", ")
              : topping.name}
          </p>
        ))}
      {product.comments && (
        <p className="text-sm text-gray-600">Observações: {product.comments}</p>
      )}
    </div>
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg font-semibold">
        R$ {(product.price * (product.quantity || 1)).toFixed(2)}
      </p>
      <div className="flex items-center gap-2">
        <Button
          className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
          variant="outline"
          size="icon"
          onClick={() =>
            updateQuantity(product._id, (product.quantity || 1) - 1)
          }
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span>{product.quantity || 1}</span>
        <Button
          className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
          variant="outline"
          size="icon"
          onClick={() =>
            updateQuantity(product._id, (product.quantity || 1) + 1)
          }
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(product)}
        className="w-full text-red-500 hover:text-red-700"
      >
        <Trash className="h-5 w-5" />
      </Button>
    </div>
  </div>
);
