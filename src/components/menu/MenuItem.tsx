"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import SizeSelection from "./SizeSelection";
import ItemSelector from "./ItemSelector";
import ExtraToppingsSelector from "./ExtraToppingsSelector";

export interface SizeOption {
  name: string;
  price: number;
  maxFruits: number;
  maxCreams: number;
  maxToppings: number;
}

export interface CategoryItem {
  _id: string;
  name: string;
  price: number;
}

export interface MenuItemProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: SizeOption[];
  selectedSize?: SizeOption;
  selectedFruits?: string[];
  selectedCreams?: string[];
  selectedToppings?: string[];
  selectedExtraToppings?: CategoryItem[];
  comments?: string;
  quantity?: number;
}

export default function MenuItemComponent({
  _id,
  name,
  description,
  price,
  image,
  category,
  sizes,
}: MenuItemProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [selectedCreams, setSelectedCreams] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
  const [extraToppings, setExtraToppings] = useState<CategoryItem[]>([]);
  const [selectedExtraToppings, setSelectedExtraToppings] = useState<
    CategoryItem[]
  >([]);
  const [extraToppingsPrice, setExtraToppingsPrice] = useState(0);
  const [fruits, setFruits] = useState<CategoryItem[]>([]);
  const [toppings, setToppings] = useState<CategoryItem[]>([]);
  const [creams, setCreams] = useState<CategoryItem[]>([]);
  const [comments, setComments] = useState("");

  const { addToCart } = useCart();

  const menuItem = useMemo(
    () => ({
      _id,
      name,
      description,
      price,
      image,
      category,
      sizes,
    }),
    [_id, name, description, price, image, category, sizes]
  );

  const handleExtraToppingsChange = useCallback(
    (selectedItems: CategoryItem[], totalPrice: number) => {
      setSelectedExtraToppings(selectedItems);
      setExtraToppingsPrice(totalPrice);
    },
    []
  );

  const handleAddToCart = useCallback(() => {
    if (menuItem.sizes && menuItem.sizes.length > 0) {
      setShowPopup(true);
    } else {
      addToCart(menuItem);
      toast.success("Produto adicionado ao carrinho");
    }
  }, [menuItem, addToCart]);

  const handleSizeSelect = useCallback((size: SizeOption) => {
    setSelectedSize(size);
  }, []);

  const handleConfirm = useCallback(() => {
    if (selectedSize) {
      const finalPrice = selectedSize.price + extraToppingsPrice;

      addToCart({
        _id: _id,
        category,
        name,
        description,
        image,
        selectedSize,
        selectedCreams,
        selectedToppings,
        selectedFruits,
        selectedExtraToppings,
        comments,
        price: finalPrice,
      });
      toast.success("Produto adicionado ao carrinho");

      setSelectedSize(null);
      setSelectedFruits([]);
      setSelectedToppings([]);
      setSelectedCreams([]);
      setSelectedExtraToppings([]);
      setShowPopup(false);
    } else {
      toast.error("Por favor, selecione um tamanho");
    }
  }, [
    selectedSize,
    extraToppingsPrice,
    addToCart,
    _id,
    category,
    name,
    description,
    image,
    selectedCreams,
    selectedToppings,
    selectedFruits,
    selectedExtraToppings,
    comments,
  ]);

  useEffect(() => {
    // Função para buscar as frutas e acompanhamentos
    const fetchCategories = async () => {
      try {
        const [
          fruitsResponse,
          toppingsResponse,
          creamsResponse,
          extraToppingsResponse,
        ] = await Promise.all([
          fetch("/api/menu-itens/frutas"),
          fetch("/api/menu-itens/acompanhamentos"),
          fetch("/api/menu-itens/cremes"),
          fetch("/api/menu-itens/acompanhamentos-extra"),
        ]);

        if (
          !fruitsResponse.ok ||
          !toppingsResponse.ok ||
          !creamsResponse.ok ||
          !extraToppingsResponse.ok
        ) {
          throw new Error("Failed to fetch categories");
        }

        const fruitsData = await fruitsResponse.json();
        const toppingsData = await toppingsResponse.json();
        const creamsData = await creamsResponse.json();
        const extraToppingsData = await extraToppingsResponse.json();

        setFruits(fruitsData);
        setToppings(toppingsData);
        setCreams(creamsData);
        setExtraToppings(extraToppingsData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Falha ao carregar opções. Por favor, tente novamente.");
      }
    };

    if (showPopup) {
      fetchCategories();
    }
  }, [showPopup]);

  return (
    <>
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col lg:flex-row">
          <DialogTitle className="hidden"></DialogTitle>
          <div className="w-full lg:w-1/3">
            <Image
              src={image || ""}
              alt={name}
              width={500}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4 flex-grow overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">{name}</h2>
            <p className="text-gray-600 mb-4">{description}</p>

            {sizes && sizes.length > 0 && (
              <SizeSelection sizes={sizes} onSizeSelect={handleSizeSelect} />
            )}

            {selectedSize && (
              <>
                <ItemSelector
                  items={creams}
                  maxItems={selectedSize.maxCreams}
                  categoryName="Cremes"
                  onSelectionChange={setSelectedCreams}
                />
                <ItemSelector
                  items={toppings}
                  maxItems={selectedSize.maxToppings}
                  categoryName="Acompanhamentos"
                  onSelectionChange={setSelectedToppings}
                />
                <ItemSelector
                  items={fruits}
                  maxItems={selectedSize.maxFruits}
                  categoryName="Frutas"
                  onSelectionChange={setSelectedFruits}
                />
                {/* Acompanhamentos extras */}
                <ExtraToppingsSelector
                  items={extraToppings}
                  maxItems={10}
                  categoryName="Acompanhamentos Extras"
                  onSelectionChange={handleExtraToppingsChange}
                />
                {/* Comentários Adicionais */}
                <div className="pb-4">
                  <h3 className="text-lg font-medium mb-2 text-pink-400">
                    Algum comentário adicional?
                  </h3>

                  <Textarea
                    placeholder="Comentários Adicionais"
                    className="w-full"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!selectedSize}
              className="bg-pink-300 text-center w-full sm:pb-4"
            >
              Adicionar - R${" "}
              {selectedSize &&
                (selectedSize?.price + extraToppingsPrice).toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <MenuItemTile item={menuItem} onAddToCart={handleAddToCart} />
    </>
  );
}
