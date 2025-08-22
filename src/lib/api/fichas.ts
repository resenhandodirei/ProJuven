export async function criarFicha(formData: {
  nomeAtendido: string;
  cpf: string;
  numeroProcesso: string;
  nomeResponsavel: string;
  dataNascimento: string; // yyyy-mm-dd
}) {
  const res = await fetch('/api/fichas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json?.error ? JSON.stringify(json.error) : 'Erro desconhecido');
  }
  return res.json();
}
