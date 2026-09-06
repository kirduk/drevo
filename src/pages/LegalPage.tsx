import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { termsSections, privacySections } from '../data/legal'
import './LegalPage.css'

interface LegalPageProps {
  title: string
  sections: Array<{ title: string; paragraphs: string[] }>
}

function LegalDocument({ title, sections }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="container legal-page__inner">
          <Link to="/" className="legal-page__back">
            ← На главную
          </Link>
          <h1 className="section-title">{title}</h1>
          <div className="legal-page__content">
            {sections.map((section) => (
              <section key={section.title} className="legal-page__section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export function TermsPage() {
  return <LegalDocument title="Пользовательское соглашение" sections={termsSections} />
}

export function PrivacyPage() {
  return <LegalDocument title="Политика конфиденциальности" sections={privacySections} />
}
