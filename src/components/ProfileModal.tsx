import { useState, useEffect } from 'react'
import { fetchMyRegistration, type MyRegistration } from '../services/sheetApi'

interface ProfileModalProps {
  onClose: () => void
  user: { name: string; email: string }
  eventData: { title: string; date: string; location: string }
}

export default function ProfileModal({ onClose, user, eventData }: ProfileModalProps) {
  const [reg, setReg] = useState<MyRegistration | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const gasUrl = import.meta.env.VITE_GAS_URL
    if (!gasUrl) {
      setError('尚未設定 GAS URL')
      setLoading(false)
      return
    }
    fetchMyRegistration(user.email)
      .then(setReg)
      .catch(() => setError('無法載入報名資料，請稍後再試'))
      .finally(() => setLoading(false))
  }, [user.email])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch {
      return dateStr
    }
  }

  const groupColor = reg?.group === 'A' ? '#E63946' : '#1B2A6B'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(13,13,13,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md sticker-pop overflow-y-auto"
        style={{
          background: '#0D0D0D',
          border: '3px solid rgba(242,237,224,0.15)',
          padding: '36px',
          boxShadow: '8px 8px 0 #E63946',
          maxHeight: '90vh',
        }}
      >
        {/* tape */}
        <div className="tape absolute" style={{ width: 90, height: 20, top: -10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }} />

        {/* close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#F2EDE0', fontFamily: "'Archivo Black', sans-serif" }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#E63946', textTransform: 'uppercase', marginBottom: 6 }}>
            我的資訊
          </div>
          <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.5rem', color: '#F2EDE0', lineHeight: 1.1 }}>
            {user.name}
          </h3>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(242,237,224,0.4)', marginTop: 4 }}>
            {user.email}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(242,237,224,0.08)', marginBottom: 24 }} />

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'rgba(242,237,224,0.4)', letterSpacing: '0.1em' }}>
              載入中...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#E63946', padding: '16px 0' }}>
            ✕ {error}
          </div>
        )}

        {/* Not registered */}
        {!loading && !error && reg && !reg.found && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</div>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1rem', color: '#F2EDE0', marginBottom: 8 }}>
              尚未報名
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(242,237,224,0.4)', lineHeight: 1.6 }}>
              你還沒有報名本屆比賽<br />前往報名區域即可參賽
            </div>
          </div>
        )}

        {/* Registration found */}
        {!loading && !error && reg?.found && (
          <>
            {/* Event info */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.35)', textTransform: 'uppercase', marginBottom: 10 }}>
                比賽場次
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(242,237,224,0.08)', padding: '14px 16px' }}>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem', color: '#F2EDE0', marginBottom: 4 }}>
                  {eventData.title || 'CHAZZ Battle Arena'}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(242,237,224,0.45)', lineHeight: 1.8 }}>
                  <div>📅 {formatDate(eventData.date)}</div>
                  <div>📍 {eventData.location || '—'}</div>
                </div>
              </div>
            </div>

            {/* Group badge */}
            <div
              style={{
                background: groupColor,
                padding: '20px',
                marginBottom: 20,
                border: '2px solid rgba(242,237,224,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 2 }}>
                  抽籤結果
                </div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2.5rem', color: '#FFD600', lineHeight: 1 }}>
                  {reg.groupLabel}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  32強 → 8強 使用此盤
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                  4強後統一 A盤
                </div>
              </div>
            </div>

            {/* Fields */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.35)', textTransform: 'uppercase', marginBottom: 10 }}>
                報名資料
              </div>
              {[
                { label: '報名編號', value: reg.registrationId },
                { label: '姓名 / 暱稱', value: reg.name },
                { label: 'Email', value: reg.email },
                { label: '手機號碼', value: reg.phone },
                { label: '報名狀態', value: reg.status === 'Pending' ? '✅ 確認中' : reg.status },
                { label: '報名時間', value: formatDate(reg.registerDate || '') },
                ...(reg.notes ? [{ label: '備注', value: reg.notes }] : []),
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(242,237,224,0.06)',
                    gap: 12,
                  }}
                >
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'rgba(242,237,224,0.35)', flexShrink: 0, letterSpacing: '0.05em' }}>
                    {f.label}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#F2EDE0', textAlign: 'right', wordBreak: 'break-all' }}>
                    {f.value || '—'}
                  </span>
                </div>
              ))}
            </div>

            <div className="stamp inline-block" style={{ color: '#00C44F', borderColor: '#00C44F', fontSize: '0.7rem' }}>
              REGISTERED
            </div>
          </>
        )}
      </div>
    </div>
  )
}
