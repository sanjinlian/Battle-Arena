interface SpinningTopProps {
  color: string
  accentColor?: string
  size?: number
  spinClass?: string
  className?: string
}

export default function SpinningTop({
  color,
  accentColor,
  size = 100,
  spinClass = 'spin-normal',
  className = '',
}: SpinningTopProps) {
  const accent = accentColor ?? color
  const cx = 50
  const cy = 42

  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 100 135"
      fill="none"
      className={className}
    >
      {/* Ground shadow */}
      <ellipse cx="50" cy="130" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />

      {/* Shaft */}
      <line x1="50" y1="72" x2="50" y2="127" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="127" r="3.5" fill={color} />

      {/* Rotating disc group */}
      <g
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transformBox: 'fill-box',
        }}
        className={spinClass}
      >
        {/* Outer energy ring glow */}
        <circle cx={cx} cy={cy} r="38" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />

        {/* Blade 1 */}
        <path
          d={`M${cx},${cy} L${cx - 32},${cy - 22} Q${cx - 12},${cy - 8} ${cx},${cy}Z`}
          fill={color}
          opacity="0.85"
        />
        {/* Blade 2 */}
        <path
          d={`M${cx},${cy} L${cx + 32},${cy - 22} Q${cx + 12},${cy - 8} ${cx},${cy}Z`}
          fill={color}
          opacity="0.85"
        />
        {/* Blade 3 */}
        <path
          d={`M${cx},${cy} L${cx - 14},${cy + 34} Q${cx - 4},${cy + 10} ${cx},${cy}Z`}
          fill={color}
          opacity="0.85"
        />
        {/* Blade 4 */}
        <path
          d={`M${cx},${cy} L${cx + 14},${cy + 34} Q${cx + 4},${cy + 10} ${cx},${cy}Z`}
          fill={color}
          opacity="0.85"
        />

        {/* Main body disc */}
        <circle cx={cx} cy={cy} r="28" fill={color} />

        {/* Upper highlight */}
        <ellipse cx={cx - 6} cy={cy - 8} rx="14" ry="8" fill="white" opacity="0.15" />

        {/* Outer ring detail */}
        <circle cx={cx} cy={cy} r="28" fill="none" stroke="white" strokeWidth="1.5" opacity="0.25" />

        {/* Mid ring */}
        <circle cx={cx} cy={cy} r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
        <circle cx={cx} cy={cy} r="20" fill={accent} opacity="0.2" />

        {/* Inner ring */}
        <circle cx={cx} cy={cy} r="13" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />

        {/* Hub ring */}
        <circle cx={cx} cy={cy} r="8" fill="white" opacity="0.9" />
        <circle cx={cx} cy={cy} r="5" fill={color} />
        <circle cx={cx} cy={cy} r="2.5" fill="white" opacity="0.8" />

        {/* Blade tip accents */}
        <circle cx={cx - 32} cy={cy - 22} r="3.5" fill={accent} opacity="0.8" />
        <circle cx={cx + 32} cy={cy - 22} r="3.5" fill={accent} opacity="0.8" />
      </g>
    </svg>
  )
}
