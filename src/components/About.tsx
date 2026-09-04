import './About.css'

const features = [
  {
    title: 'Собственное производство',
    text: 'Цех площадью 2 400 м² с современным оборудованием и контролем качества на каждом этапе.',
  },
  {
    title: 'Натуральные материалы',
    text: 'Массив дерева, шпон, МДФ класса E0 и фурнитура европейских брендов.',
  },
  {
    title: 'Индивидуальный проект',
    text: '3D-визуализация, точный замер и согласование каждой детали до запуска в работу.',
  },
  {
    title: 'Монтаж и сервис',
    text: 'Собственные бригады установщиков и постгарантийное обслуживание.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__intro">
          <p className="section-label">О фабрике</p>
          <h2 className="section-title">Создаём мебель с характером и точностью</h2>
          <p className="section-lead">
            Мы объединяем ремесленный подход и современные технологии, чтобы каждый проект
            был функциональным, долговечным и эстетичным — от загородного дома до городской квартиры.
          </p>
        </div>

        <div className="about__features">
          {features.map((feature) => (
            <article key={feature.title} className="about__feature">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
