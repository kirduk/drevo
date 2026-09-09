import './About.css'
import { COMPANY_CITY, COMPANY_FOUNDED_YEAR } from '../data/company'

const features = [
  {
    title: 'Собственное производство',
    text: 'Цех с современным оборудованием и контролем качества на каждом этапе.',
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
    text: 'Сложные проекты, такие как лестницы, устанавливают те же мастера, что их и изготавливают.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__intro">
          <h2 className="section-title">Создаём мебель с характером и точностью</h2>
          <p className="section-lead">
            С {COMPANY_FOUNDED_YEAR} года работаем в {COMPANY_CITY}, объединяя ремесленный подход
            и современные технологии — чтобы каждый проект был функциональным, долговечным
            и эстетичным.
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
