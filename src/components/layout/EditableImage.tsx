import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

type EditableImageProps = {
  link: string;
  setLink: (link: string) => void;
};

const EditableImage = ({ link, setLink }: EditableImageProps) => {
  async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        return response.json().then((link) => setLink(link));
      }
      console.error("Error uploading file:");
    });

    await toast.promise(uploadPromise, {
      loading: "Atualizando...",
      success: "Arquivo atualizado com sucesso!",
      error: "Erro ao atualizar arquivo.",
    });
  }

  return (
    <div className="p-2 rounded-lg flex items-center justify-center flex-col gap-4">
      {link && (
        <Image
          src={link}
          alt="Imagem"
          width={135}
          height={135}
          className="rounded-full"
        />
      )}
      {link === "" && (
        <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">
          Sem Imagem
        </div>
      )}
      <label className="m-1">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <span className="bg-purple-50 text-black p-3 border rounded-lg cursor-pointer">
          Alterar Imagem
        </span>
      </label>
    </div>
  );
};

export default EditableImage;
