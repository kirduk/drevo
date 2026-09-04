import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  DEFAULT_WINDOWSILL_COLOR,
  WINDOWSILL_MAX_DEPTH,
  WINDOWSILL_MAX_WIDTH,
  windowsillColors,
  windowsillDescriptionPainted,
  windowsillDescriptionUnpainted,
  windowsillOverviewImages,
  windowsillProductionPainted,
  windowsillProductionUnpainted,
  type WindowsillColorId,
} from '../data/windowsill'
import { calculateWindowsillPrice, formatPrice } from '../utils/windowsillPrice'
import './WindowsillPage.css'

function buildOrderText(
  colorLabel: string,
  width: number,
  depth: number,
  price: number,
): string {
  return [
    'Изделие: Подоконник',
    `Цвет: ${colorLabel}`,
    `Ширина: ${width} мм`,
    `Глубина: ${depth} мм`,
    `Цена: ${formatPrice(price)}`,
  ].join('\n')
}

export default function WindowsillPage() {
  const [colorId, setColorId] = useState<WindowsillColorId>(DEFAULT_WINDOWSILL_COLOR)
  const [width, setWidth] = useState('1200')
  const [depth, setDepth] = useState('400')
  const [orderOpen, setOrderOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const selectedColor = useMemo(
    () => windowsillColors.find((color) => color.id === colorId) ?? windowsillColors[1],
    [colorId],
  )

  const widthValue = Number(width) || 0
  const depthValue = Number(depth) || 0
  const isUnpainted = colorId === 'unpainted'
  const isValidSize =
    widthValue > 0 &&
    depthValue > 0 &&
    widthValue <= WINDOWSILL_MAX_WIDTH &&
    depthValue <= WINDOWSILL_MAX_DEPTH

  const price = isValidSize
    ? calculateWindowsillPrice(widthValue, depthValue, isUnpainted)
    : null

  const orderText =
    price !== null
      ? buildOrderText(selectedColor.label, widthValue, depthValue, price)
      : ''

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOrderOpen(false)
        setActiveImage(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = orderOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [orderOpen])

  const handleCopy = async () => {
    if (!orderText) return
    await navigator.clipboard.writeText(orderText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Header />
      <main className="windowsill-page">
        <div className="container">
          <Link to="/#products" className="windowsill-page__back">
            ← К продукции
          </Link>

          <header className="windowsill-page__hero">
            <p className="section-label">Продукция</p>
            <h1 className="section-title">Подоконники</h1>
            <p className="section-lead">
              Деревянные подоконники из массива дуба и шпона с точной подгонкой под ваш проём.
            </p>
          </header>

          <section className="windowsill-overview" aria-label="Общие фото изделия">
            <div className="windowsill-overview__grid">
              {windowsillOverviewImages.map((image) => (
                <figure
                  key={image.src}
                  className={`windowsill-overview__item ${image.wide ? 'windowsill-overview__item--wide' : ''}`}
                >
                  <button
                    type="button"
                    className="windowsill-overview__button"
                    onClick={() => setActiveImage(image.src)}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </button>
                  <figcaption>{image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Описание изделия</h2>
            <div className="windowsill-section__text">
              {(isUnpainted ? windowsillDescriptionUnpainted : windowsillDescriptionPainted)
                .split('\n\n')
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
            </div>
          </section>

          <section className="windowsill-section windowsill-section--accent">
            <h2 className="windowsill-section__title">Сроки изготовления</h2>
            <p className="windowsill-section__lead">
              {isUnpainted ? windowsillProductionUnpainted : windowsillProductionPainted}
            </p>
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Выбор цвета</h2>
            <div className="windowsill-colors">
              {windowsillColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`windowsill-colors__btn ${colorId === color.id ? 'windowsill-colors__btn--active' : ''}`}
                  onClick={() => setColorId(color.id)}
                >
                  {color.label}
                </button>
              ))}
            </div>

            <div className="windowsill-gallery">
              {selectedColor.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  className="windowsill-gallery__item"
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt={`${selectedColor.label} — подоконник`} loading="lazy" />
                </button>
              ))}
            </div>
          </section>

          <section className="windowsill-section windowsill-calculator">
            <h2 className="windowsill-section__title">Размер и стоимость</h2>
            <div className="windowsill-calculator__grid">
              <label>
                Ширина, мм
                <input
                  type="number"
                  min={1}
                  max={WINDOWSILL_MAX_WIDTH}
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  placeholder={`до ${WINDOWSILL_MAX_WIDTH}`}
                />
              </label>
              <label>
                Глубина, мм
                <input
                  type="number"
                  min={1}
                  max={WINDOWSILL_MAX_DEPTH}
                  value={depth}
                  onChange={(event) => setDepth(event.target.value)}
                  placeholder={`до ${WINDOWSILL_MAX_DEPTH}`}
                />
              </label>
            </div>

            {!isValidSize && (width || depth) && (
              <p className="windowsill-calculator__hint windowsill-calculator__hint--error">
                Укажите размеры от 1 до {WINDOWSILL_MAX_WIDTH} × {WINDOWSILL_MAX_DEPTH} мм.
              </p>
            )}

            {price !== null && (
              <p className="windowsill-calculator__price">
                Расчётная стоимость: <strong>{formatPrice(price)}</strong>
              </p>
            )}

            <button
              type="button"
              className="windowsill-calculator__order"
              disabled={price === null}
              onClick={() => setOrderOpen(true)}
            >
              Заказать
            </button>
          </section>
        </div>
      </main>
      <Footer />

      {activeImage && (
        <div
          className="windowsill-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div className="windowsill-lightbox__content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="windowsill-lightbox__close"
              aria-label="Закрыть"
              onClick={() => setActiveImage(null)}
            >
              ×
            </button>
            <img src={activeImage} alt="Увеличенное фото подоконника" />
          </div>
        </div>
      )}

      {orderOpen && price !== null && (
        <div
          className="windowsill-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-modal-title"
          onClick={() => setOrderOpen(false)}
        >
          <div className="windowsill-modal__dialog" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="windowsill-modal__close"
              aria-label="Закрыть"
              onClick={() => setOrderOpen(false)}
            >
              ×
            </button>

            <h2 id="order-modal-title" className="windowsill-modal__title">
              Оформление заказа
            </h2>
            <p className="windowsill-modal__text">
              Напишите нам на Авито — мы ответим в ближайшее время. Укажите в сообщении
              техническую информацию из блока ниже.
            </p>

            <div className="windowsill-modal__tech">
              <div className="windowsill-modal__tech-head">
                <span>Техническая информация</span>
                <button type="button" className="windowsill-modal__copy" onClick={handleCopy}>
                  {copied ? (
                    'Скопировано'
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                        <path
                          d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                      Копировать
                    </>
                  )}
                </button>
              </div>
              <pre>{orderText}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
