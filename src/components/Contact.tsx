import { useState, type FormEvent } from 'react'
import './Contact.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="section-label">Контакты</p>
          <h2 className="section-title">Обсудим ваш проект</h2>
          <p className="section-lead">
            Оставьте заявку — дизайнер свяжется с вами, уточнит задачу и предложит удобное время для замера.
          </p>

          <ul className="contact__list">
            <li>
              <span>Телефон</span>
              <a href="tel:+78120000000">+7 (812) 000-00-00</a>
            </li>
            <li>
              <span>Email</span>
              <a href="mailto:info@m-drevo.ru">info@m-drevo.ru</a>
            </li>
            <li>
              <span>Адрес</span>
              <strong>Санкт-Петербург, промзона «Север», ул. Мастеров, 12</strong>
            </li>
            <li>
              <span>Режим работы</span>
              <strong>Пн–Сб: 10:00–19:00</strong>
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
                  placeholder="Кухня, шкаф-купе, гардеробная..."
                />
              </label>
              <button type="submit">Отправить заявку</button>
              <p className="contact__note">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
