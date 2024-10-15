import React, { useState, useEffect } from "react";
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

interface ItemSelectorProps {
  items: CategoryItem[];
  maxItems: number;
  categoryName: string;
  onSelectionChange: (selectedItems: string[]) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  maxItems,
  categoryName,
  onSelectionChange,
}) => {
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  const handleIncrement = (itemName: string) => {
    const currentCount = itemCounts[itemName] || 0;
    if (
      currentCount < maxItems &&
      Object.values(itemCounts).reduce((a, b) => a + b, 0) < maxItems
    ) {
      setItemCounts((prev) => ({ ...prev, [itemName]: currentCount + 1 }));
    }
  };

  const handleDecrement = (itemName: string) => {
    const currentCount = itemCounts[itemName] || 0;
    if (currentCount > 0) {
      setItemCounts((prev) => ({ ...prev, [itemName]: currentCount - 1 }));
    }
  };

  useEffect(() => {
    const selectedItems = Object.entries(itemCounts).flatMap(([name, count]) =>
      Array(count).fill(name)
    );
    onSelectionChange(selectedItems);
  }, [itemCounts, onSelectionChange]);

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
                <Label>{item.name}</Label>
                <div className="flex items-center gap-4">
                  {itemCounts[item.name] > 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
                      onClick={() => handleDecrement(item.name)}
                      disabled={(itemCounts[item.name] || 0) === 0}
                    >
                      <Minus className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                  <span className="text-medium">
                    {itemCounts[item.name] || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full justify-center gap-2 border rounded-xl px-4 py-2"
                    onClick={() => handleIncrement(item.name)}
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

export default ItemSelector;
