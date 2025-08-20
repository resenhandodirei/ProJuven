import { z } from 'zod';

/**
 * Validador de CPF (algoritmo oficial):
 * - remove não dígitos
 * - rejeita sequências com todos dígitos iguais
 * - calcula os dois dígitos verificadores
 */
function isValidCPF(rawCpf: string): boolean {
  const cpf = (rawCpf || '').replace(/\D/g, ''); // keep only digits
  if (!cpf || cpf.length !== 11) return false;

  // rejeita sequências como "00000000000", "11111111111", ...
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split('').map((d) => parseInt(d, 10));

  // calcula primeiro dígito verificador
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    // peso decrescente 10..2
    const peso = 10 - i;
    sum1 += digits[i] * peso;
  }
  const resto1 = sum1 % 11;
  const dv1 = resto1 < 2 ? 0 : 11 - resto1;
  if (dv1 !== digits[9]) return false;

  // calcula segundo dígito verificador (com os primeiros 10 dígitos)
  let sum2 = 0;
  for (let i = 0; i < 10; i++) {
    // peso decrescente 11..2
    const peso = 11 - i;
    sum2 += digits[i] * peso;
  }
  const resto2 = sum2 % 11;
  const dv2 = resto2 < 2 ? 0 : 11 - resto2;
  if (dv2 !== digits[10]) return false;

  return true;
}

/* ===== SCHEMAS ===== */

/** Login schema */
export const loginSchema = z.object({
  email: z.string().nonempty({ message: 'email é obrigatório' }).email({ message: 'email inválido' }),
  senha: z.string().min(6, { message: 'senha precisa ter ao menos 6 caracteres' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

/** Ficha schema */
export const fichaSchema = z.object({
  nomeAtendido: z.string().nonempty({ message: 'nome do atendido é obrigatório' }).max(200),
  cpf: z
    .string()
    .nonempty({ message: 'cpf é obrigatório' })
    .refine((v) => isValidCPF(v), { message: 'cpf inválido' }),
  numeroProcesso: z.string().nonempty({ message: 'número do processo é obrigatório' }).max(100),
  nomeResponsavel: z.string().nonempty({ message: 'nome do responsável é obrigatório' }).max(200),
  dataNascimento: z
    .string()
    .nonempty({ message: 'data de nascimento é obrigatória' })
    .refine((s) => {
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return false;
      // não pode ser no futuro (com pequena margem de timezone)
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return d <= today;
    }, { message: 'data de nascimento inválida ou futura' }),
});

export type FichaInput = z.infer<typeof fichaSchema>;
