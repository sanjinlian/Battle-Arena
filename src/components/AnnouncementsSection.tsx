import type { Announcement } from '../types/cms'

const TYPE_CONFIG = {
  event: { color: '#FFD600', textColor: '#0D0D0D', label: '活動' },
  info: { color: '#1B2A6B', textColor: '#F2EDE0', label: '通知' },
  warning: { color: '#E63946', textColor: '#F2EDE0', label: '注意' },
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' })
}

interface AnnouncementsSectionProps {
  announcementsData: Announcement[]
}

export default function AnnouncementsSection({ announcementsData }: AnnouncementsSectionProps) {
  const active = announcementsData.filter((a) => a.enable)

  return (
    <section
      id="announcements"
      className="relative py-24 paper-noise"
      style={{ background: '#F2EDE0' }}
    >
      {/* Coffee stain decorations */}
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 220, height: 220, top: '10%', left: '3%', opacity: 0.7 }}
      />
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 140, height: 140, bottom: '15%', right: '8%', opacity: 0.5 }}
      />

      {/* Newspaper texture strip */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #0D0D0D 0px, #0D0D0D 3px, transparent 3px, transparent 8px)' }}
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
            最新公告
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
            Announcements
          </h2>
        </div>

        {/* Grid — collage style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {active.map((ann, i) => {
            const cfg = TYPE_CONFIG[ann.type]
            const rotations = ['-2deg', '1.5deg', '-1deg', '2.5deg']
            const scales = [1, 0.97, 1.02, 0.99]
            const rot = rotations[i % rotations.length]
            const tapeAngles = ['rotate(-3deg)', 'rotate(4deg)', 'rotate(-2deg)', 'rotate(5deg)']

            return (
              <div
                key={i}
                className="relative group hover:scale-105 transition-transform duration-200 cursor-pointer"
                style={{
                  background: '#F8F4EC',
                  border: `2px solid ${cfg.color}`,
                  padding: '24px 20px 20px',
                  transform: `rotate(${rot}) scale(${scales[i % scales.length]})`,
                  boxShadow: `4px 4px 0 ${cfg.color}`,
                  transformOrigin: 'center',
                }}
              >
                {/* Tape top */}
                <div
                  className="tape absolute"
                  style={{
                    width: 70,
                    height: 17,
                    top: -8,
                    left: '50%',
                    transform: `translateX(-50%) ${tapeAngles[i % tapeAngles.length]}`,
                  }}
                />

                {/* Type badge */}
                <div
                  style={{
                    display: 'inline-block',
                    background: cfg.color,
                    color: cfg.textColor,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    padding: '3px 8px',
                    marginBottom: 10,
                    textTransform: 'uppercase',
                  }}
                >
                  {cfg.label}
                </div>

                {/* Date */}
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'rgba(13,13,13,0.4)',
                    letterSpacing: '0.08em',
                    marginBottom: 8,
                  }}
                >
                  {formatDate(ann.date)}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.95rem',
                    color: '#0D0D0D',
                    lineHeight: 1.35,
                    marginBottom: 10,
                    letterSpacing: '0.01em',
                  }}
                >
                  {ann.title}
                </h3>

                {/* Divider */}
                <div style={{ height: 1, background: `${cfg.color}60`, marginBottom: 10 }} />

                {/* Content */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.78rem',
                    lineHeight: 1.7,
                    color: 'rgba(13,13,13,0.65)',
                  }}
                >
                  {ann.content}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{ background: 'repeating-linear-gradient(90deg, #0D0D0D 0px, #0D0D0D 3px, transparent 3px, transparent 8px)' }}
      />
    </section>
  )
}
