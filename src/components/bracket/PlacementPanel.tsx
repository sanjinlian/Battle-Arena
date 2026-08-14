import type { PlacementData, MatchData } from '../../types/bracket'
import MatchCard from './MatchCard'

interface PlacementPanelProps {
  placements: PlacementData
  accentColor: string
}

interface PlacementCardProps {
  rank: 1 | 2 | 3 | 4
  name?: string
  accentColor: string
}

const RANK_LABELS: Record<number, { emoji: string; label: string; color: string }> = {
  1: { emoji: '🥇', label: '冠軍', color: '#FFD700' },
  2: { emoji: '🥈', label: '亞軍', color: '#C0C0C0' },
  3: { emoji: '🥉', label: '季軍', color: '#CD7F32' },
  4: { emoji: '🏅', label: '第 4 名', color: 'rgba(148,163,184,0.6)' },
}

function PlacementCard({ rank, name, accentColor }: PlacementCardProps) {
  const { emoji, label, color } = RANK_LABELS[rank]
  const isChampion = rank === 1

  return (
    <div style={{
      background: isChampion
        ? `linear-gradient(135deg, rgba(255,215,0,0.12) 0%, rgba(15,20,30,0.9) 60%)`
        : 'rgba(15,20,30,0.7)',
      border: `1px solid ${isChampion ? 'rgba(255,215,0,0.4)' : 'rgba(148,163,184,0.15)'}`,
      borderRadius: 8,
      padding: isChampion ? '20px 24px' : '12px 16px',
      textAlign: 'center',
      boxShadow: isChampion ? '0 0 32px rgba(255,215,0,0.15)' : 'none',
      minWidth: isChampion ? 180 : 140,
      flex: isChampion ? 'none' : 1,
    }}>
      <div style={{ fontSize: isChampion ? '2rem' : '1.4rem', marginBottom: 4 }}>{emoji}</div>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
        letterSpacing: '0.15em', color, marginBottom: 6, textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{
        fontFamily: "'Noto Sans TC', 'Archivo Black', sans-serif",
        fontSize: isChampion ? '1.1rem' : '0.85rem',
        color: name ? '#F2EDE0' : 'rgba(148,163,184,0.35)',
        fontStyle: name ? 'normal' : 'italic',
        fontWeight: isChampion ? 700 : 400,
      }}>
        {name ?? '未定'}
      </div>
      {isChampion && name && (
        <div style={{
          marginTop: 8,
          fontFamily: "'Space Mono', monospace", fontSize: '0.55rem',
          letterSpacing: '0.15em', color: accentColor,
          textTransform: 'uppercase',
        }}>CHAMPION</div>
      )}
    </div>
  )
}

export default function PlacementPanel({ placements, accentColor }: PlacementPanelProps) {
  const thirdMatch: MatchData | undefined = placements.thirdPlaceMatch

  return (
    <div style={{
      marginTop: 40, padding: '24px 20px',
      background: 'rgba(8,11,18,0.6)',
      border: '1px solid rgba(148,163,184,0.1)',
      borderRadius: 12,
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
        letterSpacing: '0.25em', color: accentColor,
        textTransform: 'uppercase', marginBottom: 20, textAlign: 'center',
      }}>— 最終排名 —</div>

      {/* Champion row */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <PlacementCard rank={1} name={placements.champion} accentColor={accentColor} />
      </div>

      {/* Runner-up + 3rd + 4th */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PlacementCard rank={2} name={placements.runnerUp} accentColor={accentColor} />
        <PlacementCard rank={3} name={placements.thirdPlace} accentColor={accentColor} />
        <PlacementCard rank={4} name={placements.fourthPlace} accentColor={accentColor} />
      </div>

      {/* Third place match card if exists */}
      {thirdMatch && (
        <div style={{ marginTop: 24 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
            letterSpacing: '0.15em', color: 'rgba(148,163,184,0.5)',
            textTransform: 'uppercase', marginBottom: 10, textAlign: 'center',
          }}>季軍爭奪賽</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MatchCard match={thirdMatch} accentColor={accentColor} />
          </div>
        </div>
      )}
    </div>
  )
}
