import './Footer.css'

const LOGO_SRC = '/sources/logo/logo_cut_1.jfif'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={LOGO_SRC} alt="" className="footer__logo" aria-hidden="true" />
          <div>
            <strong>Мировое Древо</strong>
            <p>Фабрика полного цикла</p>
          </div>
        </div>
        <p className="footer__copy">© {year} Мировое Древо. Все права защищены.</p>
      </div>
    </footer>
  )
}
