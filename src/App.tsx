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
import Footer from './components/Footer'
import { useCmsData } from './hooks/useCmsData'

interface User {
  name: string
  email: string
}

export default function App() {
  const { data, loading: cmsLoading } = useCmsData()

  const [showLoading, setShowLoading] = useState(() => {
    try {
      return !localStorage.getItem('chazz_arena_loaded')
    } catch {
      return true
    }
  })
  const [mainVisible, setMainVisible] = useState(!showLoading)
  const [user, setUser] = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showReg, setShowReg] = useState(false)

  useEffect(() => {
    if (!showLoading) {
      setMainVisible(true)
    }
  }, [showLoading])

  useEffect(() => {
    if (mainVisible) {
      const bgm = new Audio(`${import.meta.env.BASE_URL}background_music.wav`)
      bgm.loop = true
      bgm.volume = 0.4 // Slightly lower for background
      bgm.play().catch(e => console.warn('BGM Autoplay blocked:', e))
      
      return () => {
        bgm.pause()
        bgm.currentTime = 0
      }
    }
  }, [mainVisible])

  const handleLoadingComplete = () => {
    try {
      localStorage.setItem('chazz_arena_loaded', '1')
    } catch {
      // ignore
    }
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
      setShowReg(true)
    }
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
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

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
          user={user}
          onLogout={() => setUser(null)}
        />

        <HeroSection
          onRegisterClick={handleRegisterClick}
          heroData={data.hero}
          websiteConfig={data.websiteConfig}
        />
        <EventSection eventData={data.event} categoriesData={data.categories} loading={cmsLoading} />
        <ScheduleSection scheduleData={data.schedule} eventData={data.event} />
        <RegistrationSection
          onRegisterClick={handleRegisterClick}
          isLoggedIn={!!user}
          categoriesData={data.categories}
          rulesData={data.rules}
          websiteConfig={data.websiteConfig}
          eventData={data.event}
        />
        <FAQSection faqData={data.faq} />
        <AnnouncementsSection announcementsData={data.announcements} />
        <ComingSoonSection />
        <Footer />
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
          onClose={() => setShowReg(false)}
          user={user}
          categoriesData={data.categories}
          rulesData={data.rules}
          eventData={data.event}
          onLoginRequired={() => { setShowReg(false); setShowAuth(true) }}
        />
      )}
    </>
  )
}
