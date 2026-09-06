import { YANDEX_MAP_URL } from '../data/company'
import './Delivery.css'

const YANDEX_MAP_EMBED =
  'https://yandex.ru/map-widget/v1/?oid=63951310805&ol=biz&z=17&l=map'

const options = [
  {
    title: 'Самовывоз',
    highlight: true,
    content: (
      <>
        <p>
          Забрать заказ можно самостоятельно: <strong>пн–пт с 10:00 до 18:00</strong>, в субботу — по
          предварительной договорённости.
        </p>
        <p className="delivery__address">
          <strong>Адрес:</strong> наб. реки Екатерингофки, 29-31Т, Санкт-Петербург
        </p>
      </>
    ),
  },
  {
    title: 'Доставка по Санкт-Петербургу',
    content: (
      <p>
        По городу можем организовать доставку через <strong>Яндекс Грузовой</strong>. Стоимость
        перевозки рассчитывается сервисом и оплачивается покупателем отдельно — мы аккуратно передадим
        изделие курьеру в согласованное время.
      </p>
    ),
  },
  {
    title: 'Отправка по России',
    content: (
      <p>
        Для других городов передадим заказ в транспортную компанию — <strong>СДЭК</strong> или{' '}
        <strong>Деловые Линии</strong>. Тариф и срок доставки зависят от направления; оплата
        перевозки — на стороне покупателя при получении или по правилам выбранной компании.
      </p>
    ),
  },
]

export default function Delivery() {
  return (
    <section id="delivery" className="section delivery">
      <div className="container">
        <div className="delivery__head">
          <h2 className="section-title">Доставка и самовывоз</h2>
          <p className="section-lead">
            Выберите удобный способ получения заказа — заберите с производства, доставим по
            Санкт-Петербургу или отправим в ваш город.
          </p>
        </div>

        <div className="delivery__grid">
          {options.map((option) => (
            <article
              key={option.title}
              className={`delivery__card ${option.highlight ? 'delivery__card--highlight' : ''}`}
            >
              <h3>{option.title}</h3>
              {option.content}
            </article>
          ))}
        </div>

        <div className="delivery__map-wrap">
          <div className="delivery__map-head">
            <h3>Как нас найти</h3>
            <a href={YANDEX_MAP_URL} target="_blank" rel="noreferrer">
              Открыть в Яндекс Картах
            </a>
          </div>
          <iframe
            title="Мировое Древо на карте"
            src={YANDEX_MAP_EMBED}
            allowFullScreen
            loading="lazy"
            className="delivery__map"
          />
        </div>
      </div>
    </section>
  )
}
