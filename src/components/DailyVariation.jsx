import { useState } from 'react'
import { useVariation } from '@/hooks/useVariation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const CURRENCIES = ['BRL', 'EUR', 'GBP']

export function DailyVariation() {
  const [currency, setCurrency] = useState('BRL')
  const { data, loading, error } = useVariation(currency)

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Variação Diária</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Cotação e variação percentual dia a dia
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

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive mb-4">
          Erro: {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            {currency}/USD — Variação dos últimos 7 dias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="animate-pulse space-y-2 p-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Cotação (USD)</TableHead>
                  <TableHead className="text-right">Variação</TableHead>
                  <TableHead className="text-right">Tendência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((row) => {
                  const isPositive = row.variationPercent >= 0
                  return (
                    <TableRow key={row.date} className="transition-colors">
                      <TableCell className="font-medium text-sm">{row.date}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {row.rate.toFixed(4)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-semibold text-sm ${
                            isPositive ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? '+' : ''}{row.variationPercent.toFixed(4)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            isPositive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {isPositive ? '▲ Alta' : '▼ Queda'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
