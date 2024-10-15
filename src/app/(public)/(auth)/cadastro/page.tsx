"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { RegisterForm } from "@components/cadastro/RegisterForm";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center px-2">
      <Card className="w-full max-w-4xl mx-auto bg-pink-50/40 mb-4">
        <CardHeader>
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>
            Crie sua conta para começar a fazer pedidos!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full gap-1"
            onClick={() => {
              setIsLoading(true);
              signIn("google", { callbackUrl: "/" });
            }}
            disabled={isLoading}
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            Entrar com Google
          </Button>
          <p className="text-sm text-center">
            Já possui uma conta?{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4"
            >
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
