"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputPassword } from "@/components/InputPassword";
import { CardFeedback } from "@/components/CardFeedback";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import '@/styles/globals.css';

export default function PrimeiroAcesso() {
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAtivarConta = async () => {
    setLoading(true);

    if (senha !== confirmarSenha) {
      setFeedback({ type: "error", message: "As senhas não coincidem." });
      setLoading(false);
      return;
    }

    try {
      // simula API de ativação
      await new Promise((r) => setTimeout(r, 1200));

      setFeedback({
        type: "success",
        message: "✅ Conta ativada com sucesso! Redirecionando para o login...",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
    } catch {
      setFeedback({
        type: "error",
        message: "Erro inesperado ao ativar conta.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
    >
      <Card className="max-w-md w-full shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold text-[var(--greenDark)]">
            🧩 Primeiro Acesso
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm text-center">
            Confirme sua identidade e defina uma nova senha.
          </p>

          {/* Feedback */}
          {feedback.type && <CardFeedback type={feedback.type} message={feedback.message} />}

          {/* Data de nascimento */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <Input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="mt-1 border-[var(--greenLight)] hover:border-[var(--golden)]"
            />
          </div>

          {/* Senhas */}
          <InputPassword
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border-[var(--greenLight)] hover:border-[var(--golden)]"
          />

          <InputPassword
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="border-[var(--greenLight)] hover:border-[var(--golden)]"
          />

          <Button onClick={handleAtivarConta} className="w-full mt-4 bg-[var(--greenLight)] hover:bg-[var(--golden)]" disabled={loading}>
            {loading ? "Ativando..." : "Ativar Conta"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
    <Footer />
    </>
  );
}
