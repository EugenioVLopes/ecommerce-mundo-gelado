import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/layout/Accordion";
import AdressInputs from "@/src/components/layout/AdressInputs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";

interface OrderSummaryProps {
  cartTotal: number;
  currentAdress: any;
  setCurrentAddress: (address: any) => void;
  paymentMethod: string;
  handlePaymentMethodChange: (value: string) => void;
  proceedToCheckout: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartTotal,
  currentAdress,
  setCurrentAddress,
  paymentMethod,
  handlePaymentMethodChange,
  proceedToCheckout,
}) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
    <div className="space-y-2 mb-4">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>R$ {cartTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Taxa de entrega:</span>
        <span>R$ 0.00</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>R$ {(cartTotal + 0).toFixed(2)}</span>
      </div>
    </div>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="address" className="py-2">
        <AccordionTrigger className="text-sm">
          Endereço de Entrega
          <span className="text-xs text-gray-500 ml-2">
            {currentAdress.street}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <AdressInputs
            adressInputsProps={currentAdress}
            setCurrentAddress={setCurrentAddress}
            disable={true}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="payment" className="py-2">
        <AccordionTrigger className="text-sm">
          Forma de Pagamento
          <span className="text-xs text-gray-500 ml-2">
            {paymentMethod
              .replace("credit", "Cartão de Crédito")
              .replace("debit", "Cartão de Débito")
              .replace("cash", "Dinheiro")
              .replace("pix", "PIX") || "Selecione"}
          </span>
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <Select onValueChange={handlePaymentMethodChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a forma de pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Cartão de Crédito</SelectItem>
              <SelectItem value="debit">Cartão de Débito</SelectItem>
              <SelectItem value="cash">Dinheiro</SelectItem>
              <SelectItem value="pix">PIX</SelectItem>
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    <form onSubmit={proceedToCheckout} className="mt-6">
      <Button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white"
      >
        Finalizar Pedido
      </Button>
    </form>
  </div>
);
