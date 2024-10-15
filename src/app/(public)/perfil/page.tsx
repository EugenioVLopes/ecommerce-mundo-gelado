"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SectionsHeaders from "../../../components/layout/SectionsHeaders";
import EditableImage from "@/src/components/layout/EditableImage";
import useProfile from "@/src/hooks/useProfile";
import { IAddress } from "@/src/models/User";
import AdressInputs from "@/src/components/layout/AdressInputs";

export default function ProfilePage() {
  const { userData } = useProfile();
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState("");
  const [tel, setTel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileFetch, setProfileFetch] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const router = useRouter();
  const [currentAddress, setCurrentAddress] = useState<IAddress>({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userData && userData.name) {
      setUserName(userData.name);
      setTel(userData.phone);
      setImage(userData.image || "");
      setCurrentAddress(userData?.addresses?.[0] || {});
      setProfileFetch(true);
      setIsLoading(false);
    }
  }, [userData]);

  if (status === "loading" || !profileFetch) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg">Carregando detalhes do perfil...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  async function handleProfileInfoUpdate(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      const savingPromise = new Promise<void>(async (resolve, reject) => {
        const response = await fetch("/api/perfil", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            phone: tel,
            addresses: [
              {
                street: currentAddress.street,
                number: currentAddress.number,
                complement: currentAddress.complement,
                neighborhood: currentAddress.neighborhood,
                city: currentAddress.city,
                state: currentAddress.state,
                zipCode: currentAddress.zipCode,
              },
            ],
          }),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
        toast.promise(savingPromise, {
          loading: "Salvando informações...",
          success: "Perfil atualizado com sucesso!",
          error: "Erro ao atualizar o perfil",
        });
      });
    } catch (error) {
      toast.error("Erro ao atualizar o perfil");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="h-[70vh]">
      <div className="mt-4 text-center text-4xl mb-4">
        <SectionsHeaders mainHeader="Perfil" subHeader="" />
      </div>
      <div className="max-w-3xl mx-auto border p-4 rounded-lg shadow-sm">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 "
          onSubmit={handleProfileInfoUpdate}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
            <input
              type="text"
              className="my-2"
              placeholder="Nome do Usuário"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="text"
              className="my-2"
              placeholder="Email do Usuário"
              value={session?.user?.email || ""}
              disabled={true}
            />
            <input
              type="text"
              className="my-2"
              placeholder="Telefone do Usuário"
              value={tel}
              onChange={(ev) => setTel(ev.target.value)}
              required
            />
          </div>
          <AdressInputs
            adressInputsProps={currentAddress}
            setCurrentAddress={setCurrentAddress}
            disable={isLoading}
          />
          <button type="submit" disabled={isLoading} className="md:col-span-2">
            {isLoading ? "Atualizando..." : "Atualizar Perfil"}
          </button>
        </form>
      </div>
    </section>
  );
}
