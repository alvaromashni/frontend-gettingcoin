import { useState, useEffect, useCallback } from 'react'
import { fetchComparison } from '@/services/api'

export function useComparison(from, to) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!from || !to) return
    try {
      setLoading(true)
      setError(null)
      const result = await fetchComparison(from, to)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    load()
    const interval = setInterval(load, 60000)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error, refetch: load }
}
