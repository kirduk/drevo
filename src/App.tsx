import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import WindowsillPage from './pages/WindowsillPage'
import SlopePage from './pages/SlopePage'
import CountertopPage from './pages/CountertopPage'
import FauxbeamPage from './pages/FauxbeamPage'
import { PrivacyPage, TermsPage } from './pages/LegalPage'
import ValidatePage from './pages/ValidatePage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const scrollToSection = () => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        return false
      }

      if (!scrollToSection()) {
        window.setTimeout(scrollToSection, 0)
      }
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/windowsill" element={<WindowsillPage />} />
        <Route path="/products/slope" element={<SlopePage />} />
        <Route path="/products/countertop" element={<CountertopPage />} />
        <Route path="/products/fauxbeam" element={<FauxbeamPage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/validate" element={<ValidatePage />} />
      </Routes>
    </>
  )
}
