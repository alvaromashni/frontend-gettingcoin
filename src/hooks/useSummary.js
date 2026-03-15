import { useState, useEffect, useCallback } from 'react'
import { fetchSummary } from '@/services/api'

export function useSummary(currency) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!currency) return
    try {
      setLoading(true)
      setError(null)
      const result = await fetchSummary(currency)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [currency])

  useEffect(() => {
    load()
    const interval = setInterval(load, 60000)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error, refetch: load }
}
