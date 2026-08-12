import { useState, useEffect } from 'react'
import SpinningTop from './SpinningTop'

interface LoadingScreenProps {
  onComplete: () => void
  isDataLoading: boolean
}

type Phase = 'black' | 'fly-in' | 'spin' | 'collide' | 'explode' | 'logo' | 'button' | 'waiting'

const SPARKS = Array.from({ length: 20 }, (_, i) => ({
  angle: (i / 20) * 360,
  length: 60 + Math.random() * 80,
  size: 3 + Math.random() * 5,
  color: i % 3 === 0 ? '#FFD600' : i % 3 === 1 ? '#E63946' : '#ffffff',
  duration: 0.4 + Math.random() * 0.4,
}))

export default function LoadingScreen({ onComplete, isDataLoading }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>('black')
  const [exploding, setExploding] = useState(false)
  const [animationReady, setAnimationReady] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('fly-in'), 400),
      setTimeout(() => setPhase('spin'), 1800),
      setTimeout(() => setPhase('collide'), 3600),
      setTimeout(() => { setPhase('explode'); setExploding(true) }, 4200),
      setTimeout(() => setPhase('logo'), 4900),
      setTimeout(() => setAnimationReady(true), 6200),
    ]
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (animationReady) {
      if (!isDataLoading) {
        // 資料已就緒：一格一格跳到 100%
        stepToComplete()
      } else {
        setPhase('waiting')
      }
    }
  }, [animationReady, isDataLoading])

  // 如果 waiting 期間資料就緒：開始跳到 100%
  useEffect(() => {
    if (animationReady && !isDataLoading && phase === 'waiting') {
      stepToComplete()
    }
  }, [isDataLoading, animationReady, phase])

  // 從目前進度一格一格跳到 100，完成後顯示按鈕
  function stepToComplete() {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('button'), 300)
          return 100
        }
        return prev + 1
      })
    }, 25)
  }

  // 進度條緩動：動畫期間 0→50%，waiting 期間繼續爬行到 95%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (phase === 'button') return prev
        const target = animationReady ? 95 : 50
        if (prev >= target) return prev
        const step = Math.max(0.2, (target - prev) * 0.03)
        return Math.min(target, prev + step)
      })
    }, 80)
    return () => clearInterval(interval)
  }, [animationReady, phase])

  const flyInStyle = (phase === 'fly-in' || phase === 'spin' || phase === 'collide' || phase === 'explode' || phase === 'logo' || phase === 'waiting' || phase === 'button')

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
          opacity: phase === 'explode' || phase === 'logo' || phase === 'waiting' || phase === 'button' ? 1 : 0,
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
          opacity: phase === 'logo' || phase === 'waiting' || phase === 'button' ? 0 : 1,
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
          opacity: phase === 'logo' || phase === 'waiting' || phase === 'button' ? 1 : 0,
          animation: phase === 'logo' || phase === 'waiting' || phase === 'button' ? 'logo-reveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards' : 'none',
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

      {/* Bottom tagline — 移高一點，避免與進度條重疊 */}
      <div
        className="absolute left-0 right-0 text-center transition-opacity duration-700"
        style={{
          bottom: '4.5rem',
          fontFamily: "'Special Elite', cursive",
          fontSize: '0.85rem',
          color: 'rgba(242,237,224,0.35)',
          letterSpacing: '0.1em',
          opacity: phase === 'logo' || phase === 'waiting' || phase === 'button' ? 1 : 0,
        }}
      >
        Coffee × Culture × Combat
      </div>

      {/* Progress bar */}
      {phase !== 'black' && (
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: '0 0 1.5rem' }}
        >
          {/* Percentage text */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              color: 'rgba(255, 214, 0, 0.9)',
              letterSpacing: '0.2em',
              marginBottom: '0.5rem',
            }}
          >
            {Math.floor(progress)}%
          </div>
          {/* Bar track */}
          <div
            style={{
              margin: '0 auto',
              width: '60%',
              height: 2,
              background: 'rgba(255,255,255,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Bar fill */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progress}%`,
                background: progress === 100 ? '#E63946' : '#FFD600',
                transition: 'width 0.08s linear, background 0.3s ease',
                boxShadow: progress === 100 ? '0 0 8px #E63946' : '0 0 6px #FFD600',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
