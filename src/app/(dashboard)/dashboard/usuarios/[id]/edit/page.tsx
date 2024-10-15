"use client";

import { useState, useEffect } from "react";
import useProfile from "@/src/hooks/useProfile";
import { IAddress, IUser } from "@/src/models/User";
import toast from "react-hot-toast";
import EditableImage from "@/src/components/layout/EditableImage";
import SectionsHeaders from "@/src/components/layout/SectionsHeaders";
import TabsAdmin from "@/src/components/layout/TabsAdmin";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type UserWithoutMethods = Omit<IUser, "comparePassword" | "_id">;

export default function EditUserPage() {
  const { userData, error, noPermission } = useProfile();
  const [user, setUser] = useState<UserWithoutMethods | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/usuarios/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
          toast.error("Falha ao carregar dados do usuário");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleProfileInfoUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      toast.success("Perfil atualizado com sucesso!");
      router.push("/usuarios");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Erro ao atualizar o perfil");
    }
  };

  const handleDelete = async () => {
    if (!id) {
      toast.error("ID do usuário não encontrado");
      return;
    }

    try {
      await toast.promise(
        fetch(`/api/usuarios/${id}`, {
          method: "DELETE",
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Falha ao deletar usuário");
          }
          router.push("/usuarios");
        }),
        {
          loading: "Deletando usuário...",
          success: "Usuário deletado com sucesso",
          error: (err) => `Falha ao deletar usuário: ${err.message}`,
        }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = (updates: Partial<UserWithoutMethods>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const updateAddress = (index: number, updates: Partial<IAddress>) => {
    setUser((prev) => {
      if (!prev) return null;
      const newAddresses = [...prev.addresses];
      newAddresses[index] = { ...newAddresses[index], ...updates };
      return { ...prev, addresses: newAddresses };
    });
  };
  if (isLoading) {
    return <p className="flex items-center justify-center">Carregando...</p>;
  }

  if (error || !user) {
    return <p className="text-center text-red-500">Erro ao carregar usuário</p>;
  }

  return (
    <section className="my-8">
      <TabsAdmin isAdmin={!noPermission} />
      <div className="mt-4 text-center text-4xl mb-4">
        <SectionsHeaders mainHeader="Atualizar Usuário" subHeader="" />
      </div>
      <div className="max-w-lg mx-auto my-8 flex justify-center items-center">
        <Link
          href={"/usuarios"}
          className="button flex justify-center items-center"
        >
          <ArrowLeft />
          <span>Voltar para todos os usuários</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto border p-4 rounded-lg shadow-sm">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleProfileInfoUpdate}
        >
          <div>
            <EditableImage
              link={user.image || ""}
              setLink={(link) => updateUser({ image: link })}
            />
            <input
              type="text"
              className="my-2"
              placeholder="Nome do Usuário"
              value={user.name}
              onChange={(ev) => updateUser({ name: ev.target.value })}
            />
            <input
              type="text"
              className="my-2"
              placeholder="Email do Usuário"
              value={user.email}
              disabled={true}
            />
            <input
              type="text"
              className="my-2"
              placeholder="Telefone do Usuário"
              value={user.phone}
              onChange={(ev) => updateUser({ phone: ev.target.value })}
              required
            />
            <select
              className="my-2"
              value={user.role}
              onChange={(ev) =>
                updateUser({ role: ev.target.value as "customer" | "admin" })
              }
            >
              <option value="customer">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div>
            {user.addresses && user.addresses[0] && (
              <>
                <input
                  type="text"
                  className="my-2"
                  placeholder="Rua"
                  value={user.addresses[0].street}
                  onChange={(ev) =>
                    updateAddress(0, { street: ev.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="Número"
                  value={user.addresses[0].number}
                  onChange={(ev) =>
                    updateAddress(0, { number: ev.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="Complemento"
                  value={user.addresses[0].complement}
                  onChange={(ev) =>
                    updateAddress(0, { complement: ev.target.value })
                  }
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="Bairro"
                  value={user.addresses[0].neighborhood}
                  onChange={(ev) =>
                    updateAddress(0, { neighborhood: ev.target.value })
                  }
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="Cidade"
                  value={user.addresses[0].city}
                  onChange={(ev) => updateAddress(0, { city: ev.target.value })}
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="Estado"
                  value={user.addresses[0].state}
                  onChange={(ev) =>
                    updateAddress(0, { state: ev.target.value })
                  }
                />
                <input
                  type="text"
                  className="my-2"
                  placeholder="CEP"
                  value={user.addresses[0].zipCode}
                  onChange={(ev) =>
                    updateAddress(0, { zipCode: ev.target.value })
                  }
                />
              </>
            )}
          </div>
          <div className="md:col-span-2 flex justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Atualizando..." : "Atualizar Perfil"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Excluir Usuário
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
