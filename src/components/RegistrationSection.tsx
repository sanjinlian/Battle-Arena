import { useState, useEffect } from 'react'
import type { Rule, WebsiteConfig, EventInfo, BracketItem } from '../types/cms'
import { fetchRegistrationStats, type RegistrationStats } from '../services/sheetApi'

interface RegistrationSectionProps {
  onRegisterClick: () => void
  isLoggedIn: boolean
  rulesData: Rule[]
  websiteConfig: WebsiteConfig
  eventData: EventInfo
  bracketData: BracketItem[]
}

export default function RegistrationSection({ onRegisterClick, isLoggedIn, rulesData, websiteConfig, eventData, bracketData }: RegistrationSectionProps) {
  const [rulesOpen, setRulesOpen] = useState<number | null>(null)
  const [stats, setStats] = useState<RegistrationStats | null>(null)

  useEffect(() => {
    const gasUrl = import.meta.env.VITE_GAS_URL
    if (!gasUrl) return
    fetchRegistrationStats()
      .then(setStats)
      .catch(() => null)
  }, [])

  const totalSlots = stats?.maxSlots ?? eventData.maxParticipants ?? 32
  const totalFilled = stats?.total ?? 0
  const filledPct = Math.min(Math.round((totalFilled / totalSlots) * 100), 100)
  const isFull = totalFilled >= totalSlots
  const regOpen = websiteConfig.registrationOpen && !isFull

  return (
    <section
      id="register"
      className="relative py-24 paper-noise"
      style={{ background: '#F2EDE0' }}
    >
      <div
        className="spray-circle absolute pointer-events-none"
        style={{ width: 600, height: 600, top: -200, right: -200, background: 'rgba(230,57,70,0.05)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-6 mb-14">
          <div className="section-label" style={{ color: 'rgba(13,13,13,0.2)', flexShrink: 0, marginTop: 4 }}>
            REGISTER — NOW
          </div>
          <div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#E63946', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              立即報名
            </span>
            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, color: '#0D0D0D', letterSpacing: '-0.01em' }}>
              加入戰場
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Bracket */}
          <div className="lg:col-span-3">
            {/* Title */}
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(13,13,13,0.4)', textTransform: 'uppercase', marginBottom: 16 }}>
              賽制結構
            </div>

            <div className="space-y-3 mb-8">
              {bracketData.map((row, i) => (
                <div
                  key={row.stage}
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: 0,
                    border: '2px solid #0D0D0D',
                    background: i === bracketData.length - 1 ? '#0D0D0D' : 'white',
                    boxShadow: i === bracketData.length - 1 ? '5px 5px 0 #E63946' : '3px 3px 0 rgba(13,13,13,0.15)',
                    transform: `rotate(${['-0.5deg', '0.4deg', '-0.3deg', '0.2deg'][i % 4]})`,
                  }}
                >
                  {/* Stage color bar */}
                  <div style={{ width: 6, background: row.color, flexShrink: 0 }} />

                  {/* Content */}
                  <div style={{ flex: 1, padding: '14px 16px' }}>
                    <div className="flex items-center justify-between flex-wrap gap-2" style={{ marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1rem', color: i === bracketData.length - 1 ? '#F2EDE0' : '#0D0D0D' }}>
                        {row.stage}
                      </span>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: row.color, border: `1px solid ${row.color}`, padding: '2px 8px' }}>
                          {row.matches}
                        </span>
                        {row.active && (
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: '#E63946', background: 'rgba(230,57,70,0.1)', padding: '2px 6px', textTransform: 'uppercase' }}>
                            A+B盤
                          </span>
                        )}
                        {!row.active && (
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: '#00C44F', background: 'rgba(0,196,79,0.1)', padding: '2px 6px', textTransform: 'uppercase' }}>
                            A盤
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: i === bracketData.length - 1 ? '#FFD600' : '#0D0D0D', marginBottom: 2 }}>
                      {row.desc}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: i === bracketData.length - 1 ? 'rgba(242,237,224,0.5)' : 'rgba(13,13,13,0.45)', lineHeight: 1.4 }}>
                      {row.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.45)', lineHeight: 1.7, padding: '12px 16px', borderLeft: '3px solid #FFD600' }}>
              ✦ 報名完成後系統自動抽籤分配 A盤 或 B盤，結果即時顯示並以 Email 通知。
              4強起所有選手統一在 A盤（一般盤）對決，確保決賽立足點完全平等。
            </div>
          </div>

          {/* Right — CTA + Stats + Rules */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Slot counter */}
            <div
              style={{
                background: '#0D0D0D',
                border: '2px solid #E63946',
                padding: '24px',
                boxShadow: '6px 6px 0 #E63946',
                position: 'relative',
              }}
            >
              <div className="tape absolute" style={{ width: 80, height: 18, top: -9, left: 24, transform: 'rotate(-2deg)' }} />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>
                參賽名額
              </div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2.5rem', lineHeight: 1, color: '#F2EDE0', marginBottom: 10 }}>
                {totalFilled} <span style={{ fontSize: '1rem', color: 'rgba(242,237,224,0.4)' }}>/ {totalSlots}</span>
              </div>
              {/* A / B split */}
              {stats && (
                <div className="flex gap-3 mb-10" style={{ marginBottom: 10 }}>
                  {[{ label: 'A盤', count: stats.groupA, color: '#E63946' }, { label: 'B盤', count: stats.groupB, color: '#3D5BCC' }].map((g) => (
                    <div key={g.label} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${g.color}30` }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: g.color, letterSpacing: '0.15em' }}>{g.label}</div>
                      <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.2rem', color: '#F2EDE0' }}>{g.count}</div>
                    </div>
                  ))}
                </div>
              )}
              {/* Progress bar */}
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, marginTop: 4 }}>
                <div style={{ width: `${filledPct}%`, height: '100%', background: isFull ? '#FFD600' : '#00C44F', borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(242,237,224,0.35)', marginTop: 4 }}>
                {isFull ? '名額已滿' : `已滿 ${filledPct}%，剩 ${totalSlots - totalFilled} 席`}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onRegisterClick}
              disabled={!regOpen}
              className="btn-sticker"
              style={{
                width: '100%',
                padding: '20px',
                background: regOpen ? '#E63946' : '#ccc',
                color: '#F2EDE0',
                border: '3px solid #0D0D0D',
                cursor: regOpen ? 'pointer' : 'not-allowed',
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1.1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: regOpen ? '6px 6px 0 #0D0D0D' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {!websiteConfig.registrationOpen
                ? '報名尚未開放'
                : isFull
                ? '名額已滿'
                : isLoggedIn
                ? '立即報名 & 抽籤'
                : '登入並報名'}
            </button>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(13,13,13,0.4)', textAlign: 'center' }}>
              報名後系統自動抽籤分配盤別
            </div>

            {/* Rules accordion */}
            <div
              style={{
                background: '#0D0D0D',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '20px',
                transform: 'rotate(0.5deg)',
              }}
            >
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.35)', textTransform: 'uppercase', marginBottom: 12 }}>
                比賽規則
              </div>
              {rulesData.map((rule) => (
                <div
                  key={rule.order}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <button
                    onClick={() => setRulesOpen(rulesOpen === rule.order ? null : rule.order)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: '#E63946', minWidth: 20 }}>
                        {String(rule.order).padStart(2, '0')}
                      </span>
                      <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.78rem', color: '#F2EDE0' }}>
                        {rule.title}
                      </span>
                    </div>
                    <span style={{ color: 'rgba(242,237,224,0.4)', fontSize: '0.75rem', flexShrink: 0, marginLeft: 8 }}>
                      {rulesOpen === rule.order ? '−' : '+'}
                    </span>
                  </button>
                  {rulesOpen === rule.order && (
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(242,237,224,0.55)', lineHeight: 1.6, paddingBottom: 10, paddingLeft: 30 }}>
                      {rule.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
