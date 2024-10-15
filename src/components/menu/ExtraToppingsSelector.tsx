import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

interface CategoryItem {
  _id: string;
  name: string;
  price: number;
}

interface ExtraToppingsSelectorProps {
  items: CategoryItem[];
  maxItems: number;
  categoryName: string;
  onSelectionChange: (
    selectedItems: CategoryItem[],
    totalPrice: number
  ) => void;
}

const ExtraToppingsSelector: React.FC<ExtraToppingsSelectorProps> = ({
  items,
  onSelectionChange,
  maxItems,
  categoryName,
}) => {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  const handleIncrement = useCallback(
    (item: CategoryItem) => {
      setItemCounts((prev) => {
        const newCount = (prev[item._id] || 0) + 1;
        if (Object.values(prev).reduce((a, b) => a + b, 0) >= maxItems) {
          return prev;
        }
        return { ...prev, [item._id]: newCount };
      });
    },
    [maxItems]
  );

  const handleDecrement = useCallback((item: CategoryItem) => {
    setItemCounts((prev) => {
      if (prev[item._id] > 0) {
        return { ...prev, [item._id]: prev[item._id] - 1 };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const selectedItems = items.filter((item) => itemCounts[item._id] > 0);
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price * (itemCounts[item._id] || 0),
      0
    );
    onSelectionChange(selectedItems, totalPrice);
  }, [itemCounts, items, onSelectionChange]);

  return (
    <div className="mb-6">
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h3 className="text-lg font-medium mb-2 text-pink-400">
              {categoryName} (Escolha até {maxItems})
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-2 py-2 justify-between border-b-1"
              >
                <Label>
                  {item.name} - R$ {item.price.toFixed(2)}
                </Label>
                <div className="flex items-center gap-4">
                  {itemCounts[item._id] > 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
                      onClick={() => handleDecrement(item)}
                      disabled={(itemCounts[item._id] || 0) === 0}
                    >
                      <Minus className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                  <span className="text-medium">
                    {itemCounts[item._id] || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
                    onClick={() => handleIncrement(item)}
                    disabled={
                      Object.values(itemCounts).reduce((a, b) => a + b, 0) >=
                      maxItems
                    }
                  >
                    <Plus className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ExtraToppingsSelector;
