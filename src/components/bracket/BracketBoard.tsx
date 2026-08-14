import { useState } from 'react'
import type { GroupBracketData } from '../../types/bracket'
import type { MatchData } from '../../types/bracket'
import RoundColumn from './RoundColumn'
import PlacementPanel from './PlacementPanel'
import MobileRoundSelector from './MobileRoundSelector'
import MatchCard from './MatchCard'

type RoundKey = 'R16' | 'QF' | 'SF' | 'FINAL'

interface BracketBoardProps {
  groupData: GroupBracketData
  accentColor: string
}

export default function BracketBoard({ groupData, accentColor }: BracketBoardProps) {
  const [mobileRound, setMobileRound] = useState<RoundKey>('R16')

  const finalMatches: MatchData[] = groupData.final ? [groupData.final] : []

  const mobileRoundMap: Record<RoundKey, MatchData[]> = {
    R16: groupData.round16,
    QF: groupData.quarterFinals,
    SF: groupData.semiFinals,
    FINAL: finalMatches,
  }

  const mobileRoundLabels: Record<RoundKey, string> = {
    R16: '16 強',
    QF: '8 強',
    SF: '準決賽',
    FINAL: '決賽',
  }

  return (
    <div>
      {/* ── Desktop: horizontal bracket ── */}
      <div className="hidden md:block" style={{ overflowX: 'auto', paddingBottom: 16 }}>
        <div style={{ display: 'flex', gap: 32, minWidth: 'max-content', alignItems: 'flex-start', padding: '0 4px' }}>
          <RoundColumn title="16 強" matches={groupData.round16} accentColor={accentColor} />
          <RoundColumn title="8 強" matches={groupData.quarterFinals} accentColor={accentColor} />
          <RoundColumn title="準決賽" matches={groupData.semiFinals} accentColor={accentColor} />
          <RoundColumn title="決賽" matches={finalMatches} accentColor={accentColor} />
        </div>
      </div>

      {/* ── Mobile: round selector + single column ── */}
      <div className="md:hidden">
        <div style={{ marginBottom: 16 }}>
          <MobileRoundSelector
            activeRound={mobileRound}
            onChange={setMobileRound}
            accentColor={accentColor}
          />
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '0.2em',
          color: accentColor, textTransform: 'uppercase',
          marginBottom: 14, paddingBottom: 8,
          borderBottom: `1px solid ${accentColor}40`,
        }}>
          {mobileRoundLabels[mobileRound]}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          {mobileRoundMap[mobileRound].map((match) => (
            <MatchCard key={match.matchId} match={match} accentColor={accentColor} />
          ))}
          {mobileRoundMap[mobileRound].length === 0 && (
            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: '0.7rem',
              color: 'rgba(148,163,184,0.4)', textAlign: 'center', padding: '24px 0',
            }}>尚無比賽資料</p>
          )}
        </div>
      </div>

      {/* Placement panel */}
      <PlacementPanel placements={groupData.placements} accentColor={accentColor} />
    </div>
  )
}
