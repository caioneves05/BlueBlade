"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, DollarSign, Scissors, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Dados mockados para demonstração
const mockBarbers = [
  { id: 1, name: "João Silva", status: "occupied", currentClient: "Carlos Santos", serviceStartTime: "14:30" },
  { id: 2, name: "Pedro Costa", status: "free", currentClient: null, serviceStartTime: null },
  { id: 3, name: "Rafael Oliveira", status: "occupied", currentClient: "Lucas Ferreira", serviceStartTime: "15:00" },
  { id: 4, name: "Bruno Santos", status: "free", currentClient: null, serviceStartTime: null },
]

const todayAppointments = [
  {
    id: 1,
    client: "Carlos Santos",
    barber: "João Silva",
    time: "14:30",
    service: "Corte + Barba",
    status: "Em andamento",
  },
  {
    id: 2,
    client: "Lucas Ferreira",
    barber: "Rafael Oliveira",
    time: "15:00",
    service: "Corte",
    status: "Em andamento",
  },
  { id: 3, client: "André Silva", barber: "Pedro Costa", time: "15:30", service: "Corte + Barba", status: "Agendado" },
  { id: 4, client: "Roberto Lima", barber: "Bruno Santos", time: "16:00", service: "Barba", status: "Agendado" },
]

const stats = {
  totalClients: 847,
  todayAppointments: 12,
  monthlyRevenue: 15420.5,
  freeBarbers: 2,
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cobalt-400 mb-2">BlueBlade Dashboard</h1>
          <p className="text-gray-400">
            {currentTime.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {currentTime.toLocaleTimeString("pt-BR")}
          </p>
        </div>

         <div className="my-8 grid grid-cols-2 items-center justify-center md:grid-cols-4 gap-4">
          <Link href="/clients">
            <Button className="w-full bg-cobalt-600/30 hover:bg-cobalt-700/60 text-cobalt-300">
              <Users className="h-4 w-4" />
              Clientes
            </Button>
          </Link>
          <Link href="/appointments">
            <Button className="w-full bg-cobalt-600/30 hover:bg-cobalt-700/60 text-cobalt-300">
              <Calendar className="h-4 w-4" />
              Agendamentos
            </Button>
          </Link>
          <Link href="/barbers">
            <Button className="w-full bg-cobalt-600/30 hover:bg-cobalt-700/60 text-cobalt-300">
              <Scissors className="h-4 w-4" />
              Barbeiros
            </Button>
          </Link>
          <Link href="/reports">
            <Button className="w-full bg-cobalt-600/30 hover:bg-cobalt-700/60 text-cobalt-300">
              <TrendingUp className="h-4 w-4" />
              Relatórios
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1items-center justify-center  md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total de Clientes</CardTitle>
              <Users className="h-4 w-4 text-cobalt-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalClients}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Agendamentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-cobalt-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.todayAppointments}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Receita Mensal</CardTitle>
              <DollarSign className="h-4 w-4 text-cobalt-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                R$ {stats.monthlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Barbeiros Livres</CardTitle>
              <Scissors className="h-4 w-4 text-cobalt-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.freeBarbers}/4</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status dos Barbeiros */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Status dos Barbeiros</CardTitle>
              <CardDescription className="text-gray-400">Visualização em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBarbers.map((barber) => (
                  <div key={barber.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cobalt-500 rounded-full flex items-center justify-center">
                        <Scissors className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{barber.name}</p>
                        {barber.status === "occupied" && barber.currentClient && (
                          <p className="text-sm text-gray-400">
                            Atendendo: {barber.currentClient} (desde {barber.serviceStartTime})
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={barber.status === "free" ? "default" : "secondary"}
                      className={
                        barber.status === "free" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {barber.status === "free" ? "Livre" : "Ocupado"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agendamentos de Hoje */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Agendamentos de Hoje</CardTitle>
              <CardDescription className="text-gray-400">Próximos atendimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-cobalt-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{appointment.client}</p>
                        <p className="text-sm text-gray-400">
                          {appointment.time} - {appointment.barber}
                        </p>
                        <p className="text-xs text-gray-500">{appointment.service}</p>
                      </div>
                    </div>
                    <Badge
                      variant={appointment.status === "Em andamento" ? "default" : "secondary"}
                      className={
                        appointment.status === "Em andamento"
                          ? "bg-cobalt-600 hover:bg-cobalt-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
