import { useState } from 'react'
import type { Group } from '../types/bracket'
import { useBracketData } from '../hooks/useBracketData'
import BracketBoard from '../components/bracket/BracketBoard'
import SeasonNotStarted from '../components/bracket/SeasonNotStarted'

// A Group uses gold accent, B Group uses cyan/teal
const GROUP_ACCENT: Record<Group, string> = {
  A: '#FFD600',
  B: '#22d3ee',
}

const GROUP_LABEL: Record<Group, string> = {
  A: 'A 組',
  B: 'B 組',
}

interface BracketPageProps {
  onBackHome: () => void
}

export default function BracketPage({ onBackHome }: BracketPageProps) {
  const [activeGroup, setActiveGroup] = useState<Group>('A')
  const { data, seasonEnabled, loading, error, refetch } = useBracketData()

  const accentColor = GROUP_ACCENT[activeGroup]

  // ── Loading state ──
  if (loading || seasonEnabled === null) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080B12',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `2px solid rgba(255,214,0,0.2)`,
          borderTopColor: '#FFD600',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
          letterSpacing: '0.15em', color: 'rgba(242,237,224,0.4)',
        }}>LOADING BRACKET…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080B12', paddingTop: 64 }}>

      {/* ── Page header ── */}
      <div style={{
        borderBottom: '1px solid rgba(148,163,184,0.1)',
        padding: '28px 0 0',
        background: 'linear-gradient(180deg, rgba(8,11,18,0) 0%, rgba(8,11,18,0.8) 100%)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <button
              onClick={onBackHome}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
                letterSpacing: '0.1em', color: 'rgba(242,237,224,0.4)',
                textTransform: 'uppercase', padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD600')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,224,0.4)')}
            >
              ← 返回首頁
            </button>
          </div>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem', letterSpacing: '0.25em',
              color: 'rgba(230,57,70,0.8)', textTransform: 'uppercase', marginBottom: 4,
            }}>CHAZZ Battle Arena</div>
            <h1 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#F2EDE0', margin: 0, letterSpacing: '0.03em',
            }}>
              Season 01 <span style={{ color: accentColor, transition: 'color 0.3s' }}>對戰表</span>
            </h1>
          </div>

          {/* Error notice */}
          {error && (
            <div style={{
              marginBottom: 12, padding: '8px 14px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(239,68,68,0.8)' }}>
                ⚠ 無法連線至伺服器，目前顯示示範資料
              </span>
              <button
                onClick={refetch}
                style={{
                  background: 'none', border: '1px solid rgba(239,68,68,0.4)',
                  color: 'rgba(239,68,68,0.8)', cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace", fontSize: '0.55rem',
                  letterSpacing: '0.1em', padding: '3px 10px', borderRadius: 3,
                }}
              >
                重試
              </button>
            </div>
          )}

          {/* Group tabs */}
          {seasonEnabled && (
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(148,163,184,0.15)' }}>
              {(['A', 'B'] as Group[]).map((g) => {
                const isActive = activeGroup === g
                const color = GROUP_ACCENT[g]
                return (
                  <button
                    key={g}
                    onClick={() => setActiveGroup(g)}
                    style={{
                      padding: '10px 28px',
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '0.8rem', letterSpacing: '0.08em',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: isActive ? color : 'rgba(242,237,224,0.4)',
                      borderBottom: `2px solid ${isActive ? color : 'transparent'}`,
                      marginBottom: -1,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(242,237,224,0.7)' }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(242,237,224,0.4)' }}
                  >
                    {GROUP_LABEL[g]}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>

        {/* Season not started */}
        {!seasonEnabled && <SeasonNotStarted />}

        {/* Bracket board */}
        {seasonEnabled && data && (
          <BracketBoard
            groupData={activeGroup === 'A' ? data.groupA : data.groupB}
            accentColor={accentColor}
          />
        )}
      </div>
    </div>
  )
}
