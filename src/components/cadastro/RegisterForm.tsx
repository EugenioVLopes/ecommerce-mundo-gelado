"use client";

import { useState } from "react";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import { Alert } from "@components/ui/alert";
import { Loader2 } from "lucide-react";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";
import { SuccessMessage } from "./SuccessMessage";
import { useRegisterForm } from "@/src/hooks/useRegisterForm";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function RegisterForm() {
  const { form, isLoading, error, userCreated, onSubmit } = useRegisterForm();
  const [step, setStep] = useState(1);

  if (userCreated) {
    return <SuccessMessage />;
  }

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div>
            <PersonalInfoFields form={form} />
            <Button
              type="button"
              onClick={nextStep}
              className="w-full mt-4 bg-pink-300"
            >
              Próxima Etapa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <AddressFields form={form} />
            <div className="flex flex-col mt-4">
              <Button
                type="button"
                className="w-full"
                onClick={prevStep}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Etapa Anterior
              </Button>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cadastrar
              </Button>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            {error}
          </Alert>
        )}
      </form>
    </Form>
  );
}
