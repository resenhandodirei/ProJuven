"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Button } from "@/components/Button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { useRouter } from "next/navigation";

export default function BoasVindas() {
  const router = useRouter();

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="max-w-md w-full text-center shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-primary">
            👋 Bem-vindo(a) ao ProJuven
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            O ProJuven é um sistema voltado ao acompanhamento de prontuários e atendimentos.
            Se este é o seu primeiro acesso, você precisará ativar sua conta.
          </p>

          <div className="flex flex-col gap-2">
            <Button onClick={() => router.push("/primeiro-acesso")}>
              Primeiro Acesso
            </Button>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Já tenho conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    
    </>
  );
}
