export default function Footer() {
  return (
    <footer
      className="relative py-12 paper-noise"
      style={{ background: '#0D0D0D', borderTop: '2px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '1.8rem',
                color: '#F2EDE0',
                letterSpacing: '-0.01em',
                marginBottom: 4,
              }}
            >
              CHAZZ
              <span style={{ color: '#E63946' }}>●</span>
            </div>
            <div
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: '0.82rem',
                color: 'rgba(242,237,224,0.4)',
                lineHeight: 1.7,
              }}
            >
              Coffee × Culture × Combat<br />
              陀螺競技，藝術態度。
            </div>
          </div>

          {/* Links */}
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(242,237,224,0.3)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Links
            </div>
            {['活動資訊', '賽程', '獎勵', '報名', 'FAQ', '最新公告'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                style={{
                  display: 'block',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.82rem',
                  color: 'rgba(242,237,224,0.4)',
                  textDecoration: 'none',
                  marginBottom: 6,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,224,0.4)')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CMS note */}
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(242,237,224,0.3)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Platform
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem',
                lineHeight: 1.7,
                color: 'rgba(242,237,224,0.3)',
              }}
            >
              本平台由 Google Sheets 作為 CMS 後台管理，每季活動只需更新試算表即可完成更換，無需重新部署。
            </p>
            <div
              style={{
                marginTop: 12,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.55rem',
                color: 'rgba(242,237,224,0.2)',
                letterSpacing: '0.05em',
              }}
            >
              Powered by Google Sheets × Google Apps Script
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              color: 'rgba(242,237,224,0.2)',
              letterSpacing: '0.1em',
            }}
          >
            © 2026 CHAZZ Battle Arena — Season 01
          </span>
          <div className="flex gap-3">
            {['Neo Dadaism', 'Battle Arena', 'Coffee Culture'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.5rem',
                  color: 'rgba(242,237,224,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '2px 6px',
                  letterSpacing: '0.1em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
