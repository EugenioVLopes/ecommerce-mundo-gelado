import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";

export function SuccessMessage() {
  return (
    <Alert>
      <AlertTitle>Sucesso!</AlertTitle>
      <AlertDescription>
        Usuário adicionado com sucesso!{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4"
        >
          Faça login
        </Link>
      </AlertDescription>
    </Alert>
  );
}
