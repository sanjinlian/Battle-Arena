import { useState, useEffect, useRef } from 'react'
import { postLogin } from '../services/sheetApi'

interface AuthModalProps {
  onClose: () => void
  onLogin: (user: { name: string; email: string }) => void
}

type AuthView = 'select' | 'email'

// Extend window type for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void
          renderButton: (element: HTMLElement, config: object) => void
          prompt: () => void
        }
      }
    }
  }
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('select')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const googleBtnRef = useRef<HTMLDivElement>(null)

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string

  // Initialize Google Identity Services
  useEffect(() => {
    if (!clientId || view !== 'select') return

    const initGoogle = () => {
      if (!window.google || !googleBtnRef.current) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
      })
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: googleBtnRef.current.offsetWidth || 360,
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'center',
      })
    }

    // GIS might not be loaded yet — poll briefly
    if (window.google) {
      initGoogle()
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initGoogle()
          clearInterval(interval)
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [view, clientId])

  const handleGoogleCredentialResponse = async (response: { credential: string }) => {
    setLoading(true)
    setError('')
    try {
      // Decode JWT payload (not verifying signature — GAS will do that)
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      const result = await postLogin({
        email: payload.email,
        name: payload.name,
        googleToken: response.credential,
      })
      if (result.success) {
        onLogin({ name: result.name || payload.name, email: result.email || payload.email })
      } else {
        setError('登入失敗，請稍後再試')
      }
    } catch {
      setError('Google 登入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !name) {
      setError('請填寫姓名與 Email')
      return
    }
    setLoading(true)
    try {
      const result = await postLogin({ email, name })
      if (result.success) {
        onLogin({ name: result.name || name, email: result.email || email })
      } else {
        setError('登入失敗，請稍後再試')
      }
    } catch {
      setError('網路錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md sticker-pop"
        style={{
          background: '#F2EDE0',
          border: '3px solid #0D0D0D',
          padding: '40px 36px',
          boxShadow: '8px 8px 0 #E63946',
          transform: 'rotate(-0.5deg)',
        }}
      >
        {/* Tape */}
        <div
          className="tape absolute"
          style={{ width: 100, height: 22, top: -11, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 14, background: 'none', border: 'none',
            fontSize: '1.4rem', cursor: 'pointer', color: '#0D0D0D', lineHeight: 1,
            fontFamily: "'Archivo Black', sans-serif",
          }}
        >
          ×
        </button>

        {view === 'select' ? (
          <>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.6rem', color: '#0D0D0D', marginBottom: 4, lineHeight: 1 }}>
              ENTER
            </div>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: '1rem', color: 'rgba(13,13,13,0.5)', marginBottom: 28 }}>
              登入以加入戰場
            </div>

            {/* Google Sign-In button — rendered by GIS */}
            {clientId ? (
              <div style={{ marginBottom: 12 }}>
                <div
                  ref={googleBtnRef}
                  style={{ width: '100%', minHeight: 44 }}
                />
                {loading && (
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'rgba(13,13,13,0.5)', textAlign: 'center', marginTop: 8 }}>
                    登入中...
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '12px', background: 'rgba(13,13,13,0.06)', border: '1px solid rgba(13,13,13,0.15)', marginBottom: 12, fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'rgba(13,13,13,0.5)' }}>
                ⚠ 未設定 VITE_GOOGLE_CLIENT_ID，Google 登入不可用
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div style={{ flex: 1, height: 1, background: 'rgba(13,13,13,0.15)' }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(13,13,13,0.4)' }}>或</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(13,13,13,0.15)' }} />
            </div>

            <button
              onClick={() => setView('email')}
              className="btn-sticker w-full"
              style={{
                display: 'block', width: '100%', padding: '14px', background: 'transparent', color: '#0D0D0D',
                border: '2px solid #0D0D0D', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif",
                fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '4px 4px 0 rgba(13,13,13,0.2)',
              }}
            >
              Email 登入 / 註冊
            </button>

            {error && (
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#E63946', marginTop: 12 }}>
                ✕ {error}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => setView('select')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono', monospace",
                fontSize: '0.65rem', color: 'rgba(13,13,13,0.5)', letterSpacing: '0.1em', marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              ← 返回
            </button>

            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.4rem', color: '#0D0D0D', marginBottom: 20 }}>
              Email 登入
            </div>

            <form onSubmit={handleEmailLogin}>
              {[
                { label: '暱稱', value: name, setter: setName, type: 'text', placeholder: 'Dragon Fighter' },
                { label: 'Email', value: email, setter: setEmail, type: 'email', placeholder: 'you@example.com' },
                { label: '密碼（備用驗證）', value: password, setter: setPassword, type: 'password', placeholder: '••••••••' },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      display: 'block', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem',
                      letterSpacing: '0.15em', color: 'rgba(13,13,13,0.55)', textTransform: 'uppercase', marginBottom: 5,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '10px 12px', background: 'white', border: '2px solid rgba(13,13,13,0.2)',
                      fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#0D0D0D', outline: 'none',
                      boxSizing: 'border-box', transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#E63946')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(13,13,13,0.2)')}
                  />
                </div>
              ))}

              {error && (
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#E63946', marginBottom: 12 }}>
                  ✕ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-sticker w-full"
                style={{
                  display: 'block', width: '100%', padding: '14px', background: '#E63946', color: '#F2EDE0',
                  border: '2px solid #0D0D0D', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  boxShadow: '4px 4px 0 #0D0D0D', opacity: loading ? 0.7 : 1, marginTop: 8,
                }}
              >
                {loading ? '登入中...' : '進入戰場'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
