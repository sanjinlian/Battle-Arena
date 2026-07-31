import type { ScheduleItem, EventInfo } from '../types/cms'

const TYPE_COLORS = {
  ceremony: { bg: '#1B2A6B', text: '#F2EDE0', dot: '#3D5BCC' },
  battle: { bg: '#E63946', text: '#F2EDE0', dot: '#FF6B74' },
  break: { bg: '#00C44F', text: '#0D0D0D', dot: '#00E55A' },
  special: { bg: '#FFD600', text: '#0D0D0D', dot: '#FFE94D' },
}

const TYPE_LABELS = {
  ceremony: '儀式',
  battle: '比賽',
  break: '休息',
  special: '決賽',
}

interface ScheduleSectionProps {
  scheduleData: ScheduleItem[]
  eventData: EventInfo
}

export default function ScheduleSection({ scheduleData, eventData }: ScheduleSectionProps) {
  return (
    <section
      id="schedule"
      className="relative py-24 paper-noise"
      style={{ background: '#0D0D0D' }}
    >
      {/* Decorative */}
      <div
        className="spray-circle absolute pointer-events-none"
        style={{ width: 500, height: 500, top: -100, right: -100, background: 'rgba(255,214,0,0.06)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: '#FFD600',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 8,
            }}
          >
            賽程
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
            Schedule
          </h2>
          <div
            style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: '1rem',
              color: 'rgba(242,237,224,0.35)',
              marginTop: 4,
            }}
          >
            {eventData.date ? new Date(eventData.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 64,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #E63946, #FFD600, #1B2A6B)',
              opacity: 0.4,
            }}
          />

          <div className="space-y-4">
            {scheduleData.map((item, i) => {
              const colors = TYPE_COLORS[item.type]
              const rotations = ['-0.8deg', '0.6deg', '-0.4deg', '0.9deg', '-0.6deg', '0.3deg']
              const rot = rotations[i % rotations.length]

              return (
                <div
                  key={i}
                  className="flex items-start gap-4 group"
                  style={{ paddingLeft: 16 }}
                >
                  {/* Time */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 80,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: colors.dot,
                      paddingTop: 18,
                      textAlign: 'right',
                    }}
                  >
                    {item.time}
                  </div>

                  {/* Dot on timeline */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: colors.dot,
                      marginTop: 20,
                      zIndex: 2,
                      boxShadow: `0 0 10px ${colors.dot}60`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="flex-1 transition-transform duration-200 group-hover:scale-[1.01] group-hover:rotate-0"
                    style={{
                      background: colors.bg,
                      border: `1px solid ${colors.dot}40`,
                      padding: '14px 20px',
                      transform: `rotate(${rot})`,
                      position: 'relative',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          style={{
                            fontFamily: "'Archivo Black', sans-serif",
                            fontSize: '1rem',
                            color: colors.text,
                            marginBottom: 3,
                          }}
                        >
                          {item.event}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.8rem',
                            color: item.type === 'battle' || item.type === 'ceremony'
                              ? 'rgba(242,237,224,0.6)'
                              : 'rgba(13,13,13,0.6)',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          fontFamily: "'Space Mono', monospace",
                          fontSize: '0.55rem',
                          letterSpacing: '0.1em',
                          color: item.type === 'battle' || item.type === 'ceremony'
                            ? 'rgba(242,237,224,0.5)'
                            : 'rgba(13,13,13,0.4)',
                          textTransform: 'uppercase',
                          border: `1px solid currentColor`,
                          padding: '2px 6px',
                        }}
                      >
                        {TYPE_LABELS[item.type]}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
