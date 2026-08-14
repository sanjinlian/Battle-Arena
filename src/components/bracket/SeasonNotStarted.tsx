export default function SeasonNotStarted() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', textAlign: 'center', position: 'relative',
    }}>
      {/* Blurred bracket shadow behind */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(
          90deg,
          rgba(148,163,184,0.03) 0px, rgba(148,163,184,0.03) 1px,
          transparent 1px, transparent 48px
        ), repeating-linear-gradient(
          0deg,
          rgba(148,163,184,0.03) 0px, rgba(148,163,184,0.03) 1px,
          transparent 1px, transparent 48px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Lock icon */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(230,57,70,0.1)',
        border: '1px solid rgba(230,57,70,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2rem', marginBottom: 24,
        boxShadow: '0 0 40px rgba(230,57,70,0.1)',
      }}>
        🔒
      </div>

      <h2 style={{
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
        color: '#F2EDE0', marginBottom: 12, letterSpacing: '0.05em',
      }}>
        目前賽季並未開始
      </h2>

      <p style={{
        fontFamily: "'Noto Sans TC', sans-serif",
        fontSize: '0.9rem', color: 'rgba(242,237,224,0.5)',
        maxWidth: 360, lineHeight: 1.8, marginBottom: 8,
      }}>
        Season 01 對戰表將於賽季正式開始後公開
      </p>

      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.65rem', letterSpacing: '0.15em',
        color: 'rgba(230,57,70,0.6)', textTransform: 'uppercase',
      }}>
        CHAZZ Battle Arena — Stand By
      </p>

      {/* Decorative bracket outline */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        overflow: 'hidden', opacity: 0.05,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="600" height="300" viewBox="0 0 600 300" fill="none">
          {/* Simplified bracket wireframe */}
          <rect x="20" y="30" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="20" y="80" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="20" y="160" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="20" y="210" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="100" y1="50" x2="130" y2="50" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="100" y1="100" x2="130" y2="100" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="130" y1="50" x2="130" y2="100" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="130" y1="75" x2="160" y2="75" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="160" y="55" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="100" y1="180" x2="130" y2="180" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="100" y1="230" x2="130" y2="230" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="130" y1="180" x2="130" y2="230" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="130" y1="205" x2="160" y2="205" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="160" y="185" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="240" y1="75" x2="270" y2="75" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="240" y1="205" x2="270" y2="205" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="270" y1="75" x2="270" y2="205" stroke="#F2EDE0" strokeWidth="1.5" />
          <line x1="270" y1="140" x2="300" y2="140" stroke="#F2EDE0" strokeWidth="1.5" />
          <rect x="300" y="120" width="80" height="40" rx="4" stroke="#F2EDE0" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}
