"use client"

import { useState } from "react"
import { Plus, Scissors, Star, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

// Dados mockados
const mockBarbers = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 98765-4321",
    specialties: ["Corte Clássico", "Barba", "Bigode"],
    workHours: {
      monday: { start: "08:00", end: "18:00", active: true },
      tuesday: { start: "08:00", end: "18:00", active: true },
      wednesday: { start: "08:00", end: "18:00", active: true },
      thursday: { start: "08:00", end: "18:00", active: true },
      friday: { start: "08:00", end: "18:00", active: true },
      saturday: { start: "08:00", end: "16:00", active: true },
      sunday: { start: "", end: "", active: false },
    },
    commission: 60,
    rating: 4.8,
    totalServices: 324,
  },
  {
    id: 2,
    name: "Pedro Costa",
    phone: "(11) 97654-3210",
    specialties: ["Corte Moderno", "Degradê", "Barba"],
    workHours: {
      monday: { start: "09:00", end: "17:00", active: true },
      tuesday: { start: "09:00", end: "17:00", active: true },
      wednesday: { start: "", end: "", active: false },
      thursday: { start: "09:00", end: "17:00", active: true },
      friday: { start: "09:00", end: "17:00", active: true },
      saturday: { start: "09:00", end: "15:00", active: true },
      sunday: { start: "", end: "", active: false },
    },
    commission: 55,
    rating: 4.6,
    totalServices: 198,
  },
  {
    id: 3,
    name: "Rafael Oliveira",
    phone: "(11) 96543-2109",
    specialties: ["Corte Social", "Barba Completa", "Sobrancelha"],
    workHours: {
      monday: { start: "10:00", end: "19:00", active: true },
      tuesday: { start: "10:00", end: "19:00", active: true },
      wednesday: { start: "10:00", end: "19:00", active: true },
      thursday: { start: "10:00", end: "19:00", active: true },
      friday: { start: "10:00", end: "19:00", active: true },
      saturday: { start: "", end: "", active: false },
      sunday: { start: "10:00", end: "16:00", active: true },
    },
    commission: 65,
    rating: 4.9,
    totalServices: 412,
  },
]

const weekDays = [
  { key: "monday", label: "Segunda" },
  { key: "tuesday", label: "Terça" },
  { key: "wednesday", label: "Quarta" },
  { key: "thursday", label: "Quinta" },
  { key: "friday", label: "Sexta" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
]

export default function BarbersPage() {
  const [barbers, setBarbers] = useState(mockBarbers)
  const [newBarber, setNewBarber] = useState({
    name: "",
    phone: "",
    specialties: "",
    commission: 50,
    workHours: {
      monday: { start: "08:00", end: "18:00", active: true },
      tuesday: { start: "08:00", end: "18:00", active: true },
      wednesday: { start: "08:00", end: "18:00", active: true },
      thursday: { start: "08:00", end: "18:00", active: true },
      friday: { start: "08:00", end: "18:00", active: true },
      saturday: { start: "08:00", end: "16:00", active: true },
      sunday: { start: "", end: "", active: false },
    },
  })

  const handleAddBarber = () => {
    if (newBarber.name && newBarber.phone) {
      const barber = {
        id: barbers.length + 1,
        ...newBarber,
        specialties: newBarber.specialties.split(",").map((s) => s.trim()),
        rating: 0,
        totalServices: 0,
      }
      setBarbers([...barbers, barber])
      setNewBarber({
        name: "",
        phone: "",
        specialties: "",
        commission: 50,
        workHours: {
          monday: { start: "08:00", end: "18:00", active: true },
          tuesday: { start: "08:00", end: "18:00", active: true },
          wednesday: { start: "08:00", end: "18:00", active: true },
          thursday: { start: "08:00", end: "18:00", active: true },
          friday: { start: "08:00", end: "18:00", active: true },
          saturday: { start: "08:00", end: "16:00", active: true },
          sunday: { start: "", end: "", active: false },
        },
      })
    }
  }

  const updateWorkHours = (day: string, field: string, value: any) => {
    setNewBarber({
      ...newBarber,
      workHours: {
        ...newBarber.workHours,
        [day]: {
          ...newBarber.workHours[day],
          [field]: value,
        },
      },
    })
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
              <h1 className="text-3xl font-bold text-cobalt-400">Barbeiros</h1>
              <p className="text-gray-400">Gerencie sua equipe de barbeiros</p>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-cobalt-600 hover:bg-cobalt-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Barbeiro
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Cadastrar Novo Barbeiro</DialogTitle>
                <DialogDescription className="text-gray-400">Adicione um novo barbeiro à equipe</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={newBarber.name}
                    onChange={(e) => setNewBarber({ ...newBarber, name: e.target.value })}
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
                    value={newBarber.phone}
                    onChange={(e) => setNewBarber({ ...newBarber, phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="specialties" className="text-white">
                    Especialidades (separadas por vírgula)
                  </Label>
                  <Textarea
                    id="specialties"
                    value={newBarber.specialties}
                    onChange={(e) => setNewBarber({ ...newBarber, specialties: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Corte, Barba, Degradê..."
                  />
                </div>

                <div>
                  <Label htmlFor="commission" className="text-white">
                    Comissão (%)
                  </Label>
                  <Input
                    id="commission"
                    type="number"
                    min="0"
                    max="100"
                    value={newBarber.commission}
                    onChange={(e) => setNewBarber({ ...newBarber, commission: Number.parseInt(e.target.value) })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">Horários de Trabalho</Label>
                  <div className="space-y-3 mt-2">
                    {weekDays.map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                        <div className="w-20">
                          <span className="text-sm text-gray-300">{label}</span>
                        </div>
                        <Switch
                          checked={newBarber.workHours[key].active}
                          onCheckedChange={(checked) => updateWorkHours(key, "active", checked)}
                        />
                        {newBarber.workHours[key].active && (
                          <div className="flex space-x-2">
                            <Input
                              type="time"
                              value={newBarber.workHours[key].start}
                              onChange={(e) => updateWorkHours(key, "start", e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white w-24"
                            />
                            <span className="text-gray-400 self-center">às</span>
                            <Input
                              type="time"
                              value={newBarber.workHours[key].end}
                              onChange={(e) => updateWorkHours(key, "end", e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white w-24"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleAddBarber} className="w-full bg-cobalt-600 hover:bg-cobalt-700">
                  Cadastrar Barbeiro
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbers.map((barber) => (
            <Card key={barber.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-cobalt-500 rounded-full flex items-center justify-center">
                      <Scissors className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{barber.name}</CardTitle>
                      <CardDescription className="text-gray-400">{barber.phone}</CardDescription>
                    </div>
                  </div>
                  {barber.rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-medium">{barber.rating}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Especialidades */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-1">
                      {barber.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Horários */}
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Horários de trabalho:</p>
                    <div className="space-y-1">
                      {weekDays.map(({ key, label }) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-gray-400">{label}:</span>
                          <span className="text-gray-300">
                            {barber.workHours[key].active
                              ? `${barber.workHours[key].start} - ${barber.workHours[key].end}`
                              : "Folga"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Comissão</p>
                      <p className="text-sm font-medium text-cobalt-400">{barber.commission}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Atendimentos</p>
                      <p className="text-sm font-medium text-green-400">{barber.totalServices}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {barbers.length === 0 && (
          <div className="text-center py-12">
            <Scissors className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum barbeiro cadastrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
