import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>Мировое Древо</strong>
          <p>Мебельная фабрика полного цикла</p>
        </div>
        <p className="footer__copy">© {year} Мировое Древо. Все права защищены.</p>
      </div>
    </footer>
  )
}
