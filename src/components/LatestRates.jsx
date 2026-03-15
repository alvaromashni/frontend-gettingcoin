import { useLatestRates } from '@/hooks/useLatestRates'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const CURRENCY_CONFIG = {
  BRL: { label: 'Real Brasileiro', flag: '🇧🇷', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-100' },
  EUR: { label: 'Euro', flag: '🇪🇺', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
  GBP: { label: 'Libra Esterlina', flag: '🇬🇧', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100' },
}

function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded-full" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 bg-muted rounded mb-2" />
        <div className="h-4 w-20 bg-muted rounded" />
      </CardContent>
    </Card>
  )
}

function RateCard({ item }) {
  const config = CURRENCY_CONFIG[item.currency] || {}
  const variation = item.variationPercent ?? null

  return (
    <Card className={`border-2 transition-all duration-300 hover:shadow-md ${config.bg}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.flag}</span>
            <div>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {item.currency} / USD
              </CardTitle>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </div>
          </div>
          {variation !== null && (
            <Badge
              variant="outline"
              className={`text-xs font-semibold ${
                variation >= 0
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {variation >= 0 ? '▲' : '▼'} {Math.abs(variation).toFixed(2)}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold tracking-tight ${config.color}`}>
          {item.rate.toFixed(4)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Atualizado em {item.date}
        </p>
      </CardContent>
    </Card>
  )
}

export function LatestRates() {
  const { data, loading, error } = useLatestRates()

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Cotações Atuais</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Valores em relação ao dólar americano (USD)
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Erro ao carregar cotações: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : data?.map((item) => <RateCard key={item.currency} item={item} />)}
      </div>
    </section>
  )
}
