import { useState } from 'react'
import type { Rule, EventInfo } from '../types/cms'
import { postRegistration } from '../services/sheetApi'

interface RegistrationModalProps {
  onClose: () => void
  user: { name: string; email: string } | null
  onLoginRequired: () => void
  rulesData: Rule[]
  eventData: EventInfo
}

type Step = 'rules' | 'form' | 'success'

export default function RegistrationModal({ onClose, user, onLoginRequired, rulesData, eventData }: RegistrationModalProps) {
  const [step, setStep] = useState<Step>('rules')
  const [rulesAccepted, setRulesAccepted] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<{ registrationId: string; group: string; groupLabel: string } | null>(null)

  if (!user) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="sticker-pop text-center"
          style={{ background: '#F2EDE0', border: '3px solid #E63946', padding: '40px 36px', boxShadow: '8px 8px 0 #E63946', maxWidth: 380 }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔒</div>
          <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.3rem', color: '#0D0D0D', marginBottom: 8 }}>請先登入</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'rgba(13,13,13,0.6)', marginBottom: 24 }}>報名需要登入帳號</div>
          <button
            onClick={() => { onClose(); onLoginRequired() }}
            className="btn-sticker"
            style={{ background: '#E63946', color: '#F2EDE0', border: '2px solid #0D0D0D', padding: '12px 36px', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '4px 4px 0 #0D0D0D' }}
          >
            前往登入
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await postRegistration({
        email: form.email,
        name: form.name,
        phone: form.phone,
        category: '', // no longer used — GAS auto assigns group
        notes: form.notes,
      })
      if (res.success) {
        setResult({
          registrationId: res.registrationId || '',
          group: res.group || 'A',
          groupLabel: res.groupLabel || 'A盤',
        })
        setStep('success')
      } else {
        setSubmitError(res.message || '報名失敗，請再試一次')
      }
    } catch {
      setSubmitError('網路錯誤，請稍後再試')
    } finally {
      setSubmitting(false)
    }
  }

  const STEPS: Record<Step, number> = { rules: 1, form: 2, success: 3 }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && step !== 'success' && onClose()}
    >
      <div
        className="relative w-full max-w-lg sticker-pop overflow-y-auto"
        style={{ background: '#F2EDE0', border: '3px solid #0D0D0D', padding: '36px', boxShadow: '8px 8px 0 #E63946', maxHeight: '90vh' }}
      >
        <div className="tape absolute" style={{ width: 90, height: 20, top: -10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }} />

        {step !== 'success' && (
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#0D0D0D', fontFamily: "'Archivo Black', sans-serif" }}>×</button>
        )}

        {/* Progress — 2 steps now */}
        {step !== 'success' && (
          <div className="flex gap-2 mb-6">
            {(['rules', 'form'] as const).map((s, i) => (
              <div key={s} style={{ flex: 1, height: 3, background: STEPS[step] > i + 1 ? '#E63946' : STEPS[step] === i + 1 ? '#FFD600' : 'rgba(13,13,13,0.15)', transition: 'background 0.3s ease' }} />
            ))}
          </div>
        )}

        {/* ─── Step 1: Rules ─── */}
        {step === 'rules' && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.4rem', color: '#0D0D0D', marginBottom: 4 }}>閱讀規則</h3>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.5)', marginBottom: 16 }}>Step 1 / 2</p>
            <div style={{ background: '#0D0D0D', border: '1px solid #333', padding: '16px', maxHeight: 260, overflowY: 'auto', marginBottom: 16 }}>
              {rulesData.map((rule, i) => (
                <div key={rule.order || i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 10 }}>
                  <span style={{ color: '#E63946', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', minWidth: 24 }}>
                    {String(rule.order || i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.8rem', color: '#F2EDE0', marginBottom: 2 }}>{rule.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(242,237,224,0.55)', lineHeight: 1.5 }}>{rule.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bracket notice */}
            <div style={{ background: '#1B2A6B', border: '1px solid #3D5BCC', padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#3D5BCC', textTransform: 'uppercase', marginBottom: 6 }}>賽制說明</div>
              {[
                { stage: '32強 → 8強', desc: 'A盤 與 B盤 同時進行，平均分配選手' },
                { stage: '4強 ／ 季軍賽', desc: '全部改在 A盤（一般盤）對決' },
                { stage: '決賽', desc: 'A盤（一般盤）最終對決' },
              ].map((row) => (
                <div key={row.stage} style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: '#FFD600', flexShrink: 0, minWidth: 90 }}>{row.stage}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(242,237,224,0.7)' }}>{row.desc}</span>
                </div>
              ))}
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: 'rgba(242,237,224,0.5)', marginTop: 8 }}>
                ✦ 報名後系統自動抽籤分配 A盤 或 B盤
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
              <input type="checkbox" checked={rulesAccepted} onChange={(e) => setRulesAccepted(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#E63946', cursor: 'pointer' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#0D0D0D' }}>我已閱讀規則，並同意自動抽籤分配盤別</span>
            </label>
            <button
              disabled={!rulesAccepted}
              onClick={() => setStep('form')}
              className="btn-sticker w-full"
              style={{ display: 'block', width: '100%', padding: '14px', background: rulesAccepted ? '#E63946' : '#ccc', color: '#F2EDE0', border: '2px solid #0D0D0D', cursor: rulesAccepted ? 'pointer' : 'default', fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: rulesAccepted ? '4px 4px 0 #0D0D0D' : 'none', transition: 'all 0.2s ease' }}
            >
              下一步
            </button>
          </>
        )}

        {/* ─── Step 2: Form ─── */}
        {step === 'form' && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.4rem', color: '#0D0D0D', marginBottom: 4 }}>填寫資料</h3>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.5)', marginBottom: 16 }}>Step 2 / 2 — 報名後系統自動抽籤分配盤別</p>
            <form onSubmit={handleSubmit}>
              {[
                { label: '姓名 / 暱稱', key: 'name', type: 'text', placeholder: 'Dragon Fighter' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: '手機號碼', key: 'phone', type: 'tel', placeholder: '0912-345-678' },
                { label: '備注（選填）', key: 'notes', type: 'text', placeholder: '特殊需求或備注' },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(13,13,13,0.55)', textTransform: 'uppercase', marginBottom: 5 }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '10px 12px', background: 'white', border: '2px solid rgba(13,13,13,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem', color: '#0D0D0D', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => (e.target.style.borderColor = '#E63946')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(13,13,13,0.2)')}
                  />
                </div>
              ))}
              {submitError && (
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#E63946', marginBottom: 12 }}>✕ {submitError}</div>
              )}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('rules')} style={{ flex: 1, padding: 12, background: 'none', border: '2px solid rgba(13,13,13,0.3)', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif", fontSize: '0.8rem', color: '#0D0D0D' }}>
                  上一步
                </button>
                <button
                  type="submit"
                  disabled={submitting || !form.name || !form.email || !form.phone}
                  className="btn-sticker"
                  style={{ flex: 2, padding: 12, background: '#E63946', color: '#F2EDE0', border: '2px solid #0D0D0D', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif", fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '4px 4px 0 #0D0D0D', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? '抽籤中...' : '確認報名 & 抽籤'}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ─── Success ─── */}
        {step === 'success' && result && (
          <div className="text-center py-4">
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎰</div>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.6rem', color: '#0D0D0D', marginBottom: 6 }}>
              報名成功！
            </h3>

            {/* Group assignment result */}
            <div
              style={{
                margin: '16px 0',
                padding: '20px',
                background: result.group === 'A' ? '#E63946' : '#1B2A6B',
                border: '3px solid #0D0D0D',
                boxShadow: '5px 5px 0 #0D0D0D',
              }}
            >
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 4 }}>
                抽籤結果
              </div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2.5rem', color: '#FFD600', letterSpacing: '0.05em' }}>
                {result.groupLabel}
              </div>
              <div style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                32強 & 8強 使用此盤 → 4強後改 A盤
              </div>
            </div>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(13,13,13,0.4)', marginBottom: 4 }}>
              {result.registrationId}
            </div>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.95rem', color: 'rgba(13,13,13,0.6)', marginBottom: 8 }}>
              確認信已寄送至 {form.email}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'rgba(13,13,13,0.5)', marginBottom: 24, lineHeight: 1.6 }}>
              比賽日期：{eventData.date ? new Date(eventData.date).toLocaleDateString('zh-TW') : ''}<br />
              請持確認信報名編號於 09:00 前報到
            </p>
            <div className="stamp inline-block" style={{ color: '#00C44F', borderColor: '#00C44F', fontSize: '0.8rem', marginBottom: 20 }}>CONFIRMED</div>
            <br />
            <button
              onClick={onClose}
              className="btn-sticker"
              style={{ background: '#0D0D0D', color: '#F2EDE0', border: '2px solid #0D0D0D', padding: '12px 36px', cursor: 'pointer', fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '4px 4px 0 #E63946' }}
            >
              關閉
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
