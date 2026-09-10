import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import WindowsillPage from './pages/WindowsillPage'
import SlopePage from './pages/SlopePage'
import CountertopPage from './pages/CountertopPage'
import FauxbeamPage from './pages/FauxbeamPage'
import StairsPage from './pages/StairsPage'
import StepsPage from './pages/StepsPage'
import { PrivacyPage, TermsPage } from './pages/LegalPage'
import ValidatePage from './pages/ValidatePage'
import DevBanner from './components/DevBanner'
import Seo from './components/Seo'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    let cancelled = false
    let attempts = 0

    const scrollToSection = () => {
      if (cancelled) return

      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }

      attempts += 1
      if (attempts < 40) {
        window.setTimeout(scrollToSection, 50)
      }
    }

    scrollToSection()

    return () => {
      cancelled = true
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <DevBanner />
      <Seo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/windowsill" element={<WindowsillPage />} />
        <Route path="/products/slope" element={<SlopePage />} />
        <Route path="/products/countertop" element={<CountertopPage />} />
        <Route path="/products/fauxbeam" element={<FauxbeamPage />} />
        <Route path="/products/stairs" element={<StairsPage />} />
        <Route path="/products/steps" element={<StepsPage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/validate" element={<ValidatePage />} />
      </Routes>
    </>
  )
}
