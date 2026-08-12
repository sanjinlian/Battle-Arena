// ============================================================
// Google Apps Script API Service
// All fetch calls to the GAS Web App endpoint
// ============================================================

import type {
  CmsData,
  RegistrationPayload,
  LoginPayload,
  PaymentConfig,
  PaymentStatus,
  BracketItem,
} from '../types/cms'

const GAS_URL = import.meta.env.VITE_GAS_URL as string

async function gasGet<T>(action: string): Promise<T> {
  const res = await fetch(`${GAS_URL}?action=${action}`)
  if (!res.ok) throw new Error(`GAS fetch failed: ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data as T
}

async function gasPost<T>(action: string, payload: object): Promise<T> {
  const res = await fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
  })
  if (!res.ok) throw new Error(`GAS post failed: ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data as T
}

// ── GET endpoints ─────────────────────────────────────────────

export async function fetchAllCmsData(): Promise<Partial<CmsData>> {
  // 透過單一請求 'getAllData' 取回所有 CMS 資料，大幅降低連線延遲
  try {
    const allData = await gasGet<Partial<CmsData>>('getAllData')
    return allData
  } catch (err) {
    console.error('Failed to fetch all data via getAllData, falling back to empty object:', err)
    return {}
  }
}

// ── POST endpoints ────────────────────────────────────────────

export interface RegistrationStats {
  total: number
  groupA: number
  groupB: number
  maxSlots: number
}

export async function fetchRegistrationStats(): Promise<RegistrationStats> {
  return gasGet<RegistrationStats>('stats')
}

export async function postRegistration(
  payload: RegistrationPayload
): Promise<{ success: boolean; registrationId?: string; group?: string; groupLabel?: string; totalRegistered?: number; message?: string }> {
  return gasPost('register', payload)
}

export async function postLogin(
  payload: LoginPayload
): Promise<{ success: boolean; name: string; email: string; isNew: boolean }> {
  return gasPost('login', payload)
}

export interface MyRegistration {
  found: boolean
  registrationId?: string
  name?: string
  email?: string
  phone?: string
  group?: string
  groupLabel?: string
  status?: string
  paymentStatus?: PaymentStatus
  registerDate?: string
  notes?: string
}

export async function fetchMyRegistration(email: string): Promise<MyRegistration> {
  const res = await fetch(`${GAS_URL}?action=myRegistration&email=${encodeURIComponent(email)}`)
  if (!res.ok) throw new Error(`GAS fetch failed: ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data as MyRegistration
}
