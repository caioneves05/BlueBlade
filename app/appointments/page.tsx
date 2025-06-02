"use client"

import { useState } from "react"
import { Plus, Calendar, Clock, User, Scissors, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Dados mockados
const mockAppointments = [
  {
    id: 1,
    client: "Carlos Santos",
    barber: "João Silva",
    date: "2024-01-20",
    time: "14:30",
    service: "Corte + Barba",
    status: "Agendado",
    value: 45,
  },
  {
    id: 2,
    client: "Lucas Ferreira",
    barber: "Rafael Oliveira",
    date: "2024-01-20",
    time: "15:00",
    service: "Corte",
    status: "Agendado",
    value: 25,
  },
  {
    id: 3,
    client: "André Silva",
    barber: "Pedro Costa",
    date: "2024-01-20",
    time: "15:30",
    service: "Corte + Barba",
    status: "Agendado",
    value: 45,
  },
  {
    id: 4,
    client: "Roberto Lima",
    barber: "Bruno Santos",
    date: "2024-01-20",
    time: "16:00",
    service: "Barba",
    status: "Agendado",
    value: 20,
  },
]

const mockClients = ["Carlos Santos", "Lucas Ferreira", "André Silva", "Roberto Lima", "José Costa"]
const mockBarbers = ["João Silva", "Pedro Costa", "Rafael Oliveira", "Bruno Santos"]
const services = [
  { name: "Corte", value: 25 },
  { name: "Barba", value: 20 },
  { name: "Corte + Barba", value: 45 },
  { name: "Corte Social", value: 30 },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [newAppointment, setNewAppointment] = useState({
    client: "",
    barber: "",
    date: "",
    time: "",
    service: "",
    value: 0,
  })

  const handleAddAppointment = () => {
    if (
      newAppointment.client &&
      newAppointment.barber &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.service
    ) {
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        status: "Agendado",
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({
        client: "",
        barber: "",
        date: "",
        time: "",
        service: "",
        value: 0,
      })
    }
  }

  const handleServiceChange = (serviceName: string) => {
    const service = services.find((s) => s.name === serviceName)
    setNewAppointment({
      ...newAppointment,
      service: serviceName,
      value: service ? service.value : 0,
    })
  }

  const updateAppointmentStatus = (id: number, status: string) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendado":
        return "bg-blue-600"
      case "Em andamento":
        return "bg-yellow-600"
      case "Concluído":
        return "bg-green-600"
      case "Cancelado":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  // Agrupar agendamentos por data
  const groupedAppointments = appointments.reduce(
    (groups, appointment) => {
      const date = appointment.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(appointment)
      return groups
    },
    {} as Record<string, typeof appointments>,
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-cobalt-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-cobalt-400">Agendamentos</h1>
              <p className="text-gray-400">Gerencie os horários da barbearia</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-cobalt-600 hover:bg-cobalt-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Novo Agendamento</DialogTitle>
                <DialogDescription className="text-gray-400">Agende um novo atendimento</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client" className="text-white">
                    Cliente
                  </Label>
                  <Select
                    value={newAppointment.client}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, client: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {mockClients.map((client) => (
                        <SelectItem key={client} value={client} className="text-white hover:bg-gray-700">
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="barber" className="text-white">
                    Barbeiro
                  </Label>
                  <Select
                    value={newAppointment.barber}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, barber: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione o barbeiro" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {mockBarbers.map((barber) => (
                        <SelectItem key={barber} value={barber} className="text-white hover:bg-gray-700">
                          {barber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-white">
                      Data
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-white">
                      Hora
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service" className="text-white">
                    Serviço
                  </Label>
                  <Select value={newAppointment.service} onValueChange={handleServiceChange}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {services.map((service) => (
                        <SelectItem key={service.name} value={service.name} className="text-white hover:bg-gray-700">
                          {service.name} - R$ {service.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddAppointment} className="w-full bg-cobalt-600 hover:bg-cobalt-700">
                  Agendar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Appointments by Date */}
        <div className="space-y-8">
          {Object.entries(groupedAppointments).map(([date, dayAppointments]) => (
            <div key={date}>
              <h2 className="text-xl font-semibold text-cobalt-400 mb-4">
                {new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <Card key={appointment.id} className="bg-gray-900 border-gray-800">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-lg">{appointment.client}</CardTitle>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-300">
                            <Clock className="h-4 w-4 mr-2 text-cobalt-400" />
                            {appointment.time}
                          </div>

                          <div className="flex items-center text-gray-300">
                            <Scissors className="h-4 w-4 mr-2 text-cobalt-400" />
                            {appointment.barber}
                          </div>

                          <div className="flex items-center text-gray-300">
                            <User className="h-4 w-4 mr-2 text-cobalt-400" />
                            {appointment.service}
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-green-400 font-semibold">R$ {appointment.value}</span>

                            {appointment.status === "Agendado" && (
                              <div className="space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => updateAppointmentStatus(appointment.id, "Em andamento")}
                                  className="bg-yellow-600 hover:bg-yellow-700"
                                >
                                  Iniciar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, "Cancelado")}
                                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            )}

                            {appointment.status === "Em andamento" && (
                              <Button
                                size="sm"
                                onClick={() => updateAppointmentStatus(appointment.id, "Concluído")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Finalizar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
