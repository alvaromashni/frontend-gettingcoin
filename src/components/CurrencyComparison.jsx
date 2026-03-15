import { useState } from 'react'
import { useComparison } from '@/hooks/useComparison'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const CURRENCIES = ['BRL', 'EUR', 'GBP']

const CURRENCY_COLORS = {
  BRL: '#7c3aed',
  EUR: '#2563eb',
  GBP: '#ea580c',
}

export function CurrencyComparison() {
  const [from, setFrom] = useState('EUR')
  const [to, setTo] = useState('BRL')
  const { data, loading, error } = useComparison(from, to)

  const chartData = data?.map((d) => ({
    date: d.date.slice(5),
    [d.fromCurrency]: d.fromRate,
    [d.toCurrency]: d.toRate,
  })) ?? []

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Comparação entre Moedas</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Cotações lado a lado nos últimos 7 dias
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="De" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.filter((c) => c !== to).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground text-sm font-medium">vs</span>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Para" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.filter((c) => c !== from).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive mb-4">
          Erro: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Gráfico Comparativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse h-56 bg-muted rounded" />
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="from" orientation="left" tick={{ fontSize: 12 }} tickFormatter={(v) => v.toFixed(3)} />
                  <YAxis yAxisId="to" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => v.toFixed(3)} />
                  <Tooltip
                    formatter={(v, name) => [v.toFixed(4), name]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line
                    yAxisId="from"
                    type="monotone"
                    dataKey={from}
                    stroke={CURRENCY_COLORS[from]}
                    strokeWidth={2}
                    dot={{ r: 4, fill: CURRENCY_COLORS[from] }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="to"
                    type="monotone"
                    dataKey={to}
                    stroke={CURRENCY_COLORS[to]}
                    strokeWidth={2}
                    dot={{ r: 4, fill: CURRENCY_COLORS[to] }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Sem dados disponíveis</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Tabela de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="animate-pulse space-y-2 p-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-8 bg-muted rounded" />
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right" style={{ color: CURRENCY_COLORS[from] }}>{from}</TableHead>
                    <TableHead className="text-right" style={{ color: CURRENCY_COLORS[to] }}>{to}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell className="text-sm">{row.date}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{row.fromRate.toFixed(4)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{row.toRate.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
