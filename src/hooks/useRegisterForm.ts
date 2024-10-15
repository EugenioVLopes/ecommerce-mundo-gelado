import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../schemas/registerSchema";

export function useRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "Itajá",
        state: "RN",
        zipCode: "59513-000",
      },
    },
  });

  async function onSubmit(values: RegisterFormData) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        const data = await response.json();
        setError(data.message || "Erro ao cadastrar");
      }
    } catch (error) {
      setError("Erro ao cadastrar. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }

  return { form, isLoading, error, userCreated, onSubmit };
}
