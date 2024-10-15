"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@components/ui/use-toast";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import useProfile from "@/src/hooks/useProfile";
import { MenuItem } from "@/src/models/MenuItem";
import { CategoryDocument as Category } from "@/src/models/Category";
import Layout from "@/src/components/admin/Layout";

export default function EditMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params?.id as string;
  const { userData, error, noPermission } = useProfile();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`/api/menu-itens/${id}`);
        if (!response.ok) throw new Error("Failed to fetch menu item");
        const data = await response.json();
        setMenuItem(data);
        setImage(data.image || "");
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price?.toString() || "");
        setCategory(data.category || "");
      } catch (error) {
        console.error("Error fetching menu item:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar item do menu!",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categorias");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Erro",
          description: "Erro ao buscar categorias!",
          variant: "destructive",
        });
      }
    };

    if (id) {
      fetchMenuItem();
      fetchCategories();
    }
  }, [id, toast]);

  const handleEditMenuItem = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const data = {
      _id: id,
      name,
      description,
      price: parseFloat(price),
      image,
      category,
    };
    try {
      const response = await fetch(`/api/menu-itens/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update menu item");
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
      router.push("/menu-items");
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast({
        title: "Error",
        description: "Failed to update menu item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMenuItem = async () => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      try {
        const response = await fetch(`/api/menu-items/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete menu item");
        toast({
          title: "Success",
          description: "Menu item deleted successfully",
        });
        router.push("/menu-items");
      } catch (error) {
        console.error("Error deleting menu item:", error);
        toast({
          title: "Error",
          description: "Erro ao excluir item de menu",
          variant: "destructive",
        });
      }
    }
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (noPermission) {
    router.push("/");
    return null;
  }

  return (
    <>
      {userData && (
        <>
          <section className="container mx-auto py-8">
            <Card className="max-w-4xl mx-auto bg-fuchsia-50">
              <CardHeader>
                <CardTitle>Editar Item de Menu</CardTitle>
                <CardDescription>
                  <Link
                    href="/dashboard/menu-itens"
                    className="mt-2 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar para todos os itens do menu
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEditMenuItem} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1">
                      {isLoading ? (
                        <Skeleton className="w-full h-48" />
                      ) : (
                        <div className="relative aspect-square">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-span-2 space-y-4">
                      {isLoading ? (
                        <>
                          <Skeleton className="w-full h-10" />
                          <Skeleton className="w-full h-20" />
                          <Skeleton className="w-full h-10" />
                          <Skeleton className="w-full h-10" />
                        </>
                      ) : (
                        <>
                          <Input
                            id="name"
                            placeholder="Nome do Item"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                          />
                          <Textarea
                            id="description"
                            placeholder="Descrição"
                            value={description}
                            onChange={(ev) => setDescription(ev.target.value)}
                          />
                          <Input
                            id="price"
                            type="number"
                            placeholder="Preço Base"
                            value={price}
                            onChange={(ev) => setPrice(ev.target.value)}
                          />
                          <Select
                            value={category}
                            onValueChange={(value) => setCategory(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.name} value={cat.name}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex items-center justify-center space-x-4">
                            <Button type="submit" disabled={isLoading}>
                              {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              )}
                              Salvar Alterações
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={handleDeleteMenuItem}
                              disabled={isLoading}
                            >
                              Excluir Item
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </>
  );
}
