// ============================================================
// Google Apps Script API Service
// All fetch calls to the GAS Web App endpoint
// ============================================================

import type {
  CmsData,
  RegistrationPayload,
  LoginPayload,
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
  const [configResult, hero, event, schedule, rules, faq, announcements, music, categories] =
    await Promise.allSettled([
      gasGet<{ websiteConfig: CmsData['websiteConfig']; seasonConfig: CmsData['seasonConfig'] }>('config'),
      gasGet<CmsData['hero']>('hero'),
      gasGet<CmsData['event']>('event'),
      gasGet<CmsData['schedule']>('schedule'),
      gasGet<CmsData['rules']>('rules'),
      gasGet<CmsData['faq']>('faq'),
      gasGet<CmsData['announcements']>('announcements'),
      gasGet<CmsData['music']>('music'),
      gasGet<CmsData['categories']>('categories'),
    ])

  const partial: Partial<CmsData> = {}

  if (configResult.status === 'fulfilled') {
    partial.websiteConfig = configResult.value.websiteConfig
    partial.seasonConfig = configResult.value.seasonConfig
  }
  if (hero.status === 'fulfilled') partial.hero = hero.value
  if (event.status === 'fulfilled') partial.event = event.value
  if (schedule.status === 'fulfilled') partial.schedule = schedule.value
  if (rules.status === 'fulfilled') partial.rules = rules.value
  if (faq.status === 'fulfilled') partial.faq = faq.value
  if (announcements.status === 'fulfilled') partial.announcements = announcements.value
  if (music.status === 'fulfilled') partial.music = music.value
  if (categories.status === 'fulfilled') partial.categories = categories.value

  return partial
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
