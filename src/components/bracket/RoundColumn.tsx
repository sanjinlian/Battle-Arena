import type { MatchData } from '../../types/bracket'
import MatchCard from './MatchCard'

interface RoundColumnProps {
  title: string
  matches: MatchData[]
  accentColor: string
}

export default function RoundColumn({ title, matches, accentColor }: RoundColumnProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, minWidth: 206 }}>
      {/* Round title */}
      <div style={{
        width: '100%', textAlign: 'center', marginBottom: 16,
        padding: '6px 0',
        borderBottom: `1px solid ${accentColor}40`,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: accentColor, textTransform: 'uppercase',
        }}>{title}</span>
      </div>

      {/* Match cards with spacing to align bracket flow */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 16, alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
      }}>
        {matches.map((match) => (
          <MatchCard key={match.matchId} match={match} accentColor={accentColor} />
        ))}
      </div>
    </div>
  )
}
