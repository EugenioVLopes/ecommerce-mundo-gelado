"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/src/components/AppContext";
import useProfile from "@/src/hooks/useProfile";
import { IAddress } from "@/src/models/User";
import toast from "react-hot-toast";
import SectionsHeaders from "@/src/components/layout/SectionsHeaders";
import {
  CashPaymentDialog,
  ErrorDialog,
  PixPaymentDialog,
} from "@/src/components/carrinho/CashPaymentDialog";
import { OrderSummary } from "@/src/components/carrinho/OrderSummary";
import { CartItem } from "@/src/components/carrinho/CartItem";
import { NoAddress } from "@/src/components/carrinho/NoAddress";
import { EmptyCart } from "@/src/components/carrinho/EmptyCart";

export default function CartPage() {
  const { cartProducts, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const { userData } = useProfile();
  const [currentAdress, setCurrentAddress] = useState<IAddress>({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [needChange, setNeedChange] = useState(false);
  const [change, setChange] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenPix, setDialogOpenPix] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userData && userData.name) {
      setCurrentAddress(userData?.addresses?.[0] || {});
    }
  }, [userData]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    if (value === "cash") {
      setDialogOpen(true);
    } else if (value === "pix") {
      setDialogOpenPix(true);
    } else {
      setNeedChange(false);
      setChange(0);
      setDialogOpen(false);
    }
  };

  const handleCashPaymentConfirm = () => {
    setDialogOpen(false);
    if (needChange && Number(change) < cartTotal + 0) {
      setErrorMessage("O valor inserido é menor que o total do pedido.");
      setErrorDialogOpen(true);
    } else {
      toast.success("Forma de pagamento selecionada com sucesso!");
    }
  };

  const proceedToCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartProducts.length === 0) {
      setErrorMessage("Carrinho vazio");
      setErrorDialogOpen(true);
      return;
    }

    if (!userData) {
      setErrorMessage("Por favor, faça o seu login!");
      setErrorDialogOpen(true);
      return;
    }

    if (!currentAdress.street && userData) {
      setErrorMessage("Por favor, preencha o endereço de entrega!");
      setErrorDialogOpen(true);
      return;
    }

    if (!paymentMethod && userData) {
      setErrorMessage("Por favor, selecione a forma de pagamento!");
      setErrorDialogOpen(true);
      return;
    }

    const order = {
      cartProducts: cartProducts.map((product) => ({
        _id: product._id,
        product: product,
        quantity: product.quantity || 1,
      })),
      address: currentAdress,
      paymentMethod: paymentMethod,
      change: change,
      total: cartTotal + 0,
    };

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        clearCart();
        window.location.href = "/meus-pedidos";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao adicionar item de menu.");
      }
    } catch (error) {
      toast.error("Erro ao finalizar pedido");
    }
  };

  if (cartProducts.length === 0) {
    return (
      <section className="my-8 text-center">
        <SectionsHeaders mainHeader="Carrinho" />
        <EmptyCart />
      </section>
    );
  }

  if (!currentAdress.street && userData) {
    return (
      <section className="my-8 text-center">
        <SectionsHeaders mainHeader="Carrinho" />
        <NoAddress />
      </section>
    );
  }

  return (
    <section className="my-8 text-center">
      <SectionsHeaders mainHeader="Carrinho" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="space-y-4">
          {cartProducts.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <OrderSummary
          cartTotal={cartTotal}
          currentAdress={currentAdress}
          setCurrentAddress={setCurrentAddress}
          paymentMethod={paymentMethod}
          handlePaymentMethodChange={handlePaymentMethodChange}
          proceedToCheckout={proceedToCheckout}
        />
      </div>
      <CashPaymentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        needChange={needChange}
        setNeedChange={setNeedChange}
        change={change}
        setChange={setChange}
        cartTotal={cartTotal}
        onConfirm={handleCashPaymentConfirm}
      />
      <PixPaymentDialog open={dialogOpenPix} onOpenChange={setDialogOpenPix} />
      <ErrorDialog
        open={errorDialogOpen}
        onOpenChange={setErrorDialogOpen}
        message={errorMessage}
      />
    </section>
  );
}
