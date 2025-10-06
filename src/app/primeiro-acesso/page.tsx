import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputPassword } from "@/components/InputPassword";

export default function PrimeiroAcesso() {
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleAtivarConta = () => {
    // lógica de verificação e ativação
    console.log({ dataNascimento, senha });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="max-w-md w-full shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold text-primary">
            🧩 Primeiro Acesso
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm text-center">
            Confirme sua identidade informando a data de nascimento e defina uma nova senha.
          </p>

          {/* Data de Nascimento */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <Input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-1"
            />
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <InputPassword
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua senha"
              className="mt-1"
            />
          </div>

          <Button onClick={handleAtivarConta} className="w-full mt-4">
            Ativar Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
