"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Button } from "@/components/Button";
import { Bell, FileText, PlusCircle, Search } from "lucide-react";

export default function HomePage() {
  // Mock de dados - em produção puxaremos do backend
  const recentes = [
    { id: 1, titulo: "Prontuário - João da Silva", data: "05/09/2025" },
    { id: 2, titulo: "Prontuário - Maria Oliveira", data: "04/09/2025" },
    { id: 3, titulo: "Prontuário - Pedro Santos", data: "03/09/2025" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Boas-vindas */}
      <header>
        <h1 className="text-2xl font-bold">Bem-vinda, Larissa (Defensora)</h1>
        <p className="text-gray-600">Aqui está um resumo do que importa para você.</p>
      </header>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Prontuários em aberto</CardTitle>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-gray-500">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Notificações</CardTitle>
            <Bell className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500">Pendentes de leitura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Agenda</CardTitle>
            <Search className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2</p>
            <p className="text-sm text-gray-500">Atendimentos hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" /> Novo Prontuário
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Search className="h-4 w-4" /> Buscar Prontuário
        </Button>
      </div>

      {/* Últimos acessos */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos prontuários acessados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentes.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span>{item.titulo}</span>
                <span className="text-sm text-gray-500">{item.data}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
