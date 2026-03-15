import { Header } from '@/components/Header'
import { LatestRates } from '@/components/LatestRates'
import { WeeklySummary } from '@/components/WeeklySummary'
import { CurrencyComparison } from '@/components/CurrencyComparison'
import { DailyVariation } from '@/components/DailyVariation'
import { Separator } from '@/components/ui/separator'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <LatestRates />
        <Separator />
        <WeeklySummary />
        <Separator />
        <CurrencyComparison />
        <Separator />
        <DailyVariation />
      </main>
      <footer className="border-t mt-16 py-6">
        <p className="text-center text-xs text-muted-foreground">
          GettingCoin — Dados atualizados a cada 60 segundos
        </p>
      </footer>
    </div>
  )
}
