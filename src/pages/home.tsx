"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards"
import { Button } from "@/components/Button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, FileText, UserPlus, ClipboardList } from "lucide-react"

export default function HomePage() {

  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        
        <p className="text-gray-600">
          Bem-vinda ao ProJuven! Aqui você encontra um resumo das atividades.
        </p>
      </motion.div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Acesso Rápido */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Acesso rápido</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="flex items-center gap-2">
                <UserPlus size={18} /> Novo Atendimento
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <FileText size={18} /> Prontuários
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <ClipboardList size={18} /> Histórico
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <Calendar size={18} /> Agenda
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                📂 <strong>24</strong> Prontuários ativos
              </p>
              <p className="text-gray-700">
                🗓️ <strong>5</strong> Atendimentos esta semana
              </p>
              <p className="text-gray-700">
                👩‍⚕️ <strong>3</strong> Profissionais ativos
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Últimos prontuários */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Últimos prontuários</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">Maria Silva - 02/09</span>
                <Button variant="outline">Ver</Button>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">João Souza - 01/09</span>
                <Button variant="outline">Ver</Button>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">Ana Lima - 30/08</span>
                <Button variant="outline">Ver</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    {/* Estado vazio exemplo */}
    </div>
    
    <Footer />
    </>
  )
}
