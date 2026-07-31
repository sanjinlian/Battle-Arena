import { useState, useEffect } from 'react'
import type { CmsData } from '../types/cms'
import { fetchAllCmsData } from '../services/sheetApi'
import { fallbackData } from '../data/cmsData'

interface UseCmsDataResult {
  data: CmsData
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useCmsData(): UseCmsDataResult {
  const [data, setData] = useState<CmsData>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const gasUrl = import.meta.env.VITE_GAS_URL
    if (!gasUrl) {
      console.warn('[CMS] VITE_GAS_URL not set — using fallback data')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetchAllCmsData()
      .then((partial) => {
        setData((prev) => ({
          ...prev,
          ...partial,
        }))
      })
      .catch((err) => {
        console.error('[CMS] Fetch failed, using fallback data:', err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [tick])

  const refetch = () => setTick((t) => t + 1)

  return { data, loading, error, refetch }
}
