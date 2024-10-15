import React, { useState } from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import { ScrollArea } from "@components/ui/scroll-area";
import { EyeIcon } from "lucide-react";
import { Order } from "@/src/types/Order";
import { OrderDetailsForm } from "./OrderDetailsForm";

interface OrderDetailsDialogProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: string) => Promise<void>;
}

export const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  onStatusChange,
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const content = (
    <ScrollArea className="h-full max-h-[80vh]">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detalhes do Pedido</h2>
          <div className="text-sm text-gray-500">ID: {order._id}</div>
        </div>
        <OrderDetailsForm order={order} onStatusChange={onStatusChange} />
      </div>
    </ScrollArea>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <EyeIcon className="mr-2 h-4 w-4" /> Detalhes
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <EyeIcon className="mr-2 h-4 w-4" /> Detalhes
        </Button>
      </DrawerTrigger>
      <DrawerContent>{content}</DrawerContent>
    </Drawer>
  );
};
