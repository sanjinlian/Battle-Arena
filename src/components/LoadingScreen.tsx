import { useState, useEffect } from 'react'
import SpinningTop from './SpinningTop'

interface LoadingScreenProps {
  onComplete: () => void
}

type Phase = 'init' | 'black' | 'fly-in' | 'spin' | 'collide' | 'explode' | 'logo' | 'button'

const SPARKS = Array.from({ length: 20 }, (_, i) => ({
  angle: (i / 20) * 360,
  length: 60 + Math.random() * 80,
  size: 3 + Math.random() * 5,
  color: i % 3 === 0 ? '#FFD600' : i % 3 === 1 ? '#E63946' : '#ffffff',
  duration: 0.4 + Math.random() * 0.4,
}))

// Hint dots positioned around the top
const HINT_DOTS = [
  { angle: -60, dist: 110, delay: '0s' },
  { angle: 60, dist: 110, delay: '0.3s' },
  { angle: 180, dist: 100, delay: '0.6s' },
  { angle: -20, dist: 140, delay: '0.2s' },
  { angle: 20, dist: 140, delay: '0.5s' },
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>('init')
  const [exploding, setExploding] = useState(false)
  const [hovered, setHovered] = useState(false)

  const startAnimation = () => {
    setPhase('black')

    const audio = new Audio(`${import.meta.env.BASE_URL}loading_music.mp3`)
    audio.loop = true
    audio.volume = 0.5
    audio.play().catch(e => console.warn('Autoplay blocked:', e))

    const timers = [
      setTimeout(() => setPhase('fly-in'), 400),
      setTimeout(() => setPhase('spin'), 1800),
      setTimeout(() => setPhase('collide'), 3600),
      setTimeout(() => { setPhase('explode'); setExploding(true) }, 4200),
      setTimeout(() => setPhase('logo'), 4900),
      setTimeout(() => setPhase('button'), 6200),
    ]

    // Cleanup captured in closure; no-op after unmount since timers auto-clear
    return () => {
      timers.forEach(clearTimeout)
      audio.pause()
      audio.currentTime = 0
    }
  }

  const flyInStyle = (phase === 'fly-in' || phase === 'spin' || phase === 'collide' || phase === 'explode' || phase === 'logo' || phase === 'button')

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30 halftone-lg pointer-events-none" />

      {/* Background glow — appears at collision */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(230,57,70,0.15) 0%, transparent 70%)',
          opacity: phase === 'explode' || phase === 'logo' || phase === 'button' ? 1 : 0,
        }}
      />

      {/* ─── Three Tops ─── */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 340,
          height: 200,
          opacity: phase === 'logo' || phase === 'button' ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Top 1 — Red, flies from left */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: phase === 'collide' || phase === 'explode' ? '50%' : flyInStyle ? '15%' : '-30%',
            transform: `translate(-50%, -50%)`,
            transition: phase === 'fly-in' ? 'left 0.9s cubic-bezier(0.23, 1, 0.32, 1)' :
                        phase === 'collide' ? 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          <SpinningTop
            color="#E63946"
            accentColor="#FF6B74"
            size={100}
            spinClass={phase === 'spin' || phase === 'collide' || phase === 'explode' ? 'spin-fast' : 'spin-wobble'}
          />
        </div>

        {/* Top 2 — Yellow, flies from top */}
        <div
          style={{
            position: 'absolute',
            top: phase === 'collide' || phase === 'explode' ? '50%' : flyInStyle ? '10%' : '-50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: phase === 'fly-in' ? 'top 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.15s' :
                        phase === 'collide' ? 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          <SpinningTop
            color="#FFD600"
            accentColor="#FFE94D"
            size={110}
            spinClass={phase === 'spin' || phase === 'collide' || phase === 'explode' ? 'spin-fast' : 'spin-wobble'}
          />
        </div>

        {/* Top 3 — Blue, flies from right */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: phase === 'collide' || phase === 'explode' ? '50%' : flyInStyle ? '85%' : '130%',
            transform: 'translate(-50%, -50%)',
            transition: phase === 'fly-in' ? 'left 0.9s cubic-bezier(0.23, 1, 0.32, 1) 0.08s' :
                        phase === 'collide' ? 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          <SpinningTop
            color="#1B2A6B"
            accentColor="#3D5BCC"
            size={95}
            spinClass={phase === 'spin' || phase === 'collide' || phase === 'explode' ? 'spin-fast' : 'spin-wobble'}
          />
        </div>
      </div>

      {/* ─── Explosion Sparks ─── */}
      {exploding && (
        <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {SPARKS.map((spark, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: spark.size,
                height: spark.size,
                borderRadius: '50%',
                background: spark.color,
                transform: `rotate(${spark.angle}deg) translateX(0)`,
                animation: `spark-out ${spark.duration}s ease-out forwards`,
                '--angle': `${spark.angle}deg`,
              } as React.CSSProperties}
            />
          ))}
          {/* Flash */}
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
              top: -100,
              left: -100,
              animation: 'spark-out 0.5s ease-out forwards',
              '--angle': '0deg',
            } as React.CSSProperties}
          />
        </div>
      )}

      {/* ─── Logo ─── */}
      <div
        className="absolute text-center"
        style={{
          opacity: phase === 'logo' || phase === 'button' ? 1 : 0,
          animation: phase === 'logo' || phase === 'button' ? 'logo-reveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards' : 'none',
        }}
      >
        {/* Season stamp */}
        <div
          className="inline-block mb-3"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            color: '#FFD600',
            textTransform: 'uppercase',
          }}
        >
          ── SEASON 01 ──
        </div>

        <div className="relative mb-2">
          <h1
            className="glitch-text"
            data-text="CHAZZ"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              lineHeight: 1,
              color: '#F2EDE0',
              letterSpacing: '-0.02em',
              textShadow: '4px 4px 0 #E63946, 8px 8px 0 #1B2A6B',
            }}
          >
            CHAZZ
          </h1>
        </div>

        <div
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            letterSpacing: '0.4em',
            color: '#FFD600',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          BATTLE ARENA
        </div>

        {/* Red underline */}
        <div
          style={{
            width: '60%',
            height: 4,
            background: '#E63946',
            margin: '0 auto 2rem',
          }}
        />

        {/* Enter button */}
        <button
          onClick={onComplete}
          className="btn-sticker"
          style={{
            opacity: phase === 'button' ? 1 : 0,
            animation: phase === 'button' ? 'pulse-red 2s infinite 0.6s, sticker-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' : 'none',
            background: '#E63946',
            color: '#F2EDE0',
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            padding: '14px 48px',
            border: '3px solid #F2EDE0',
            cursor: 'pointer',
            textTransform: 'uppercase',
            boxShadow: '4px 4px 0 #FFD600',
          }}
        >
          ENTER ARENA
        </button>
      </div>

      {/* Bottom tagline */}
      <div
        className="absolute bottom-8 left-0 right-0 text-center transition-opacity duration-700"
        style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: '0.85rem',
          color: 'rgba(242,237,224,0.35)',
          letterSpacing: '0.1em',
          opacity: phase === 'logo' || phase === 'button' ? 1 : 0,
        }}
      >
        Coffee × Culture × Combat
      </div>

      {/* ── Init phase — clickable top ── */}
      {phase === 'init' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-50"
          style={{ cursor: 'pointer' }}
          onClick={startAnimation}
        >
          {/* Hint text top */}
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: 'rgba(242,237,224,0.35)',
              textTransform: 'uppercase',
              marginBottom: 32,
              animation: 'pulse-fade 2s ease-in-out infinite',
            }}
          >
            TAP TO START
          </div>

          {/* Clickable top + hint dots container */}
          <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Pulsing ring */}
            <div
              style={{
                position: 'absolute',
                width: 160,
                height: 160,
                borderRadius: '50%',
                border: '1px solid rgba(230,57,70,0.3)',
                animation: 'ping 2s ease-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '1px solid rgba(230,57,70,0.15)',
                animation: 'ping 2s ease-out infinite 0.5s',
              }}
            />

            {/* Hint dots around */}
            {HINT_DOTS.map((dot, i) => {
              const rad = (dot.angle * Math.PI) / 180
              const x = 100 + Math.cos(rad) * dot.dist
              const y = 100 + Math.sin(rad) * dot.dist
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? '#E63946' : '#FFD600',
                    transform: 'translate(-50%, -50%)',
                    animation: `pulse-fade 1.8s ease-in-out infinite ${dot.delay}`,
                    boxShadow: i % 2 === 0 ? '0 0 8px #E63946' : '0 0 8px #FFD600',
                  }}
                />
              )
            })}

            {/* The spinning top — scale up on hover */}
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: hovered ? 'scale(1.15)' : 'scale(1)',
                filter: hovered ? 'drop-shadow(0 0 20px rgba(230,57,70,0.6))' : 'drop-shadow(0 0 8px rgba(230,57,70,0.3))',
              }}
            >
              <SpinningTop
                color="#E63946"
                accentColor="#FF6B74"
                size={120}
                spinClass="spin-wobble"
              />
            </div>
          </div>

          {/* Hint text bottom */}
          <div
            style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: '0.8rem',
              color: 'rgba(242,237,224,0.25)',
              letterSpacing: '0.12em',
              marginTop: 28,
              animation: 'pulse-fade 2.5s ease-in-out infinite 0.8s',
            }}
          >
            點一下，開始戰鬥
          </div>

          <style>{`
            @keyframes pulse-fade {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            @keyframes ping {
              0% { transform: scale(0.8); opacity: 0.6; }
              100% { transform: scale(1.4); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
