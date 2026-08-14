// ============================================================
// Bracket API Service
// Two-step fetch: 1) check Setting!C13 gate, 2) fetch bracket data
// ============================================================

import type { BracketTournamentData } from '../types/bracket'

const GAS_URL = import.meta.env.VITE_GAS_URL as string

async function gasGet<T>(action: string): Promise<T> {
  const res = await fetch(`${GAS_URL}?action=${action}`)
  if (!res.ok) throw new Error(`GAS fetch failed: ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data as T
}

/**
 * Step 1: Check Setting!C13
 * Returns true if the season bracket is enabled
 */
export async function fetchBracketEnabled(): Promise<boolean> {
  const result = await gasGet<{ enabled: boolean }>('bracketEnabled')
  return result.enabled
}

/**
 * Step 2: Fetch full bracket tournament data from bracket sheet
 * Only call this after fetchBracketEnabled() returns true
 */
export async function fetchBracketData(): Promise<BracketTournamentData> {
  return gasGet<BracketTournamentData>('bracketData')
}
