"use client";

import React, { useEffect, useState } from "react";
import SectionsHeaders from "@/src/components/layout/SectionsHeaders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

interface Category {
  _id: string;
  name: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categorias");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Erro ao buscar categorias!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewCategory = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!newCategory.trim()) {
      toast.error("Nome da categoria é obrigatório");
      return;
    }
    try {
      const response = await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (!response.ok) throw new Error("Failed to add category");
      toast.success("Categoria adicionada com sucesso!");
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao adicionar categoria");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setEditedName(category.name);
  };

  const handleSave = async (id: string) => {
    if (!editedName.trim()) {
      toast.error("Nome da categoria é obrigatório");
      return;
    }
    try {
      const response = await fetch(`/api/categorias`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName, id: id }),
      });
      if (!response.ok) throw new Error("Failed to update category");
      toast.success("Categoria atualizada com sucesso!");
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Erro ao atualizar categoria");
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting category with id:", id);
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        const response = await fetch("api/categorias", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        });
        if (!response.ok) throw new Error("Failed to delete category");
        toast.success("Categoria excluída com sucesso!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Erro ao excluir categoria");
      }
    }
  };

  return (
          <section className="py-8 max-w-4xl mx-auto max-h-screen">
            <div className="text-center">
              <SectionsHeaders mainHeader="Categorias" subHeader="" />
            </div>
            <form className="mb-8" onSubmit={handleNewCategory}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nova Categoria"
                  value={newCategory}
                  onChange={(ev) => setNewCategory(ev.target.value)}
                  className="grow p-2 border rounded"
                />
                <Button
                  type="submit"
                  className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Adicionar
                </Button>
              </div>
            </form>
            {isLoading ? (
              <p className="text-center">Carregando categorias...</p>
            ) : categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="bg-purple-100 p-4 m-2 rounded-lg shadow-md text-center flex flex-col items-center w-full hover:bg-pink-50 shadow-black/25 transition-all group"
                  >
                    {editingCategory?._id === category._id ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-base sm:text-lg font-semibold my-2 p-1 border rounded w-full"
                        autoFocus
                      />
                    ) : (
                      <h4 className="text-base sm:text-lg font-semibold my-2 bg-purple-100 group-hover:bg-pink-50 transition-colors duration-300">
                        {category.name}
                      </h4>
                    )}
                    <div className="flex gap-2 mt-4">
                      {editingCategory?._id === category._id ? (
                        <Button
                          onClick={() => handleSave(category._id)}
                          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                        >
                          Salvar
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEdit(category)}
                          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                        >
                          Editar
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">Nenhuma categoria encontrada.</p>
            )}
          </section>
  );
}
