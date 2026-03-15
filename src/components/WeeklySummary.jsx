import { useState } from 'react'
import { useSummary } from '@/hooks/useSummary'
import { useVariation } from '@/hooks/useVariation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CURRENCIES = ['BRL', 'EUR', 'GBP']

const CURRENCY_COLORS = {
  BRL: '#7c3aed',
  EUR: '#2563eb',
  GBP: '#ea580c',
}

function StatCard({ label, value, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <div className="h-7 w-24 bg-muted rounded" />
      </div>
    )
  }
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value?.toFixed(4) ?? '—'}</p>
    </div>
  )
}

export function WeeklySummary() {
  const [currency, setCurrency] = useState('BRL')
  const { data: summary, loading: loadingSummary, error: errorSummary } = useSummary(currency)
  const { data: variation, loading: loadingVariation } = useVariation(currency)

  const chartColor = CURRENCY_COLORS[currency]

  const chartData = variation?.map((v) => ({
    date: v.date.slice(5),
    rate: v.rate,
  })) ?? []

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resumo Semanal</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Média, mínima e máxima dos últimos 7 dias
          </p>
        </div>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Moeda" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {errorSummary && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive mb-4">
          Erro: {errorSummary}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Período</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSummary ? (
              <div className="animate-pulse h-6 w-40 bg-muted rounded" />
            ) : (
              <p className="text-sm font-medium">
                {summary?.periodStart} → {summary?.periodEnd}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Média" value={summary?.average} loading={loadingSummary} />
              <StatCard label="Mínima" value={summary?.min} loading={loadingSummary} />
              <StatCard label="Máxima" value={summary?.max} loading={loadingSummary} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Evolução — {currency}/USD (7 dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingVariation ? (
            <div className="animate-pulse h-56 bg-muted rounded" />
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={['auto', 'auto']}
                  tickFormatter={(v) => v.toFixed(3)}
                />
                <Tooltip
                  formatter={(v) => [v.toFixed(4), currency]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={{ r: 4, fill: chartColor }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Sem dados disponíveis</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
