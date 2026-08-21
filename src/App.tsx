import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import EventSection from './components/EventSection'
import ScheduleSection from './components/ScheduleSection'
import RegistrationSection from './components/RegistrationSection'
import FAQSection from './components/FAQSection'
import AnnouncementsSection from './components/AnnouncementsSection'
import ComingSoonSection from './components/ComingSoonSection'
import AuthModal from './components/AuthModal'
import RegistrationModal from './components/RegistrationModal'
import ProfileModal from './components/ProfileModal'
import Footer from './components/Footer'
import BracketPage from './pages/BracketPage'
import { useCmsData } from './hooks/useCmsData'

interface User {
  name: string
  email: string
}

interface PendingPayment {
  registrationId: string
  group: string
  groupLabel: string
}

export default function App() {
  const { data, loading: cmsLoading } = useCmsData()

  const [showLoading, setShowLoading] = useState(true)
  const [mainVisible, setMainVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'bracket'>('home')
  const [user, setUser] = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showReg, setShowReg] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  // 從「我的資訊」繼續繳費時傳入的報名資料
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | undefined>(undefined)

  useEffect(() => {
    if (!showLoading) {
      setMainVisible(true)
    }
  }, [showLoading])

  useEffect(() => {
    if (mainVisible) {
      const bgm = new Audio(`${import.meta.env.BASE_URL}background_music.wav`)
      bgm.loop = true
      bgm.volume = 0.4

      const tryPlay = () => {
        bgm.play().catch(e => {
          console.warn('BGM Autoplay blocked, waiting for interaction:', e)
          const playOnInteract = () => {
            bgm.play().catch(() => {})
            document.removeEventListener('click', playOnInteract)
            document.removeEventListener('keydown', playOnInteract)
          }
          document.addEventListener('click', playOnInteract)
          document.addEventListener('keydown', playOnInteract)
        })
      }

      tryPlay()

      return () => {
        bgm.pause()
        bgm.currentTime = 0
      }
    }
  }, [mainVisible])

  const handleLoadingComplete = () => {
    setMainVisible(true)
    setTimeout(() => setShowLoading(false), 800)
  }

  const handleLogin = (u: User) => {
    setUser(u)
    setShowAuth(false)
  }

  const handleRegisterClick = () => {
    if (!user) {
      setShowAuth(true)
    } else {
      setPendingPayment(undefined) // 正常報名，不帶 pending
      setShowReg(true)
    }
  }

  // 從 ProfileModal 繼續繳費
  const handleContinuePayment = (pending: PendingPayment) => {
    setPendingPayment(pending)
    setShowProfile(false)
    setShowReg(true)
  }

  // Show maintenance page if configured
  if (data.websiteConfig.maintenance) {
    return (
      <div style={{ minHeight: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '2rem', color: '#F2EDE0' }}>🚧</div>
        <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.5rem', color: '#F2EDE0' }}>維護中</div>
        <div style={{ fontFamily: "'Special Elite', cursive", fontSize: '1rem', color: 'rgba(242,237,224,0.5)' }}>
          請稍後再試 — Under Maintenance
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Loading screen */}
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} isDataLoading={cmsLoading} />}

      {/* Main site */}
      <div
        style={{
          opacity: mainVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: mainVisible ? 'all' : 'none',
        }}
      >
        <Navigation
          onLoginClick={() => setShowAuth(true)}
          onProfileClick={() => setShowProfile(true)}
          user={user}
          onLogout={() => setUser(null)}
          onBracketClick={() => { setCurrentPage('bracket'); window.scrollTo(0, 0) }}
          currentPage={currentPage}
          onNavLinkClick={(href) => {
            setCurrentPage('home')
            setTimeout(() => {
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
            }, 50)
          }}
        />

        {/* Bracket subpage — only mounts when user navigates there (lazy load) */}
        {currentPage === 'bracket' && (
          <BracketPage onBackHome={() => { setCurrentPage('home'); window.scrollTo(0, 0) }} />
        )}

        {/* Home sections — hidden (not unmounted) to preserve BGM & scroll position */}
        <div style={{ display: currentPage === 'bracket' ? 'none' : 'block' }}>
          <HeroSection
            onRegisterClick={handleRegisterClick}
            heroData={data.hero}
            websiteConfig={data.websiteConfig}
          />
          <EventSection eventData={data.event} loading={cmsLoading} />
          <ScheduleSection scheduleData={data.schedule} eventData={data.event} />
          <RegistrationSection
            onRegisterClick={handleRegisterClick}
            isLoggedIn={!!user}
            rulesData={data.rules}
            websiteConfig={data.websiteConfig}
            eventData={data.event}
            bracketData={data.bracket}
          />
          <FAQSection faqData={data.faq} />
          <AnnouncementsSection announcementsData={data.announcements} />
          <ComingSoonSection />
          <Footer />
        </div>
      </div>

      {/* Modals */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
      {showReg && (
        <RegistrationModal
          onClose={() => { setShowReg(false); setPendingPayment(undefined) }}
          user={user}
          rulesData={data.rules}
          eventData={data.event}
          paymentData={data.payment}
          pendingPayment={pendingPayment}
          onLoginRequired={() => { setShowReg(false); setShowAuth(true) }}
        />
      )}
      {showProfile && user && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          user={user}
          eventData={data.event}
          onContinuePayment={handleContinuePayment}
        />
      )}
    </>
  )
}
