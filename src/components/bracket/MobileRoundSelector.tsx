type RoundKey = 'R16' | 'QF' | 'SF' | 'FINAL'

interface MobileRoundSelectorProps {
  activeRound: RoundKey
  onChange: (round: RoundKey) => void
  accentColor: string
}

const ROUNDS: { key: RoundKey; label: string }[] = [
  { key: 'R16', label: '16 強' },
  { key: 'QF', label: '8 強' },
  { key: 'SF', label: '準決賽' },
  { key: 'FINAL', label: '決賽' },
]

export default function MobileRoundSelector({ activeRound, onChange, accentColor }: MobileRoundSelectorProps) {
  return (
    <div style={{
      display: 'flex', overflowX: 'auto', gap: 8, paddingBottom: 4,
      scrollbarWidth: 'none',
    }}>
      {ROUNDS.map(({ key, label }) => {
        const isActive = activeRound === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              flexShrink: 0,
              padding: '7px 16px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem', letterSpacing: '0.1em',
              background: isActive ? accentColor : 'rgba(15,20,30,0.7)',
              color: isActive ? '#0D0D0D' : 'rgba(242,237,224,0.6)',
              border: `1px solid ${isActive ? accentColor : 'rgba(148,163,184,0.2)'}`,
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: isActive ? 700 : 400,
              transition: 'all 0.2s ease',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
