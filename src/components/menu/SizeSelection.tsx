import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface SizeOption {
  name: string;
  price: number;
  maxFruits: number;
  maxCreams: number;
  maxToppings: number;
}
interface SizeSelectionProps {
  sizes: SizeOption[];
  onSizeSelect: (size: SizeOption) => void;
}

const SizeSelection: React.FC<SizeSelectionProps> = ({
  sizes,
  onSizeSelect,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0].name);
      onSizeSelect(sizes[0]);
    }
  }, [sizes, selectedSize, onSizeSelect]);

  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2 text-pink-400">Tamanho</h3>
      <RadioGroup
        value={selectedSize || ""}
        onValueChange={(value) => {
          const size = sizes.find((s) => s.name === value);
          if (size) {
            setSelectedSize(value);
            onSizeSelect(size);
          }
        }}
      >
        {sizes.map((size) => (
          <div key={size.name} className="flex items-center space-x-2">
            <RadioGroupItem value={size.name} id={`size-${size.name}`} />
            <Label htmlFor={`size-${size.name}`}>
              {`${size.name} - R$ ${size.price.toFixed(2)}`}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SizeSelection;
