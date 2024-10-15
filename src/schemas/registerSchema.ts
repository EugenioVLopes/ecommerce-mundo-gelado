import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  password: z
    .string()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres." }),
  confirmPassword: z.string(),
  phone: z.string().min(10, { message: "Número de telefone inválido." }),
  address: z.object({
    street: z.string().min(1, { message: "Rua é obrigatória." }),
    number: z.string().min(1, { message: "Número é obrigatório." }),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, { message: "Bairro é obrigatório." }),
    city: z.string().min(1, { message: "Cidade é obrigatória." }),
    state: z.string().min(1, { message: "Estado é obrigatório." }),
    zipCode: z.string().min(5, { message: "CEP inválido." }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;