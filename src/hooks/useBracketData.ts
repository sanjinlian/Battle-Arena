import { useState, useEffect } from 'react'
import type { BracketTournamentData } from '../types/bracket'
import { fetchBracketEnabled, fetchBracketData } from '../services/bracketApi'
import { bracketMockData } from '../data/bracketMockData'

interface UseBracketDataResult {
  data: BracketTournamentData | null
  seasonEnabled: boolean | null // null = still loading
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useBracketData(): UseBracketDataResult {
  const [data, setData] = useState<BracketTournamentData | null>(null)
  const [seasonEnabled, setSeasonEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const gasUrl = import.meta.env.VITE_GAS_URL

    // No GAS URL configured — use mock data directly
    if (!gasUrl) {
      console.warn('[Bracket] VITE_GAS_URL not set — using mock data')
      setSeasonEnabled(bracketMockData.seasonEnabled)
      if (bracketMockData.seasonEnabled) {
        setData(bracketMockData)
      }
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    // Step 1: Check Setting!C13
    fetchBracketEnabled()
      .then((enabled) => {
        setSeasonEnabled(enabled)
        if (!enabled) {
          setLoading(false)
          return
        }
        // Step 2: Only fetch bracket data if season is enabled
        return fetchBracketData()
          .then((bracketData) => {
            setData(bracketData)
          })
      })
      .catch((err) => {
        console.error('[Bracket] Fetch failed, falling back to mock data:', err)
        setError(err.message)
        // Fall back to mock data on error so the page still renders
        setSeasonEnabled(bracketMockData.seasonEnabled)
        if (bracketMockData.seasonEnabled) {
          setData(bracketMockData)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [tick])

  const refetch = () => setTick((t) => t + 1)

  return { data, seasonEnabled, loading, error, refetch }
}
