import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

interface CashPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  needChange: boolean;
  setNeedChange: (needChange: boolean) => void;
  change: number;
  setChange: (change: number) => void;
  cartTotal: number;
  onConfirm: () => void;
}

export const CashPaymentDialog: React.FC<CashPaymentDialogProps> = ({
  open,
  onOpenChange,
  needChange,
  setNeedChange,
  change,
  setChange,
  cartTotal,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6 dialog-close">
        <DialogHeader className="dialog-close">
          <DialogTitle className="text-2xl font-bold text-rose-500 p-4">
            Pagamento em dinheiro
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-lg text-gray-700">Você precisa de troco?</p>
          <div className="flex space-x-4">
            <Button
              onClick={() => setNeedChange(false)}
              variant={needChange ? "outline" : "default"}
              className={`flex-1 ${
                needChange
                  ? "bg-white text-black border border-gray-300"
                  : "bg-[#14161A] text-white"
              }`}
            >
              Não
            </Button>
            <Button
              onClick={() => setNeedChange(true)}
              variant={needChange ? "default" : "outline"}
              className={`flex-1 ${
                needChange
                  ? "bg-[#14161A] text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              Sim
            </Button>
          </div>
          {needChange && (
            <div className="space-y-2 mt-4">
              <Label htmlFor="change" className="text-base text-gray-700">
                Seu pedido deu R$ {(cartTotal + 2).toFixed(2)}. Insira abaixo
                quanto vai pagar em dinheiro, para que o entregador leve o seu
                troco.
              </Label>
              <Input
                id="change"
                type="number"
                value={change}
                onChange={(e) => setChange(Number(e.target.value))}
                placeholder="Insira o valor"
                className="mt-2 border-rose-300 bg-pink-50 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={onConfirm}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-2"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface PixPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PixPaymentDialog: React.FC<PixPaymentDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6 dialog-close">
        <DialogHeader className="dialog-close">
          <DialogTitle className="text-2xl font-bold text-rose-500 p-4">
            Pagamento em PIX
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-lg text-gray-700">
            Atenção, o pedido só sairá para entregar após a confirmação da
            transação. Por favor, enviar comprovante para o WhatsApp da Mundo
            Gelado.
          </p>
          <p className="text-xl text-center text-gray-700">
            Chave PIX: 54.035.570/0001-46 <br />
            Thomas Mateus Lopes dos Santos
          </p>
          <p className="text-xl text-center text-gray-700">84 996320320</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onOpenChange,
  message,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg p-6 dialog-close">
        <DialogHeader className="dialog-close">
          <DialogTitle className="text-2xl font-bold text-rose-500 p-4">
            Atenção!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-lg text-gray-700">{message}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-4 py-2"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
