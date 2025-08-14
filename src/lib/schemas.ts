// src/lib/schemas.ts
import { z } from 'zod';

export const fichaSchema = z.object({
  nomeAtendido: z.string().nonempty(),
  cpf: z.string().nonempty(),
  numeroProcesso: z.string().nonempty(),
  nomeResponsavel: z.string().nonempty(),
  dataNascimento: z.string().nonempty(), // ISO string (yyyy-mm-dd)
});

export type FichaInput = z.infer<typeof fichaSchema>;
