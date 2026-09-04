import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const LOGO_SRC = '/sources/logo/logo_cut_1.jfif'

const navItems = [
  { href: '/#about', label: 'О фабрике' },
  { href: '/#products', label: 'Продукция' },
  { href: '/#gallery', label: 'Галерея' },
  { href: '/#contact', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          <img src={LOGO_SRC} alt="Мировое Древо" className="header__logo-image" />
          <span className="header__logo-text">
            <strong>Мировое Древо</strong>
            <small>мебельная фабрика</small>
          </span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contact" className="header__cta" onClick={() => setMenuOpen(false)}>
            Заказать проект
          </a>
        </nav>

        <button
          type="button"
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
