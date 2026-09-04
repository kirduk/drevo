import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grain" />
        <div className="hero__glow hero__glow--left" />
        <div className="hero__glow hero__glow--right" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">С 1998 года · Санкт-Петербург</p>
          <h1 className="hero__title">
            Мебель, которая<br />
            <em>живёт вместе с домом</em>
          </h1>
          <p className="hero__text">
            «Мировое Древо» — Фабрика полного цикла. Проектируем, изготавливаем
            и устанавливаем кухни, шкафы и корпусную мебель из натуральных материалов.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="hero__btn hero__btn--primary">
              Получить расчёт
            </a>
            <a href="#gallery" className="hero__btn hero__btn--ghost">
              Смотреть работы
            </a>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>27+</dt>
              <dd>лет опыта</dd>
            </div>
            <div>
              <dt>4 800+</dt>
              <dd>реализованных проектов</dd>
            </div>
            <div>
              <dt>12</dt>
              <dd>лет гарантии на фасады</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <div className="hero__card hero__card--main">
            <div className="hero__card-image" />
            <div className="hero__card-caption">
              <strong>Кухня «Борneo»</strong>
              <span>Массив дуба · матовая эмаль</span>
            </div>
          </div>
          <div className="hero__card hero__card--accent">
            <span className="hero__badge">Под ключ</span>
            <p>Замер, 3D-проект, производство и монтаж — в одной команде</p>
          </div>
        </div>
      </div>
    </section>
  )
}
