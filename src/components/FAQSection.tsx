import { useState } from 'react'
import type { FAQ } from '../types/cms'

interface FAQSectionProps {
  faqData: FAQ[]
}

export default function FAQSection({ faqData }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="relative py-24 paper-noise"
      style={{ background: '#0D0D0D' }}
    >
      <div
        className="spray-circle absolute pointer-events-none"
        style={{ width: 450, height: 450, bottom: -100, right: -100, background: 'rgba(27,42,107,0.2)', filter: 'blur(80px)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: '#00C44F',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            常見問題
          </span>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              color: '#F2EDE0',
              letterSpacing: '-0.01em',
            }}
          >
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, i) => {
            const isOpen = openIdx === i
            const accentColors = ['#E63946', '#FFD600', '#1B2A6B', '#00C44F', '#E63946', '#FFD600', '#C9A84C', '#1B2A6B']
            const accent = accentColors[i % accentColors.length]
            const rotations = ['-0.4deg', '0.5deg', '-0.3deg', '0.6deg', '-0.5deg', '0.4deg', '-0.3deg', '0.5deg']

            return (
              <div
                key={i}
                style={{
                  background: isOpen ? '#141414' : '#0F0F0F',
                  border: `1px solid ${isOpen ? accent : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.3s ease',
                  transform: `rotate(${rotations[i]})`,
                  transformOrigin: 'center',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '18px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem',
                      color: accent,
                      paddingTop: 2,
                      minWidth: 28,
                    }}
                  >
                    Q{String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Question */}
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "'Special Elite', cursive",
                      fontSize: '1rem',
                      color: '#F2EDE0',
                      lineHeight: 1.5,
                    }}
                  >
                    {faq.question}
                  </span>

                  {/* Toggle */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isOpen ? accent : 'rgba(255,255,255,0.06)',
                      color: isOpen ? (accent === '#FFD600' ? '#0D0D0D' : '#F2EDE0') : '#F2EDE0',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                  <div
                    style={{
                      padding: '0 20px 18px 64px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.85rem',
                      lineHeight: 1.8,
                      color: 'rgba(242,237,224,0.6)',
                      borderTop: `1px solid rgba(255,255,255,0.05)`,
                      paddingTop: 14,
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
