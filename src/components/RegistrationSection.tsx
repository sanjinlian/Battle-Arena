import { useState } from 'react'
import type { RegistrationCategory, Rule, WebsiteConfig } from '../types/cms'

interface RegistrationSectionProps {
  onRegisterClick: () => void
  isLoggedIn: boolean
  categoriesData: RegistrationCategory[]
  rulesData: Rule[]
  websiteConfig: WebsiteConfig
}

export default function RegistrationSection({ onRegisterClick, isLoggedIn, categoriesData, rulesData, websiteConfig }: RegistrationSectionProps) {
  const [rulesOpen, setRulesOpen] = useState<number | null>(null)

  return (
    <section
      id="register"
      className="relative py-24 paper-noise"
      style={{ background: '#F2EDE0' }}
    >
      {/* Decorative */}
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 160, height: 160, bottom: '20%', right: '5%', opacity: 0.6 }}
      />
      <div
        className="spray-circle absolute pointer-events-none"
        style={{ width: 350, height: 350, top: -80, left: -80, background: 'rgba(0,196,79,0.07)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: '#E63946',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            報名
          </span>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              color: '#0D0D0D',
              letterSpacing: '-0.01em',
            }}
          >
            Registration
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Categories */}
          <div className="space-y-5">
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.1em',
                color: '#0D0D0D',
                marginBottom: 16,
                textTransform: 'uppercase',
              }}
            >
              選擇組別
            </div>

            {categoriesData.map((cat, i) => {
              const filled = (cat.filled / cat.slots) * 100
              const isFull = cat.filled >= cat.slots
              const borderColors = ['#E63946', '#1B2A6B']

              return (
                <div
                  key={cat.id}
                  className={`relative ${i === 0 ? 'card-tilt-left' : 'card-tilt-right'} transition-transform duration-200 hover:rotate-0 hover:scale-[1.01]`}
                  style={{
                    background: '#0D0D0D',
                    border: `2px solid ${borderColors[i]}`,
                    padding: '24px',
                    boxShadow: `5px 5px 0 ${borderColors[i]}`,
                  }}
                >
                  {/* Tape */}
                  <div
                    className="tape absolute"
                    style={{ width: 60, height: 16, top: -8, left: 24, transform: 'rotate(2deg)', background: `${borderColors[i]}80` }}
                  />

                  <div className="flex items-start justify-between mb-3">
                    <h3
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '1.2rem',
                        color: '#F2EDE0',
                      }}
                    >
                      {cat.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: borderColors[i],
                        border: `1px solid ${borderColors[i]}`,
                        padding: '3px 8px',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {cat.fee}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.82rem',
                      color: 'rgba(242,237,224,0.6)',
                      marginBottom: 12,
                      lineHeight: 1.6,
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(242,237,224,0.4)',
                      letterSpacing: '0.1em',
                      marginBottom: 8,
                    }}
                  >
                    年齡：{cat.ageRange} ／ 名額：{cat.slots} 人
                  </div>

                  {/* Capacity bar */}
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', marginBottom: 4 }}>
                    <div
                      style={{
                        width: `${filled}%`,
                        height: '100%',
                        background: isFull ? '#E63946' : '#00C44F',
                        transition: 'width 1s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.55rem',
                      color: isFull ? '#E63946' : 'rgba(242,237,224,0.3)',
                    }}
                  >
                    {isFull ? '名額已滿' : `剩餘 ${cat.slots - cat.filled} 席`}
                  </div>
                </div>
              )
            })}

            {/* Register CTA */}
            <div className="pt-4">
              {websiteConfig.registrationOpen ? (
                <button
                  onClick={onRegisterClick}
                  className="btn-sticker w-full"
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '1.05rem',
                    letterSpacing: '0.12em',
                    color: '#0D0D0D',
                    background: '#FFD600',
                    border: '3px solid #0D0D0D',
                    padding: '16px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    boxShadow: '5px 5px 0 #E63946',
                    display: 'block',
                  }}
                >
                  {isLoggedIn ? '前往報名' : '登入以報名'}
                </button>
              ) : (
                <div
                  className="stamp w-full text-center"
                  style={{ color: '#E63946', borderColor: '#E63946', fontSize: '1rem', padding: '12px' }}
                >
                  報名已截止
                </div>
              )}
            </div>
          </div>

          {/* Right: Rules */}
          <div>
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.1em',
                color: '#0D0D0D',
                marginBottom: 16,
                textTransform: 'uppercase',
              }}
            >
              比賽規則
            </div>

            <div
              style={{
                background: '#0D0D0D',
                border: '2px solid #0D0D0D',
                padding: '8px',
                transform: 'rotate(0.5deg)',
              }}
            >
              {rulesData.map((rule) => (
                <div
                  key={rule.order}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <button
                    onClick={() => setRulesOpen(rulesOpen === rule.order ? null : rule.order)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: '#E63946',
                        minWidth: 28,
                      }}
                    >
                      {String(rule.order).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '0.88rem',
                        color: '#F2EDE0',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {rule.title}
                    </span>
                    <span
                      style={{
                        color: '#FFD600',
                        fontSize: '1.1rem',
                        transition: 'transform 0.3s ease',
                        transform: rulesOpen === rule.order ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div className={`accordion-content ${rulesOpen === rule.order ? 'open' : ''}`}>
                    <div
                      style={{
                        padding: '0 16px 14px 56px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        lineHeight: 1.7,
                        color: 'rgba(242,237,224,0.55)',
                      }}
                    >
                      {rule.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flow diagram */}
            <div
              className="mt-6 card-tilt-right"
              style={{
                background: '#1B2A6B',
                border: '2px solid #3D5BCC',
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#3D5BCC',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                報名流程
              </div>
              {['登入帳號', '閱讀規則', '選擇組別', '填寫資料', '送出確認', '收到 Email'].map((step, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#E63946',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.55rem',
                      color: '#F2EDE0',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.82rem',
                      color: 'rgba(242,237,224,0.75)',
                    }}
                  >
                    {step}
                  </span>
                  {i < 5 && (
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>→</span>
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
