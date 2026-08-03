// ============================================================
// CMS Type Definitions
// Mirrors the Google Sheets structure
// ============================================================

export interface WebsiteConfig {
  websiteName: string
  theme: string
  currentSeason: string
  registrationOpen: boolean
  enableLoading: boolean
  enableMusic: boolean
  enableHero: boolean
  maintenance: boolean
}

export interface SeasonConfig {
  season: string
  theme: string
  logo: string
  background: string
  music: string
}

export interface HeroPrize {
  enable: boolean
  order: number
  type: 'rank' | 'participation' | 'bonus'
  heroName: string
  beybladeImage: string
  prizeImage: string
  prizeName: string
  description: string
  color: string
  accentColor: string
  buttonLink: string
}

export interface EventInfo {
  title: string
  date: string
  location: string
  description: string
  registerDeadline: string
  maxParticipants: number
  fee: string
}

export interface ScheduleItem {
  time: string
  event: string
  description: string
  type: 'ceremony' | 'battle' | 'break' | 'special'
}

export interface Rule {
  order: number
  title: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Announcement {
  enable: boolean
  date: string
  title: string
  content: string
  type: 'info' | 'warning' | 'event'
}

export interface MusicTrack {
  enable: boolean
  name: string
  url: string
}

export interface RegistrationCategory {
  id: string
  name: string
  description: string
  ageRange: string
  fee: string
  slots: number
  filled: number
}

export interface CmsData {
  websiteConfig: WebsiteConfig
  seasonConfig: SeasonConfig
  hero: HeroPrize[]
  event: EventInfo
  schedule: ScheduleItem[]
  rules: Rule[]
  faq: FAQ[]
  announcements: Announcement[]
  music: MusicTrack[]
  categories: RegistrationCategory[]
}

export interface RegistrationPayload {
  email: string
  name: string
  phone: string
  category: string
  notes?: string
}

export interface LoginPayload {
  email: string
  name: string
  googleToken?: string
}
