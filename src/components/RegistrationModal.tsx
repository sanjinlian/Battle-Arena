import { useState } from 'react'
import type { Rule, EventInfo, PaymentConfig } from '../types/cms'
import { postRegistration } from '../services/sheetApi'

interface RegistrationModalProps {
  onClose: () => void
  user: { name: string; email: string } | null
  onLoginRequired: () => void
  rulesData: Rule[]
  eventData: EventInfo
  paymentData: PaymentConfig
  // 若從「我的資訊」繼續付款，直接傳入已有的報名資料
  pendingPayment?: { registrationId: string; group: string; groupLabel: string }
}

type Step = 'rules' | 'form' | 'payment' | 'done'
type PaymentTab = 'bank' | 'card'

export default function RegistrationModal({
  onClose,
  user,
  onLoginRequired,
  rulesData,
  eventData,
  paymentData,
  pendingPayment,
}: RegistrationModalProps) {
  const [step, setStep] = useState<Step>(pendingPayment ? 'payment' : 'rules')
  const [rulesAccepted, setRulesAccepted] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [result, setResult] = useState<{ registrationId: string; group: string; groupLabel: string } | null>(
    pendingPayment ?? null
  )
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('bank')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

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
        category: '',
        notes: form.notes,
      })
      if (res.success) {
        setResult({
          registrationId: res.registrationId || '',
          group: res.group || 'A',
          groupLabel: res.groupLabel || 'A盤',
        })
        setStep('payment')
      } else {
        setSubmitError(res.message || '報名失敗，請再試一次')
      }
    } catch {
      setSubmitError('網路錯誤，請稍後再試')
    } finally {
      setSubmitting(false)
    }
  }

  const STEP_NUM: Record<Step, number> = { rules: 1, form: 2, payment: 3, done: 4 }
  const isFromPending = !!pendingPayment

  const renderProgress = () => {
    if (isFromPending) return null // 從我的資訊跳過來不顯示 step bar
    if (step === 'done') return null
    const steps = ['rules', 'form', 'payment'] as const
    return (
      <div className="flex gap-2 mb-6">
        {steps.map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 3,
              background: STEP_NUM[step] > i + 1 ? '#E63946' : STEP_NUM[step] === i + 1 ? '#FFD600' : 'rgba(13,13,13,0.15)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(13,13,13,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && step !== 'done' && onClose()}
    >
      <div
        className="relative w-full max-w-lg sticker-pop overflow-y-auto"
        style={{ background: '#F2EDE0', border: '3px solid #0D0D0D', padding: '36px', boxShadow: '8px 8px 0 #E63946', maxHeight: '90vh' }}
      >
        <div className="tape absolute" style={{ width: 90, height: 20, top: -10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }} />

        {step !== 'done' && (
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#0D0D0D', fontFamily: "'Archivo Black', sans-serif" }}>×</button>
        )}

        {renderProgress()}

        {/* ─── Step 1: Rules ─── */}
        {step === 'rules' && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.4rem', color: '#0D0D0D', marginBottom: 4 }}>閱讀規則</h3>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.5)', marginBottom: 16 }}>Step 1 / 3</p>
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
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.5)', marginBottom: 16 }}>Step 2 / 3 — 報名後系統自動抽籤分配盤別</p>
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

        {/* ─── Step 3: Payment ─── */}
        {step === 'payment' && result && (
          <>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.4rem', color: '#0D0D0D', marginBottom: 4 }}>
              {isFromPending ? '繼續繳費' : '完成繳費'}
            </h3>
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.85rem', color: 'rgba(13,13,13,0.5)', marginBottom: 16 }}>
              {isFromPending ? '完成付款後才算報名完成' : 'Step 3 / 3 — 付款完成後報名才算正式完成'}
            </p>

            {/* 報名摘要 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <div
                style={{
                  padding: '12px 18px',
                  background: result.group === 'A' ? '#E63946' : '#1B2A6B',
                  border: '2px solid #0D0D0D',
                  boxShadow: '3px 3px 0 #0D0D0D',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>抽籤盤別</div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.6rem', color: '#FFD600', lineHeight: 1 }}>{result.groupLabel}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(13,13,13,0.4)', letterSpacing: '0.1em' }}>報名編號</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: '#0D0D0D', marginBottom: 4 }}>{result.registrationId}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: 'rgba(13,13,13,0.4)', letterSpacing: '0.1em' }}>應繳金額</div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.1rem', color: '#E63946' }}>{eventData.fee || 'NT$ 350'}</div>
              </div>
            </div>

            {/* 付款方式 Tab */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 16, border: '2px solid #0D0D0D' }}>
              {[
                { key: 'bank' as PaymentTab, label: '🏦 銀行轉帳' },
                ...(paymentData.creditCardEnable ? [{ key: 'card' as PaymentTab, label: '💳 信用卡' }] : []),
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setPaymentTab(tab.key)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    background: paymentTab === tab.key ? '#0D0D0D' : 'transparent',
                    color: paymentTab === tab.key ? '#FFD600' : '#0D0D0D',
                    border: 'none',
                    borderRight: tab.key === 'bank' && paymentData.creditCardEnable ? '2px solid #0D0D0D' : 'none',
                    cursor: 'pointer',
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.05em',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 銀行轉帳內容 */}
            {paymentTab === 'bank' && (
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', marginBottom: 16 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>轉帳資訊</div>
                {[
                  { label: '銀行名稱', value: paymentData.bankName },
                  { label: '銀行代碼', value: paymentData.bankCode },
                  { label: '帳戶號碼', value: paymentData.accountNumber },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'rgba(242,237,224,0.4)', letterSpacing: '0.08em' }}>{row.label}</span>
                    <span style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.9rem', color: '#FFD600', letterSpacing: '0.05em' }}>{row.value}</span>
                  </div>
                ))}
                {paymentData.bankNote && (
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,214,0,0.08)', border: '1px solid rgba(255,214,0,0.2)' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', color: '#FFD600', letterSpacing: '0.1em', marginBottom: 4 }}>⚠ 注意事項</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(242,237,224,0.7)', lineHeight: 1.6 }}>{paymentData.bankNote}</div>
                  </div>
                )}
              </div>
            )}

            {/* 信用卡內容 */}
            {paymentTab === 'card' && paymentData.creditCardEnable && (
              <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(242,237,224,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>綠界信用卡付款</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'rgba(242,237,224,0.55)', lineHeight: 1.7, marginBottom: 16 }}>
                  點擊下方按鈕將開啟新分頁<br />
                  完成付款後請回到此頁面確認
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(242,237,224,0.3)', marginBottom: 16 }}>
                  適用平板 / 電腦操作
                </div>
                <a
                  href={paymentData.creditCardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sticker"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: '#3D5BCC',
                    color: '#F2EDE0',
                    border: '2px solid rgba(242,237,224,0.2)',
                    boxShadow: '4px 4px 0 rgba(61,91,204,0.4)',
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {paymentData.creditCardLabel || '前往綠界刷卡'} ↗
                </a>
              </div>
            )}

            {/* 確認已付款 */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: '#E63946', cursor: 'pointer', flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#0D0D0D', lineHeight: 1.5 }}>
                  我已完成付款（或已發出轉帳），等待主辦方確認
                </span>
              </label>
            </div>

            <button
              disabled={!paymentConfirmed}
              onClick={() => setStep('done')}
              className="btn-sticker w-full"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                background: paymentConfirmed ? '#00C44F' : '#ccc',
                color: '#F2EDE0',
                border: '2px solid #0D0D0D',
                cursor: paymentConfirmed ? 'pointer' : 'default',
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: paymentConfirmed ? '4px 4px 0 #0D0D0D' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              我已付款，完成報名
            </button>

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'rgba(13,13,13,0.4)', marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>
              尚未付款可稍後從「我的資訊」繼續繳費
            </div>
          </>
        )}

        {/* ─── Done ─── */}
        {step === 'done' && result && (
          <div className="text-center py-4">
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.5rem', color: '#0D0D0D', marginBottom: 6 }}>
              報名完成！
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: 'rgba(13,13,13,0.6)', marginBottom: 14, lineHeight: 1.7 }}>
              主辦方將核對付款後正式確認報名<br />
              確認後會以 Email 通知你
            </p>

            {/* 官方 LINE 連結 */}
            <div style={{ marginBottom: 16 }}>
              <a
                href="https://lin.ee/nqHtOZv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sticker"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: '#06C755',
                  color: '#FFFFFF',
                  border: '2px solid #0D0D0D',
                  padding: '10px 16px',
                  boxShadow: '3px 3px 0 #0D0D0D',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                  maxWidth: '100%',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 3.12 1.87 5.86 4.69 7.37-.14.73-.5 2.65-.57 3.06-.09.52.19.51.4.38.16-.1 2.22-1.51 3.12-2.12.76.11 1.55.16 2.36.16 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm-4.3 11.25H6.22c-.28 0-.5-.22-.5-.5V8.25c0-.28.22-.5.5-.5s.5.22.5.5V12.75h.98c.28 0 .5.22.5.5s-.22.5-.5.5zm2.08 0c-.28 0-.5-.22-.5-.5V8.25c0-.28.22-.5.5-.5s.5.22.5.5v4.5c0 .28-.22.5-.5.5zm4.84 0h-1.02c-.28 0-.5-.22-.5-.5V8.25c0-.28.22-.5.5-.5h1.02c.28 0 .5.22.5.5s-.22.5-.5.5h-.52v1.25h.52c.28 0 .5.22.5.5s-.22.5-.5.5h-.52V12.25h.52c.28 0 .5.22.5.5s-.22.5-.5.5zm-2.02 0c-.13 0-.26-.05-.35-.15l-1.63-2.16v1.81c0 .28-.22.5-.5.5s-.5-.22-.5-.5V8.25c0-.21.13-.4.32-.47.19-.07.41-.02.53.12l1.63 2.16V8.25c0-.28.22-.5.5-.5s.5.22.5.5v4.5c0 .28-.22.5-.5.5z" />
                </svg>
                <span>加入官方 LINE｜開通賽事通知 / 最新賽程資訊</span>
              </a>
            </div>

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
            <p style={{ fontFamily: "'Special Elite', cursive", fontSize: '0.9rem', color: 'rgba(13,13,13,0.55)', marginBottom: 8 }}>
              比賽日期：{eventData.date ? new Date(eventData.date).toLocaleDateString('zh-TW') : ''}
            </p>
            <div className="stamp inline-block" style={{ color: '#FFD600', borderColor: '#FFD600', fontSize: '0.75rem', marginBottom: 20 }}>
              PENDING PAYMENT
            </div>
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
