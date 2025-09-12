// src/lib/perfil.ts
import { TipoDePerfilEnum } from "@prisma/client";

/**
 * Tabela de mapeamento do que vem do front (string amigável/lowercase)
 * para o enum do Prisma (uppercase).
 */
export const PERFIL_MAP: Record<string, TipoDePerfilEnum> = {
  admin: TipoDePerfilEnum.ADMIN,
  defensor: TipoDePerfilEnum.DEFENSOR,
  psicossocial: TipoDePerfilEnum.PSICOSSOCIAL,
  servidor: TipoDePerfilEnum.SERVIDOR,
  estagiario: TipoDePerfilEnum.ESTAGIARIO,
};

/**
 * Type guard: checa se um valor é um TipoDePerfilEnum válido.
 */
export function isTipoDePerfilEnum(value: unknown): value is TipoDePerfilEnum {
  return Object.values(TipoDePerfilEnum).includes(value as TipoDePerfilEnum);
}

/**
 * Normaliza uma string de entrada (ex.: "admin", " Admin ", "ADMIN")
 * para um TipoDePerfilEnum. Retorna null se for inválido.
 */
export function normalizePerfilInput(input?: string | null): TipoDePerfilEnum | null {
  if (!input) return null;
  
  // normaliza pra minúsculo e sem espaços
  const key = String(input).trim().toLowerCase();
  const mapped = PERFIL_MAP[key];
  
  return mapped || null;
}

/**
 * Asserção útil em pontos críticos (ex.: antes de assinar JWT).
 * Lança erro se o valor não for um enum válido.
 */
export function assertPerfilOrThrow(value: unknown): asserts value is TipoDePerfilEnum {
  if (!isTipoDePerfilEnum(value)) {
    throw new Error(`Tipo de perfil inválido: ${value}`);
  }
}
