import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WindowsillPage from './pages/WindowsillPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/windowsill" element={<WindowsillPage />} />
    </Routes>
  )
}
