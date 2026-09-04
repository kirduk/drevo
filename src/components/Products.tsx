import './Products.css'

const products = [
  {
    title: 'Кухни на заказ',
    description: 'Функциональные кухни с эргономичным наполнением, встроенной техникой и продуманным освещением.',
    icon: '◫',
  },
  {
    title: 'Шкафы и гардеробные',
    description: 'Встроенные и корпусные системы хранения с раздвижными, распашными и складными фасадами.',
    icon: '▣',
  },
  {
    title: 'Гостиные и стенки',
    description: 'Модульные композиции с ТВ-зоной, полками, барными секциями и скрытыми нишами.',
    icon: '▤',
  },
  {
    title: 'Мебель для детских',
    description: 'Безопасные материалы, скруглённые формы и трансформируемые решения под рост ребёнка.',
    icon: '◉',
  },
  {
    title: 'Офисная мебель',
    description: 'Рабочие места, переговорные и системы хранения для домашних кабинетов и офисов.',
    icon: '▥',
  },
  {
    title: 'Комплексные интерьеры',
    description: 'Единая концепция для всей квартиры или дома — от прихожей до спальни.',
    icon: '◈',
  },
]

export default function Products() {
  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="products__head">
          <p className="section-label">Продукция</p>
          <h2 className="section-title">Решения для каждого пространства</h2>
          <p className="section-lead">
            Производим мебель любой сложности — от лаконичных модулей до сложных встроенных конструкций
            нестандартной геометрии.
          </p>
        </div>

        <div className="products__grid">
          {products.map((product) => (
            <article key={product.title} className="products__card">
              <span className="products__icon" aria-hidden="true">
                {product.icon}
              </span>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
