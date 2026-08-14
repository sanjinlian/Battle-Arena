import type { MatchData } from '../../types/bracket'

const EMPTY_PLAYER = '待定'
const EMPTY_STATUS = '待判定'

interface MatchCardProps {
  match: MatchData
  accentColor: string
}

function StatusBadge({ status }: { status: MatchData['status'] }) {
  if (status === 'completed') {
    return (
      <span style={{
        fontSize: '0.55rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em',
        background: 'rgba(34,197,94,0.15)', color: '#22c55e',
        border: '1px solid rgba(34,197,94,0.4)', padding: '1px 6px', borderRadius: 2,
      }}>已完成</span>
    )
  }
  if (status === 'in_progress') {
    return (
      <span style={{
        fontSize: '0.55rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em',
        background: 'rgba(251,191,36,0.15)', color: '#fbbf24',
        border: '1px solid rgba(251,191,36,0.4)', padding: '1px 6px', borderRadius: 2,
      }}>進行中</span>
    )
  }
  return (
    <span style={{
      fontSize: '0.55rem', fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em',
      background: 'rgba(148,163,184,0.1)', color: 'rgba(148,163,184,0.7)',
      border: '1px solid rgba(148,163,184,0.2)', padding: '1px 6px', borderRadius: 2,
    }}>{EMPTY_STATUS}</span>
  )
}

interface PlayerRowProps {
  side: 'A' | 'B'
  name: string
  score?: number
  isWinner: boolean
  isLoser: boolean
  accentColor: string
}

function PlayerRow({ side, name, score, isWinner, isLoser, accentColor }: PlayerRowProps) {
  const isEmpty = !name || name === EMPTY_PLAYER
  const displayName = isEmpty ? EMPTY_PLAYER : name

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '5px 8px',
      background: isWinner ? `${accentColor}18` : 'transparent',
      borderLeft: isWinner ? `2px solid ${accentColor}` : '2px solid transparent',
      opacity: isLoser ? 0.45 : 1,
      transition: 'all 0.2s ease',
    }}>
      {/* Side label */}
      <span style={{
        fontSize: '0.55rem', fontFamily: "'Space Mono', monospace",
        color: accentColor, opacity: 0.7, minWidth: 12, textAlign: 'center',
        fontWeight: 700,
      }}>{side}</span>

      {/* Name */}
      <span style={{
        flex: 1, fontFamily: "'Noto Sans TC', 'Archivo Black', sans-serif",
        fontSize: '0.72rem', color: isEmpty ? 'rgba(148,163,184,0.4)' : (isWinner ? '#F2EDE0' : 'rgba(242,237,224,0.75)'),
        fontStyle: isEmpty ? 'italic' : 'normal',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{displayName}</span>

      {/* Score */}
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.85rem', fontWeight: 700,
        color: isWinner ? accentColor : 'rgba(148,163,184,0.6)',
        minWidth: 18, textAlign: 'right',
      }}>
        {score !== undefined ? score : '–'}
      </span>

      {/* Winner crown */}
      {isWinner && (
        <span style={{ fontSize: '0.65rem', marginLeft: 2 }}>👑</span>
      )}
    </div>
  )
}

export default function MatchCard({ match, accentColor }: MatchCardProps) {
  const isAWinner = match.winner === match.playerA && match.playerA !== EMPTY_PLAYER
  const isBWinner = match.winner === match.playerB && match.playerB !== EMPTY_PLAYER

  return (
    <div style={{
      background: 'rgba(15,20,30,0.85)',
      border: `1px solid rgba(148,163,184,0.15)`,
      borderRadius: 6,
      overflow: 'hidden',
      width: 190,
      flexShrink: 0,
      boxShadow: match.status === 'completed' ? `0 0 12px ${accentColor}18` : '0 2px 8px rgba(0,0,0,0.4)',
      transition: 'box-shadow 0.2s ease',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 8px',
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(148,163,184,0.1)',
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
          color: accentColor, letterSpacing: '0.12em', fontWeight: 700,
        }}>{match.label}</span>
        <StatusBadge status={match.status} />
      </div>

      {/* Players */}
      <div style={{ padding: '3px 0' }}>
        <PlayerRow
          side="A" name={match.playerA} score={match.scoreA}
          isWinner={isAWinner} isLoser={isBWinner}
          accentColor={accentColor}
        />
        <div style={{ height: 1, background: 'rgba(148,163,184,0.08)', margin: '0 8px' }} />
        <PlayerRow
          side="B" name={match.playerB} score={match.scoreB}
          isWinner={isBWinner} isLoser={isAWinner}
          accentColor={accentColor}
        />
      </div>

      {/* Footer: round record + referee */}
      {(match.roundRecord || match.refereeCheck !== undefined) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '3px 8px',
          borderTop: '1px solid rgba(148,163,184,0.08)',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.55rem',
            color: 'rgba(148,163,184,0.5)',
          }}>
            {match.roundRecord ?? ''}
          </span>
          {match.refereeCheck !== undefined && (
            <span style={{
              fontSize: '0.6rem',
              color: match.refereeCheck ? '#22c55e' : 'rgba(239,68,68,0.6)',
            }}>
              {match.refereeCheck ? '✓ 裁判確認' : '⚠ 待確認'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
