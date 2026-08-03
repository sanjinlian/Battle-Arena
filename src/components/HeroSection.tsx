import SpinningTop from './SpinningTop'
import type { HeroPrize, WebsiteConfig } from '../types/cms'

interface HeroSectionProps {
  onRegisterClick: () => void
  heroData: HeroPrize[]
  websiteConfig: WebsiteConfig
}

export default function HeroSection({ onRegisterClick, heroData, websiteConfig }: HeroSectionProps) {
  const tops = heroData.filter((h) => h.enable).sort((a, b) => a.order - b.order)
  const medalPrizes = tops.filter(h => h.type === 'rank')
  const participationPrizes = tops.filter(h => h.type === 'participation')
  const bonusPrizes = tops.filter(h => h.type === 'bonus')

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden paper-noise"
      style={{ background: '#0D0D0D', paddingTop: '5rem' }}
    >
      {/* Halftone bg */}
      <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />

      {/* Spray paint circles — background art */}
      <div
        className="spray-circle absolute"
        style={{ width: 600, height: 600, top: -200, left: -150, background: 'rgba(230,57,70,0.12)' }}
      />
      <div
        className="spray-circle absolute"
        style={{ width: 500, height: 500, top: 100, right: -200, background: 'rgba(27,42,107,0.18)' }}
      />
      <div
        className="spray-circle absolute"
        style={{ width: 400, height: 400, bottom: -100, left: '40%', background: 'rgba(255,214,0,0.1)' }}
      />

      {/* Tape strips — purely decorative */}
      <div
        className="tape absolute"
        style={{ width: 220, height: 28, top: 90, left: -30, transform: 'rotate(3deg)', opacity: 0.7 }}
      />
      <div
        className="tape absolute"
        style={{ width: 160, height: 22, bottom: '30%', right: -20, transform: 'rotate(-5deg)', opacity: 0.6, background: 'rgba(230,57,70,0.4)' }}
      />

      {/* Coffee stain 1 */}
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 180, height: 180, top: '15%', right: '10%', transform: 'rotate(15deg)' }}
      />
      {/* Coffee stain 2 */}
      <div
        className="coffee-stain absolute pointer-events-none"
        style={{ width: 120, height: 120, bottom: '20%', left: '8%', transform: 'rotate(-8deg)', opacity: 0.6 }}
      />

      {/* Vertical section label */}
      <div
        className="section-label absolute left-4 top-1/2"
        style={{
          color: 'rgba(242,237,224,0.2)',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        CHAZZ — BATTLE — ARENA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-24 relative z-10">

        {/* Season stamp */}
        <div className="text-center mb-2">
          <span
            className="stamp"
            style={{ color: '#FFD600', borderColor: '#FFD600', fontSize: '0.65rem' }}
          >
            {websiteConfig.currentSeason.replace('Season', 'Season ')}
          </span>
        </div>

        {/* Main title */}
        <div className="text-center mb-4 relative">
          <h1
            className="glitch-text"
            data-text="BATTLE ARENA"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
              lineHeight: 1,
              color: '#F2EDE0',
              letterSpacing: '-0.02em',
              textShadow: '3px 3px 0 #E63946',
            }}
          >
            BATTLE ARENA
          </h1>
          <div
            style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
              color: 'rgba(242,237,224,0.5)',
              letterSpacing: '0.2em',
              marginTop: '0.5rem',
            }}
          >
            陀螺戰士，集結。
          </div>
        </div>

        {/* Red divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div style={{ width: 60, height: 2, background: '#E63946' }} />
          <span style={{ color: '#E63946', fontSize: '1.2rem' }}>✕</span>
          <div style={{ width: 60, height: 2, background: '#E63946' }} />
        </div>

        {/* Three medal prize cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {medalPrizes.map((hero, i) => {
            const rotations = ['card-tilt-left', '', 'card-tilt-right']
            // Metallic gold / silver / bronze
            const medals = [
              {
                rank: '金獎',
                rankEn: 'GOLD',
                border: '#C9A84C',
                shadow: '#C9A84C',
                tape: 'rgba(201,168,76,0.7)',
                topColor: '#C9A84C',
                topAccent: '#FFE082',
                prizeColor: '#FFD600',
                bg: 'linear-gradient(145deg, #1a1600 0%, #141414 60%)',
              },
              {
                rank: '銀獎',
                rankEn: 'SILVER',
                border: '#A8A8A8',
                shadow: '#A8A8A8',
                tape: 'rgba(168,168,168,0.6)',
                topColor: '#9E9E9E',
                topAccent: '#E0E0E0',
                prizeColor: '#D0D0D0',
                bg: 'linear-gradient(145deg, #141414 0%, #121212 60%)',
              },
              {
                rank: '銅獎',
                rankEn: 'BRONZE',
                border: '#8B6343',
                shadow: '#8B6343',
                tape: 'rgba(139,99,67,0.65)',
                topColor: '#CD7F32',
                topAccent: '#E8A96A',
                prizeColor: '#CD7F32',
                bg: 'linear-gradient(145deg, #120c07 0%, #141414 60%)',
              },
            ]
            const m = medals[i] || medals[0]
            const yOffsets = ['md:translate-y-4', 'md:translate-y-0', 'md:translate-y-8']

            return (
              <div
                key={hero.heroName}
                className={`relative ${rotations[i]} ${yOffsets[i]} transition-transform duration-300 hover:scale-105 hover:rotate-0 cursor-pointer`}
                style={{
                  background: m.bg,
                  border: `2px solid ${m.border}`,
                  padding: '28px 24px 24px',
                  boxShadow: `6px 6px 0 ${m.shadow}40`,
                }}
              >
                {/* Tape accent */}
                <div
                  className="tape absolute"
                  style={{
                    width: 100,
                    height: 20,
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-2deg)',
                    background: m.tape,
                  }}
                />

                {/* Order number */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    color: m.border,
                    letterSpacing: '0.1em',
                    opacity: 0.7,
                  }}
                >
                  #{String(hero.order).padStart(2, '0')}
                </div>

                {/* Spinning top — metallic color */}
                <div className="flex justify-center mb-4 float-anim" style={{ animationDelay: `${i * 0.4}s` }}>
                  <SpinningTop
                    color={m.topColor}
                    accentColor={m.topAccent}
                    size={90}
                    spinClass="spin-slow"
                  />
                </div>

                {/* Hero name */}
                <h3
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '1.35rem',
                    color: '#F2EDE0',
                    letterSpacing: '0.02em',
                    marginBottom: 4,
                  }}
                >
                  {hero.heroName}
                </h3>

                {/* Prize label — 競賽獎勵 + 金/銀/銅 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(242,237,224,0.35)',
                      textTransform: 'uppercase',
                    }}
                  >
                    競賽獎勵
                  </span>
                  <span
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      color: m.border,
                      textTransform: 'uppercase',
                      border: `1px solid ${m.border}`,
                      padding: '1px 7px',
                      lineHeight: 1.6,
                    }}
                  >
                    {m.rank} {m.rankEn}
                  </span>
                </div>
                {/* Prize name */}
                <div
                  style={{
                    fontFamily: "'Special Elite', cursive",
                    fontSize: '1rem',
                    color: m.prizeColor,
                    marginBottom: 10,
                  }}
                >
                  {hero.prizeName}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: `${m.border}35`, marginBottom: 10 }} />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    lineHeight: 1.65,
                    color: 'rgba(242,237,224,0.55)',
                  }}
                >
                  {hero.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Participation prizes section ── */}
        {participationPrizes.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ flex: 1, height: 1, background: 'rgba(242,237,224,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.2rem' }}>🎁</span>
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '0.18em',
                    color: '#F2EDE0',
                    textTransform: 'uppercase',
                  }}
                >
                  參賽獎勵
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: '#00C44F',
                    border: '1px solid #00C44F',
                    padding: '2px 8px',
                  }}
                >
                  ALL PARTICIPANTS
                </span>
              </div>
              <div style={{ flex: 1, height: 1, background: 'rgba(242,237,224,0.1)' }} />
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              style={{ justifyItems: participationPrizes.length === 1 ? 'center' : 'stretch' }}
            >
              {participationPrizes.map((prize, idx) => (
                <div
                  key={prize.heroName + idx}
                  style={{
                    background: 'linear-gradient(145deg, #081a0e 0%, #0f1f12 70%)',
                    border: '2px solid #00C44F',
                    padding: '24px 20px 20px',
                    boxShadow: '5px 5px 0 rgba(0,196,79,0.2)',
                    position: 'relative',
                    transform: `rotate(${idx % 2 === 0 ? '-0.4deg' : '0.5deg'})`,
                    maxWidth: participationPrizes.length === 1 ? 360 : 'none',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: 16,
                      background: '#00C44F',
                      color: '#0D0D0D',
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      padding: '3px 10px',
                      textTransform: 'uppercase',
                    }}
                  >
                    全員獲得
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(242,237,224,0.35)',
                        textTransform: 'uppercase',
                      }}
                    >
                      參賽獎品
                    </span>
                    <span
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: '#00C44F',
                        textTransform: 'uppercase',
                        border: '1px solid #00C44F',
                        padding: '1px 6px',
                        lineHeight: 1.6,
                      }}
                    >
                      PARTICIPANT PRIZE
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '1.1rem',
                      color: '#F2EDE0',
                      letterSpacing: '0.02em',
                      marginBottom: 4,
                    }}
                  >
                    {prize.heroName}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Special Elite', cursive",
                      fontSize: '0.95rem',
                      color: '#69ff9a',
                      marginBottom: 10,
                    }}
                  >
                    {prize.prizeName}
                  </div>

                  <div style={{ height: 1, background: 'rgba(0,196,79,0.2)', marginBottom: 10 }} />

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      lineHeight: 1.65,
                      color: 'rgba(242,237,224,0.5)',
                    }}
                  >
                    {prize.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bonus prizes section ── */}
        {bonusPrizes.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ flex: 1, height: 1, background: 'rgba(242,237,224,0.1)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.2rem' }}>✨</span>
                <span
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '0.18em',
                    color: '#F2EDE0',
                    textTransform: 'uppercase',
                  }}
                >
                  加碼獎勵
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: '#FFD600',
                    border: '1px solid #FFD600',
                    padding: '2px 8px',
                  }}
                >
                  BONUS
                </span>
              </div>
              <div style={{ flex: 1, height: 1, background: 'rgba(242,237,224,0.1)' }} />
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              style={{ justifyItems: bonusPrizes.length === 1 ? 'center' : 'stretch' }}
            >
              {bonusPrizes.map((prize, idx) => (
                <div
                  key={prize.heroName + idx}
                  style={{
                    background: 'linear-gradient(145deg, #1a1500 0%, #141414 70%)',
                    border: '2px solid #FFD600',
                    padding: '24px 20px 20px',
                    boxShadow: '5px 5px 0 rgba(255,214,0,0.2)',
                    position: 'relative',
                    transform: `rotate(${idx % 2 === 0 ? '-0.4deg' : '0.5deg'})`,
                    maxWidth: bonusPrizes.length === 1 ? 360 : 'none',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 12,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.55rem',
                      letterSpacing: '0.1em',
                      color: '#FFD600',
                      opacity: 0.7,
                    }}
                  >
                    #{String(prize.order).padStart(2, '0')}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      left: 20,
                      background: 'rgba(255,214,0,0.4)',
                      width: 70,
                      height: 16,
                      transform: 'rotate(-3deg)',
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        color: 'rgba(242,237,224,0.35)',
                        textTransform: 'uppercase',
                      }}
                    >
                      加碼獎品
                    </span>
                    <span
                      style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: '#FFD600',
                        textTransform: 'uppercase',
                        border: '1px solid #FFD600',
                        padding: '1px 6px',
                        lineHeight: 1.6,
                      }}
                    >
                      BONUS PRIZE
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '1.1rem',
                      color: '#F2EDE0',
                      letterSpacing: '0.02em',
                      marginBottom: 4,
                    }}
                  >
                    {prize.heroName}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Special Elite', cursive",
                      fontSize: '0.95rem',
                      color: '#FFE566',
                      marginBottom: 10,
                    }}
                  >
                    {prize.prizeName}
                  </div>

                  <div style={{ height: 1, background: 'rgba(255,214,0,0.2)', marginBottom: 10 }} />

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      lineHeight: 1.65,
                      color: 'rgba(242,237,224,0.5)',
                    }}
                  >
                    {prize.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <div
            style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: '0.85rem',
              color: 'rgba(242,237,224,0.4)',
              marginBottom: 16,
              letterSpacing: '0.1em',
            }}
          >
            名額有限，先搶先贏
          </div>
          <button
            onClick={onRegisterClick}
            className="btn-sticker"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: '1.15rem',
              letterSpacing: '0.12em',
              color: '#0D0D0D',
              background: '#FFD600',
              border: '3px solid #0D0D0D',
              padding: '16px 56px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '5px 5px 0 #E63946',
            }}
          >
            立即報名
          </button>
        </div>
      </div>

      {/* Torn bottom edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: '#F2EDE0',
          clipPath: `polygon(
            0% 100%, 2% 30%, 5% 80%, 8% 20%, 11% 65%, 14% 15%,
            17% 70%, 20% 25%, 23% 75%, 26% 20%, 29% 65%, 32% 10%,
            35% 70%, 38% 20%, 41% 60%, 44% 15%, 47% 65%, 50% 20%,
            53% 70%, 56% 15%, 59% 65%, 62% 20%, 65% 75%, 68% 10%,
            71% 65%, 74% 20%, 77% 70%, 80% 15%, 83% 60%, 86% 25%,
            89% 70%, 92% 20%, 95% 65%, 98% 30%, 100% 80%, 100% 100%
          )`,
        }}
      />
    </section>
  )
}
