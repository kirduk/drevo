import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import WindowsillPage from './pages/WindowsillPage'
import SlopePage from './pages/SlopePage'
import ValidatePage from './pages/ValidatePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
        <Route path="/validate" element={<ValidatePage />} />
      </Routes>
    </>
  )
}
