// ============================================================
// Bracket Type Definitions
// ============================================================

export type Group = 'A' | 'B'
export type Round = 'R16' | 'QF' | 'SF' | 'FINAL' | 'THIRD_PLACE'
export type MatchStatus = 'pending' | 'in_progress' | 'completed'

export interface MatchData {
  matchId: string
  group: Group
  round: Round
  label: string
  playerA: string
  playerB: string
  winner?: string
  scoreA?: number
  scoreB?: number
  roundRecord?: string
  refereeCheck?: boolean
  status: MatchStatus
}

export interface PlacementData {
  champion?: string
  runnerUp?: string
  thirdPlace?: string
  fourthPlace?: string
  thirdPlaceMatch?: MatchData
}

export interface GroupBracketData {
  round16: MatchData[]
  quarterFinals: MatchData[]
  semiFinals: MatchData[]
  final?: MatchData
  placements: PlacementData
}

export interface BracketTournamentData {
  seasonEnabled: boolean
  groupA: GroupBracketData
  groupB: GroupBracketData
}
