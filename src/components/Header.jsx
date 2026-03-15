import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

function useApiStatus() {
  const [online, setOnline] = useState(null)

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/api/rates/latest')
        setOnline(res.ok)
      } catch {
        setOnline(false)
      }
    }
    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [])

  return online
}

export function Header() {
  const online = useApiStatus()
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                GettingCoin
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Cotações em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block capitalize">
              {today}
            </span>
            <Separator orientation="vertical" className="h-5 hidden md:block" />
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  online === null
                    ? 'bg-yellow-400 animate-pulse'
                    : online
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              />
              <Badge
                variant={online === null ? 'outline' : online ? 'default' : 'destructive'}
                className={`text-xs ${
                  online === true
                    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-emerald-500/20'
                    : ''
                }`}
              >
                {online === null ? 'Verificando...' : online ? 'API Online' : 'API Offline'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
