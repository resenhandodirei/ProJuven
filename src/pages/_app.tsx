"use client";

import "@/styles/globals.css";


import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { motion } from "framer-motion";
import { Shield, Users, FileText } from "lucide-react";

export default function HomePublic() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-primary">ProJuven</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => (window.location.href = "/login")}>
            Entrar
          </Button>
          <Button onClick={() => (window.location.href = "/primeiro-acesso")}>
            Primeiro Acesso
          </Button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16 bg-gradient-to-b from-blue-50 to-white">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Sistema Integrado de Atendimento a Jovens
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mb-8"
        >
          O ProJuven é uma plataforma da Defensoria Pública dedicada ao acompanhamento de jovens em medidas socioeducativas,
          promovendo acolhimento, transparência e gestão eficiente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Button onClick={() => (window.location.href = "/login")}>
            Acessar Sistema
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/sobre")}>
            Saiba mais
          </Button>
        </motion.div>
      </section>

      {/* CARDS INFORMATIVOS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="h-full shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield size={22} /> Segurança e Sigilo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Os dados são protegidos conforme a LGPD, garantindo confidencialidade e acesso controlado por perfis de usuário.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="h-full shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users size={22} /> Trabalho Integrado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Conecta equipes jurídicas, psicossociais e administrativas, otimizando o acompanhamento dos atendimentos.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="h-full shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <FileText size={22} /> Gestão Documental
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Permite o registro e acompanhamento digital de prontuários e fichas, reduzindo burocracias e perdas de dados.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-6 border-t mt-auto text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} ProJuven — Defensoria Pública do Estado.  
          <br /> Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
