import type { EventInfo, RegistrationCategory } from '../types/cms'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
}

function daysUntil(dateStr: string) {
  if (!dateStr) return 0
  const now = new Date()
  const target = new Date(dateStr)
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

interface EventSectionProps {
  eventData: EventInfo
  categoriesData: RegistrationCategory[]
  loading: boolean
}

export default function EventSection({ eventData, categoriesData, loading }: EventSectionProps) {
  const deadline = daysUntil(eventData.registerDeadline)
  const eventDays = daysUntil(eventData.date)

  const totalSlots = categoriesData.reduce((sum, c) => sum + c.slots, 0)
  const totalFilled = categoriesData.reduce((sum, c) => sum + c.filled, 0)
  const filledPct = totalSlots > 0 ? Math.round((totalFilled / totalSlots) * 100) : 0

  return (
    <section
      id="event"
      className="relative py-24 paper-noise"
      style={{ background: '#F2EDE0' }}
    >
      {/* Decorative elements */}
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 200, height: 200, top: 40, right: '15%', opacity: 0.8 }}
      />
      <div
        className="spray-circle absolute pointer-events-none"
        style={{ width: 400, height: 400, bottom: -100, left: -100, background: 'rgba(230,57,70,0.06)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-14">
          <div className="section-label" style={{ color: 'rgba(13,13,13,0.2)', flexShrink: 0, marginTop: 4 }}>
            EVENT — INFO
          </div>
          <div>
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
              活動資訊
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
              {loading ? 'Loading...' : eventData.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Main info card */}
          <div
            className="lg:col-span-3 card-tilt-slight relative"
            style={{
              background: '#0D0D0D',
              border: '2px solid #E63946',
              padding: '32px',
              boxShadow: '8px 8px 0 #E63946',
            }}
          >
            {/* Tape */}
            <div
              className="tape absolute"
              style={{ width: 80, height: 18, top: -9, left: 32, transform: 'rotate(-3deg)' }}
            />

            <p
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'rgba(242,237,224,0.85)',
                marginBottom: 28,
              }}
            >
              {eventData.description}
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: '比賽日期', value: formatDate(eventData.date), accent: '#FFD600' },
                { label: '比賽地點', value: eventData.location, accent: '#00C44F' },
                { label: '報名截止', value: formatDate(eventData.registerDeadline), accent: '#E63946' },
                { label: '報名費用', value: eventData.fee ? eventData.fee + ' / 人' : '—', accent: '#C9A84C' },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: item.accent,
                      textTransform: 'uppercase',
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#F2EDE0',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Countdown — deadline */}
            <div
              className="card-tilt-right"
              style={{
                background: '#E63946',
                padding: '24px',
                border: '2px solid #0D0D0D',
                boxShadow: '5px 5px 0 #0D0D0D',
                position: 'relative',
              }}
            >
              <div
                className="tape absolute"
                style={{ width: 70, height: 16, top: -8, right: 24, transform: 'rotate(4deg)', background: 'rgba(0,0,0,0.2)' }}
              />
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(242,237,224,0.7)',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                報名截止倒數
              </div>
              <div
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: '#FFD600',
                  textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                }}
              >
                {deadline > 0 ? deadline : 0}
              </div>
              <div
                style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: '1rem',
                  color: 'rgba(242,237,224,0.8)',
                }}
              >
                天
              </div>
            </div>

            {/* Event countdown */}
            <div
              style={{
                background: '#FFD600',
                padding: '24px',
                border: '2px solid #0D0D0D',
                boxShadow: '5px 5px 0 #0D0D0D',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(13,13,13,0.6)',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                距比賽還有
              </div>
              <div
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: '#0D0D0D',
                }}
              >
                {eventDays > 0 ? eventDays : 0}
              </div>
              <div
                style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: '1rem',
                  color: 'rgba(13,13,13,0.7)',
                }}
              >
                天
              </div>
            </div>

            {/* Capacity */}
            <div
              style={{
                background: '#1B2A6B',
                padding: '24px',
                border: '2px solid #0D0D0D',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(242,237,224,0.5)',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                參賽名額
              </div>
              <div
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '2rem',
                  lineHeight: 1,
                  color: '#F2EDE0',
                  marginBottom: 8,
                }}
              >
                {eventData.maxParticipants} 人
              </div>
              {/* Progress bar — driven by real category data */}
              <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                <div
                  style={{
                    width: `${filledPct}%`,
                    height: '100%',
                    background: '#00C44F',
                    borderRadius: 3,
                    transition: 'width 1s ease',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  color: 'rgba(242,237,224,0.4)',
                  marginTop: 4,
                }}
              >
                已滿 {filledPct}%（{totalFilled} / {totalSlots} 人）
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
