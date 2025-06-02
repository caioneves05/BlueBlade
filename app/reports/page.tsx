"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, Users, ArrowLeft, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import Link from "next/link"

// Dados mockados para relatórios
const monthlyRevenue = [
  { month: "Jan", revenue: 12500, expenses: 8000 },
  { month: "Fev", revenue: 14200, expenses: 8500 },
  { month: "Mar", revenue: 15800, expenses: 9000 },
  { month: "Abr", revenue: 13900, expenses: 8200 },
  { month: "Mai", revenue: 16500, expenses: 9500 },
  { month: "Jun", revenue: 18200, expenses: 10000 },
]

const dailyServices = [
  { day: "Seg", services: 15, revenue: 675 },
  { day: "Ter", services: 18, revenue: 810 },
  { day: "Qua", services: 12, revenue: 540 },
  { day: "Qui", services: 22, revenue: 990 },
  { day: "Sex", services: 28, revenue: 1260 },
  { day: "Sáb", services: 35, revenue: 1575 },
  { day: "Dom", services: 8, revenue: 360 },
]

const barberPerformance = [
  { name: "João Silva", services: 124, revenue: 5580, commission: 3348 },
  { name: "Pedro Costa", services: 98, revenue: 4410, commission: 2425.5 },
  { name: "Rafael Oliveira", services: 142, revenue: 6390, commission: 4153.5 },
  { name: "Bruno Santos", services: 87, revenue: 3915, commission: 2348.5 },
]

const serviceDistribution = [
  { name: "Corte", value: 45, color: "#0047AB" },
  { name: "Barba", value: 25, color: "#1E5F8B" },
  { name: "Corte + Barba", value: 25, color: "#3B82F6" },
  { name: "Outros", value: 5, color: "#60A5FA" },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalExpenses = monthlyRevenue.reduce((acc, curr) => acc + curr.expenses, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1)

  const totalCommissions = barberPerformance.reduce((acc, curr) => acc + curr.commission, 0)
  const barbershopProfit = totalRevenue - totalCommissions

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
              <h1 className="text-3xl font-bold text-cobalt-400">Relatórios Financeiros</h1>
              <p className="text-gray-400">Análise de desempenho e lucros</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="daily" className="text-white hover:bg-gray-800">
                  Diário
                </SelectItem>
                <SelectItem value="monthly" className="text-white hover:bg-gray-800">
                  Mensal
                </SelectItem>
                <SelectItem value="yearly" className="text-white hover:bg-gray-800">
                  Anual
                </SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-cobalt-600 hover:bg-cobalt-700">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">R$ {totalRevenue.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-gray-400 mt-1">Últimos 6 meses</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Lucro Líquido</CardTitle>
              <TrendingUp className="h-4 w-4 text-cobalt-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cobalt-400">R$ {netProfit.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-gray-400 mt-1">Margem: {profitMargin}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Lucro Barbearia</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">R$ {barbershopProfit.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-gray-400 mt-1">Após comissões</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Comissões</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">R$ {totalCommissions.toLocaleString("pt-BR")}</div>
              <p className="text-xs text-gray-400 mt-1">Para barbeiros</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Receita Mensal */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Receita vs Gastos</CardTitle>
              <CardDescription className="text-gray-400">Comparativo mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#0047AB" name="Receita" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Gastos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Serviços Diários */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Atendimentos por Dia</CardTitle>
              <CardDescription className="text-gray-400">Última semana</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyServices}>
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Line type="monotone" dataKey="services" stroke="#0047AB" strokeWidth={2} name="Atendimentos" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance dos Barbeiros */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Desempenho dos Barbeiros</CardTitle>
              <CardDescription className="text-gray-400">Atendimentos e comissões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {barberPerformance.map((barber, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{barber.name}</h4>
                      <Badge className="bg-cobalt-600">{barber.services} atendimentos</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Receita Gerada</p>
                        <p className="text-green-400 font-medium">R$ {barber.revenue.toLocaleString("pt-BR")}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Comissão</p>
                        <p className="text-yellow-400 font-medium">R$ {barber.commission.toLocaleString("pt-BR")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribuição de Serviços */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-cobalt-400">Distribuição de Serviços</CardTitle>
              <CardDescription className="text-gray-400">Tipos de atendimento mais populares</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Financeiro */}
        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="text-cobalt-400">Resumo Financeiro Detalhado</CardTitle>
            <CardDescription className="text-gray-400">Análise completa de receitas e lucros</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-white">Receitas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Receita Bruta:</span>
                    <span className="text-green-400">R$ {totalRevenue.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gastos Operacionais:</span>
                    <span className="text-red-400">R$ {totalExpenses.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comissões Pagas:</span>
                    <span className="text-yellow-400">R$ {totalCommissions.toLocaleString("pt-BR")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Lucros</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lucro da Barbearia:</span>
                    <span className="text-cobalt-400">R$ {barbershopProfit.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Margem de Lucro:</span>
                    <span className="text-cobalt-400">{profitMargin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI Mensal:</span>
                    <span className="text-green-400">15.2%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Metas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Meta Mensal:</span>
                    <span className="text-gray-300">R$ 20.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progresso:</span>
                    <span className="text-green-400">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Projeção Anual:</span>
                    <span className="text-cobalt-400">R$ 218.400</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
