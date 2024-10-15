"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableImage from "@/src/components/layout/EditableImage";
import SectionsHeaders from "@/src/components/layout/SectionsHeaders";
import useProfile from "@/src/hooks/useProfile";
import { CategoryDocument } from "@/src/models/Category";
import { ArrowLeft } from "lucide-react";

export interface SizeOption {
  name: string;
  size?: string; // Ex: "200ml", "300ml", "500ml"
  price: number; // Ex: 12, 15, 18 (em reais)
  maxFruits?: number; // Limite de frutas
  maxCreams?: number; // Limite de cremes
  maxToppings?: number; // Limite de acompanhamentos
}

export interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
  sizes: SizeOption[];
  fruits: string;
  creams: string;
  toppings: string;
}

const initialMenuItemState: MenuItem = {
  name: "",
  description: "",
  image: "",
  price: "",
  category: "",
  sizes: [],
  fruits: "",
  creams: "",
  toppings: "",
};

export default function NewMenuItemPage() {
  const { userData, error, noPermission } = useProfile();
  const [menuItem, setMenuItem] = useState<MenuItem>(initialMenuItemState);
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categorias");
      if (!response.ok) throw new Error("Falha ao buscar categorias");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      toast.error("Erro ao buscar categorias!");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMenuItem = async (ev: React.FormEvent) => {
    ev.preventDefault();

    // Validação básica dos campos obrigatórios
    if (!menuItem.name || !menuItem.description || !menuItem.category) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const getSmallestSizePrice = (sizes: Array<{ price: number }>): number => {
      if (sizes.length === 0) return 0;
      return Math.min(...sizes.map((size) => size.price));
    };

    // Preparar o item do menu para envio
    const newMenuItem = {
      name: menuItem.name,
      description: menuItem.description,
      category: menuItem.category,
      image: menuItem.image,
      price:
        (menuItem.category === "Açaí"
          ? getSmallestSizePrice(sizes)
          : parseFloat(menuItem.price)) ||
        (menuItem.category === "Cremes" ? 0 : 0),
      sizes:
        menuItem.category === "Açaí"
          ? sizes.map((size) => ({
              name: size.name,
              price: parseFloat(size.price.toString()),
              maxFruits: parseInt(size.maxFruits?.toString() || "0"),
              maxCreams: parseInt(size.maxCreams?.toString() || "0"),
              maxToppings: parseInt(size.maxToppings?.toString() || "0"),
            }))
          : [],
    };

    // Validação específica para Açaí
    if (menuItem.category === "Açaí") {
      if (newMenuItem.sizes.length === 0) {
        toast.error("Por favor, adicione ao menos um tamanho para Açaí.");
        return;
      }
      // Verificar se todos os campos necessários para Açaí estão preenchidos
      const invalidSize = newMenuItem.sizes.some(
        (size) =>
          !size.name ||
          isNaN(size.price) ||
          isNaN(size.maxFruits) ||
          isNaN(size.maxCreams) ||
          isNaN(size.maxToppings)
      );
      if (invalidSize) {
        toast.error(
          "Por favor, preencha todas as informações de tamanho para Açaí."
        );
        return;
      }
    } else {
      // Validação para itens que não são Açaí
      if (isNaN(newMenuItem.price) || newMenuItem.price < 0) {
        toast.error("Por favor, forneça um preço válido.");
        return;
      }
    }

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      try {
        const response = await fetch("/api/menu-itens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMenuItem),
        });

        if (response.ok) {
          setMenuItem(initialMenuItemState);
          setSizes([]);
          resolve();
        } else {
          const errorData = await response.json();
          reject(
            new Error(errorData.message || "Erro ao adicionar item de menu.")
          );
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Salvando item...",
      success: "Item de menu adicionado com sucesso!",
      error: "Erro ao adicionar item de menu.",
    });

    router.push("/menu-itens");
  };

  const addSize = () => {
    setSizes((prev) => [
      ...prev,
      { name: "", price: 0, maxFruits: 0, maxCreams: 0, maxToppings: 0 },
    ]);
  };

  const handleSizeChange = (
    index: number,
    field: keyof SizeOption,
    value: string | number
  ) => {
    setSizes((prev) =>
      prev.map((size, i) => (i === index ? { ...size, [field]: value } : size))
    );
  };

  const removeSize = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  if (error) {
    return <div color="error">{error}</div>;
  }

  if (noPermission) {
    router.push("/");
    return null;
  }

  return (
    <>
      {userData && (
        <>
          <section className="container mx-auto py-8 px-4 max-h-screen overflow-hidden">
            <div className="text-center">
              <SectionsHeaders mainHeader="Menu Items" subHeader="" />
            </div>
            <div className="max-w-lg mx-auto my-8 flex justify-center items-center">
              <Link
                href={"/menu-itens"}
                className="button flex justify-center items-center"
              >
                <ArrowLeft />
                <span>Mostrar todos os items do menu!</span>
              </Link>
            </div>
            <form
              onSubmit={handleNewMenuItem}
              className="p-8 rounded-lg shadow-md bg-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <EditableImage
                    link={menuItem.image}
                    setLink={(url) =>
                      setMenuItem((prev) => ({ ...prev, image: url }))
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-6">
                  {renderFormFields()}
                  {renderSizeOptions()}
                  {renderActionButtons()}
                </div>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );

  function renderFormFields() {
    return (
      <>
        <InputField
          type="text"
          label="Nome do item"
          id="name"
          name="name"
          value={menuItem.name}
          onChange={handleInputChange}
          required
        />
        <TextAreaField
          label="Descrição"
          id="description"
          name="description"
          value={menuItem.description}
          onChange={handleInputChange}
        />
        <SelectField
          label="Categoria"
          id="category"
          name="category"
          value={menuItem.category}
          onChange={handleInputChange}
          options={categories.map((cat) => ({
            value: cat.name,
            label: cat.name,
          }))}
          required
        />
        {menuItem.category === "Açaí" ||
        menuItem.category === "Cremes" ? null : (
          <InputField
            label="Preço"
            type="text"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleInputChange}
            required
          />
        )}
      </>
    );
  }

  function renderSizeOptions() {
    return (
      <div>
        <h2 className="text-lg font-medium text-gray-900">Tamanhos</h2>
        {sizes.map((size, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-center my-2"
          >
            <div className="col-span-5">
              <label className="text-sm font-medium text-gray-700">
                Tamanho
              </label>
              <input
                type="text"
                name="Tamanho"
                value={size.name}
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
                placeholder="Adicionar tamanho (Ex: 200ml)"
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
              />
            </div>

            <div className="col-span-3">
              <label className="text-sm font-medium text-gray-700">Preço</label>
              <input
                type="text"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                placeholder="Adicionar preço"
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Máx. Frutas
              </label>
              <input
                type="number"
                value={size.maxFruits}
                onChange={(e) =>
                  handleSizeChange(index, "maxFruits", parseInt(e.target.value))
                }
                placeholder="Máx. Frutas"
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Máx. Cremes
              </label>
              <input
                type="number"
                value={size.maxCreams}
                onChange={(e) =>
                  handleSizeChange(index, "maxCreams", parseInt(e.target.value))
                }
                placeholder="Máx. Cremes"
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Máx. Acompanh.
              </label>
              <input
                type="number"
                value={size.maxToppings}
                onChange={(e) =>
                  handleSizeChange(
                    index,
                    "maxToppings",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Máx. Acompanh."
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
              />
            </div>

            <div className="col-span-1 flex justify-center items-center">
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="text-red-600 hover:text-red-800"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSize}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <AddIcon />
          Adicionar Tamanho
        </button>
      </div>
    );
  }

  function renderActionButtons() {
    return (
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Adicionar Item
        </button>
        <button
          type="button"
          onClick={() => router.push("/menu-itens")}
          className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
      </div>
    );
  }
}

function InputField({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
      />
    </div>
  );
}

function TextAreaField({
  label,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-purple-300 focus:ring"
      ></textarea>
    </div>
  );
}

function SelectField({
  label,
  id,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Selecionar uma categoria</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
