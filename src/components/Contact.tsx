import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_PHONE_DISPLAY,
  COMPANY_WORK_HOURS,
  YANDEX_MAP_URL,
} from '../data/company'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!acceptTerms || !acceptPrivacy) {
      setError('Необходимо принять пользовательское соглашение и политику конфиденциальности.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, acceptTerms, acceptPrivacy }),
      })

      const payload = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Не удалось отправить заявку.')
      }

      setSubmitted(true)
      form.reset()
      setAcceptTerms(false)
      setAcceptPrivacy(false)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Не удалось отправить заявку. Попробуйте позже.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const canSubmit = acceptTerms && acceptPrivacy && !submitting

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <h2 className="section-title">Обсудим ваш проект</h2>
          <p className="section-lead">
            Оставьте заявку — наш мастер свяжется с вами в рабочее время.
          </p>

          <ul className="contact__list">
            <li>
              <span>Телефон</span>
              <a href={`tel:${COMPANY_PHONE}`}>{COMPANY_PHONE_DISPLAY}</a>
            </li>
            <li>
              <span>Адрес</span>
              <a href={YANDEX_MAP_URL} target="_blank" rel="noreferrer">
                {COMPANY_ADDRESS}
              </a>
            </li>
            <li>
              <span>Режим работы</span>
              <strong>{COMPANY_WORK_HOURS}</strong>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact__success">
              <h3>Заявка отправлена</h3>
              <p>Мы свяжемся с вами в ближайшее время. Спасибо за интерес к «Мировому Древу»!</p>
            </div>
          ) : (
            <>
              <label>
                Имя
                <input type="text" name="name" placeholder="Как к вам обращаться" required />
              </label>
              <label>
                Телефон
                <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" required />
              </label>
              <label>
                Что планируете заказать?
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Подоконник, столешница, фальшбалка..."
                />
              </label>

              <label className="contact__checkbox">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                />
                <span>
                  Я принимаю{' '}
                  <Link to="/legal/terms" target="_blank" rel="noreferrer">
                    Пользовательское соглашение
                  </Link>
                </span>
              </label>

              <label className="contact__checkbox">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(event) => setAcceptPrivacy(event.target.checked)}
                />
                <span>
                  Согласен с{' '}
                  <Link to="/legal/privacy" target="_blank" rel="noreferrer">
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              {error && <p className="contact__error">{error}</p>}

              <button type="submit" disabled={!canSubmit}>
                {submitting ? 'Отправка…' : 'Отправить заявку'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
