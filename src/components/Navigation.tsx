import { useState, useEffect } from 'react'

interface NavigationProps {
  onLoginClick: () => void
  onProfileClick: () => void
  user: { name: string; email: string } | null
  onLogout: () => void
}

const NAV_LINKS = [
  { label: '活動資訊', href: '#event' },
  { label: '賽程', href: '#schedule' },
  { label: '獎勵', href: '#prizes' },
  { label: '報名', href: '#register' },
  { label: 'FAQ', href: '#faq' },
  { label: '公告', href: '#announcements' },
]

export default function Navigation({ onLoginClick, onProfileClick, user, onLogout }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(230,57,70,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#top"
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: '1.2rem',
              letterSpacing: '0.05em',
              color: '#F2EDE0',
              textDecoration: 'none',
            }}
          >
            CHAZZ
            <span style={{ color: '#E63946', marginLeft: 4 }}>●</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(242,237,224,0.7)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(242,237,224,0.7)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: login / user */}
          <div className="flex items-center gap-3 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    color: '#F2EDE0',
                    background: 'rgba(230,57,70,0.15)',
                    border: '1px solid rgba(230,57,70,0.4)',
                    padding: '6px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#E63946',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.name}
                </button>
                {userDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 4,
                      background: '#0D0D0D',
                      border: '1px solid rgba(230,57,70,0.4)',
                      minWidth: 180,
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: 'rgba(242,237,224,0.5)',
                      }}
                    >
                      {user.email}
                    </div>
                    <button
                      onClick={() => { onProfileClick(); setUserDropdown(false) }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '0.7rem',
                        color: '#F2EDE0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.05em',
                      }}
                    >
                      👤 我的資訊
                    </button>
                    <button
                      onClick={() => { onLogout(); setUserDropdown(false) }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '0.72rem',
                        color: '#E63946',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.08em',
                      }}
                    >
                      登出
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="btn-sticker"
                style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  color: '#0D0D0D',
                  background: '#FFD600',
                  border: 'none',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                登入
              </button>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#F2EDE0',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: 4,
              }}
            >
              <span style={{ width: 22, height: 2, background: 'currentColor', display: 'block' }} />
              <span style={{ width: 22, height: 2, background: 'currentColor', display: 'block' }} />
              <span style={{ width: 22, height: 2, background: 'currentColor', display: 'block' }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: '#0D0D0D',
              borderTop: '1px solid rgba(230,57,70,0.3)',
              padding: '16px 0',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(242,237,224,0.8)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
