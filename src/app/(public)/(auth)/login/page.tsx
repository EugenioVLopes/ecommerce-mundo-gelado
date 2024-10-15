"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useProfile from "@/src/hooks/useProfile";
import LoginForm from "@/src/components/login/LoginForm";
import useAuth from "@/src/hooks/useAuth";

export default function LoginPage() {
  const { userData } = useProfile();
  const router = useRouter();
  const { login } = useAuth();

  if (userData) {
    router.push("/");
    return null;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast.error("Credenciais Inválidas. Tente novamente.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center overflow-hidden p-6 m-2 md:p-0 grow">
      <div className="relative z-20 m-auto flex w-full max-w-xl flex-col p-8 border rounded-lg bg-pink-50">
        <div className="flex w-full flex-col relative">
          <div className="pointer-events-auto mt-6 flex flex-col">
            <div className="pb-4 inline-block bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl text-center text-black">
                Faça seu login no <br /> Mundo Gelado.
              </h1>
            </div>
            <div className="flex flex-col space-y-4 mb-4">
              <LoginForm onSubmit={handleLogin} />
            </div>
            <button
              type="button"
              className="bg-white rounded-lg py-2 flex gap-4 justify-center border"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Image src="/google.svg" alt="Google" width={24} height={24} />
              Continuar com o Google
            </button>
          </div>

          <p className="text-xs text-[#878787] mt-2">
            Ao continuar, você reconhece que leu e concorda com os{" "}
            <a href="/termos" className="underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="/politica" className="underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
