"use client";
import { useForm } from "react-hook-form";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmitForm = handleSubmit(async (data) => {
    await onSubmit(data.email, data.password);
  });

  return (
    <form className="max-w-xs mx-auto" onSubmit={onSubmitForm}>
      <input
        {...register("email", { required: "Email é obrigatório" })}
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 mb-3 border rounded"
        disabled={isSubmitting}
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}
      <input
        {...register("password", { required: "Senha é obrigatória" })}
        type="password"
        placeholder="Senha"
        className="w-full px-3 py-2 mb-3 border rounded"
        disabled={isSubmitting}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message as string}</p>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white px-4 py-2 rounded-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Entrando..." : "Login"}
      </button>
    </form>
  );
}
