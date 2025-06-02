"use client"

import { useState } from "react"
import { Plus, Search, Phone, Calendar, User, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import Link from "next/link"

// Dados mockados
const mockClients = [
  {
    id: 1,
    name: "Carlos Santos",
    phone: "(11) 99999-1234",
    email: "carlos@email.com",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    history: [
      { date: "2024-01-15", service: "Corte + Barba", barber: "João Silva", value: 45 },
      { date: "2023-12-28", service: "Corte", barber: "Pedro Costa", value: 25 },
      { date: "2023-12-10", service: "Corte + Barba", barber: "João Silva", value: 45 },
    ],
  },
  {
    id: 2,
    name: "Lucas Ferreira",
    phone: "(11) 98888-5678",
    email: "lucas@email.com",
    lastVisit: "2024-01-10",
    totalVisits: 8,
    history: [
      { date: "2024-01-10", service: "Corte", barber: "Rafael Oliveira", value: 25 },
      { date: "2023-12-20", service: "Corte + Barba", barber: "Bruno Santos", value: 45 },
    ],
  },
  {
    id: 3,
    name: "André Silva",
    phone: "(11) 97777-9101",
    email: "andre@email.com",
    lastVisit: "2024-01-05",
    totalVisits: 15,
    history: [
      { date: "2024-01-05", service: "Barba", barber: "Pedro Costa", value: 20 },
      { date: "2023-12-15", service: "Corte + Barba", barber: "João Silva", value: 45 },
    ],
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClient, setSelectedClient] = useState(null)
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const filteredClients = clients.filter(
    (client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm),
  )

  const handleAddClient = () => {
    if (newClient.name && newClient.phone) {
      const client = {
        id: clients.length + 1,
        ...newClient,
        lastVisit: null,
        totalVisits: 0,
        history: [],
      }
      setClients([...clients, client])
      setNewClient({ name: "", phone: "", email: "" })
    }
  }

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
              <h1 className="text-3xl font-bold text-cobalt-400">Clientes</h1>
              <p className="text-gray-400">Gerencie sua base de clientes</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-cobalt-600 hover:bg-cobalt-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">Cadastrar Novo Cliente</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo cliente ao sistema</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <Button onClick={handleAddClient} className="w-full bg-cobalt-600 hover:bg-cobalt-700">
                  Cadastrar Cliente
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar cliente por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="bg-gray-900 border-gray-800 hover:border-cobalt-600 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-cobalt-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{client.name}</CardTitle>
                      <CardDescription className="text-gray-400">{client.email}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-cobalt-400" />
                    {client.phone}
                  </div>

                  {client.lastVisit && (
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-cobalt-400" />
                      Última visita: {new Date(client.lastVisit).toLocaleDateString("pt-BR")}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {client.totalVisits} visitas
                    </Badge>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cobalt-600 text-cobalt-400 hover:bg-cobalt-600 hover:text-white"
                        >
                          Ver Histórico
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">Histórico de {client.name}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Histórico completo de atendimentos
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {client.history.length > 0 ? (
                            client.history.map((visit, index) => (
                              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-white">{visit.service}</p>
                                    <p className="text-sm text-gray-400">Barbeiro: {visit.barber}</p>
                                    <p className="text-sm text-gray-400">
                                      {new Date(visit.date).toLocaleDateString("pt-BR")}
                                    </p>
                                  </div>
                                  <Badge className="bg-green-600">R$ {visit.value}</Badge>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-center py-4">Nenhum atendimento registrado</p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
