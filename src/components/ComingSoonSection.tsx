const FEATURES = [
  { icon: '🏆', title: '我的里程碑', desc: '追蹤你的成長歷程，解鎖限定徽章', color: '#C9A84C' },
  { icon: '📊', title: '排行榜', desc: '全國玩家積分榜，即時更新', color: '#E63946' },
  { icon: '🎴', title: '玩家卡片', desc: '個人化戰績卡，可分享至社群', color: '#1B2A6B' },
  { icon: '⚡', title: '會員成長系統', desc: '累積積分，解鎖會員福利', color: '#00C44F' },
]

export default function ComingSoonSection() {
  return (
    <section
      className="relative py-20 paper-noise"
      style={{ background: '#141414' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center mb-12">
          <div
            className="stamp inline-block mb-4"
            style={{ color: '#FFD600', borderColor: '#FFD600', fontSize: '0.7rem' }}
          >
            V2 Coming Soon
          </div>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'rgba(242,237,224,0.3)',
              letterSpacing: '-0.01em',
            }}
          >
            更多功能，即將登場
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => {
            const rotations = ['-1.5deg', '1deg', '-0.8deg', '1.5deg']

            return (
              <div
                key={feat.title}
                className="group cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  padding: '24px 20px',
                  transform: `rotate(${rotations[i]})`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => alert('🚧 功能開發中，敬請期待。')}
              >
                {/* Coming soon overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(13,13,13,0.8)' }}
                >
                  <div
                    className="stamp"
                    style={{ color: '#FFD600', borderColor: '#FFD600', fontSize: '0.65rem', transform: 'rotate(-8deg)' }}
                  >
                    開發中
                  </div>
                </div>

                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{feat.icon}</div>
                <div
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.95rem',
                    color: feat.color,
                    marginBottom: 6,
                  }}
                >
                  {feat.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    lineHeight: 1.6,
                    color: 'rgba(242,237,224,0.35)',
                  }}
                >
                  {feat.desc}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
