import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  AVITO_BRAND_URL,
  DEFAULT_WINDOWSILL_COLOR,
  WINDOWSILL_MAX_DEPTH,
  WINDOWSILL_MAX_WIDTH,
  getWindowsillColorLabel,
  windowsillColors,
  windowsillDescriptionCommon,
  windowsillDescriptionOil,
  windowsillOverviewImages,
  windowsillProductionText,
  type WindowsillColorId,
} from '../data/windowsill'
import { calculateWindowsillPrice, formatPrice } from '../utils/windowsillPrice'
import './WindowsillPage.css'

interface WindowsillLine {
  id: string
  colorId: WindowsillColorId
  width: string
  depth: string
}

interface ParsedLine {
  line: WindowsillLine
  colorLabel: string
  width: number
  depth: number
  price: number
  valid: boolean
}

let lineCounter = 1

function createLine(colorId: WindowsillColorId = DEFAULT_WINDOWSILL_COLOR): WindowsillLine {
  return {
    id: `line-${lineCounter++}`,
    colorId,
    width: '1200',
    depth: '400',
  }
}

function parseLine(line: WindowsillLine): ParsedLine {
  const width = Number(line.width) || 0
  const depth = Number(line.depth) || 0
  const valid =
    width > 0 &&
    depth > 0 &&
    width <= WINDOWSILL_MAX_WIDTH &&
    depth <= WINDOWSILL_MAX_DEPTH

  const price = valid
    ? calculateWindowsillPrice(width, depth, line.colorId === 'unpainted')
    : 0

  return {
    line,
    colorLabel: getWindowsillColorLabel(line.colorId),
    width,
    depth,
    price,
    valid,
  }
}

function buildOrderText(items: ParsedLine[], total: number): string {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. Цвет: ${item.colorLabel}, ${item.width}×${item.depth} мм — ${formatPrice(item.price)}`,
  )

  return ['Заказ: Подоконники', '', ...lines, '', `Итого: ${formatPrice(total)}`].join('\n')
}

export default function WindowsillPage() {
  const [galleryColorId, setGalleryColorId] = useState<WindowsillColorId>(DEFAULT_WINDOWSILL_COLOR)
  const [lines, setLines] = useState<WindowsillLine[]>(() => [createLine()])
  const [orderOpen, setOrderOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const galleryColor = useMemo(
    () => windowsillColors.find((color) => color.id === galleryColorId) ?? windowsillColors[1],
    [galleryColorId],
  )

  const parsedLines = useMemo(() => lines.map(parseLine), [lines])
  const allValid = parsedLines.every((item) => item.valid)
  const totalPrice = allValid ? parsedLines.reduce((sum, item) => sum + item.price, 0) : null
  const orderText = totalPrice !== null ? buildOrderText(parsedLines, totalPrice) : ''
  const showOilNote = galleryColorId !== 'unpainted'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const updateLine = (id: string, patch: Partial<WindowsillLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const addLine = () => {
    setLines((current) => [...current, createLine(galleryColorId)])
  }

  const removeLine = (id: string) => {
    setLines((current) => (current.length <= 1 ? current : current.filter((line) => line.id !== id)))
  }

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
          <header className="windowsill-page__hero">
            <h1 className="section-title">Подоконники</h1>
            <p className="section-lead">
              Деревянные подоконники из массива дуба и шпона с точной подгонкой под ваш проём.
            </p>
          </header>

          <section className="windowsill-overview" aria-label="Общие фото изделия">
            <div className="windowsill-overview__row">
              {windowsillOverviewImages.map((image) => (
                <figure key={image.src} className="windowsill-overview__item">
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
              {windowsillDescriptionCommon.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="windowsill-section windowsill-section--accent">
            <h2 className="windowsill-section__title">Сроки изготовления</h2>
            <p className="windowsill-section__lead">{windowsillProductionText}</p>
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Выбор цвета</h2>
            <div className="windowsill-colors">
              {windowsillColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`windowsill-colors__btn ${galleryColorId === color.id ? 'windowsill-colors__btn--active' : ''}`}
                  onClick={() => setGalleryColorId(color.id)}
                >
                  {color.label}
                </button>
              ))}
            </div>

            <div className="windowsill-gallery">
              {galleryColor.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  className="windowsill-gallery__item"
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt={`${galleryColor.label} — подоконник`} loading="lazy" />
                </button>
              ))}
            </div>

            <div className={`windowsill-oil-note ${showOilNote ? 'windowsill-oil-note--visible' : ''}`}>
              {showOilNote && <p>{windowsillDescriptionOil}</p>}
            </div>

            <div className="windowsill-lines">
              <h3 className="windowsill-lines__title">Ваш заказ</h3>

              {parsedLines.map((item, index) => (
                <div key={item.line.id} className="windowsill-lines__row">
                  <div className="windowsill-lines__head">
                    <span>Подоконник {index + 1}</span>
                    {lines.length > 1 && (
                      <button
                        type="button"
                        className="windowsill-lines__remove"
                        onClick={() => removeLine(item.line.id)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>

                  <div className="windowsill-lines__grid">
                    <label>
                      Цвет
                      <select
                        value={item.line.colorId}
                        onChange={(event) =>
                          updateLine(item.line.id, {
                            colorId: event.target.value as WindowsillColorId,
                          })
                        }
                      >
                        {windowsillColors.map((color) => (
                          <option key={color.id} value={color.id}>
                            {color.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Ширина, мм
                      <input
                        type="number"
                        min={1}
                        max={WINDOWSILL_MAX_WIDTH}
                        value={item.line.width}
                        onChange={(event) => updateLine(item.line.id, { width: event.target.value })}
                      />
                    </label>
                    <label>
                      Глубина, мм
                      <input
                        type="number"
                        min={1}
                        max={WINDOWSILL_MAX_DEPTH}
                        value={item.line.depth}
                        onChange={(event) => updateLine(item.line.id, { depth: event.target.value })}
                      />
                    </label>
                    <div className="windowsill-lines__price">
                      <span>Стоимость</span>
                      <strong>{item.valid ? formatPrice(item.price) : '—'}</strong>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="windowsill-lines__add" onClick={addLine}>
                Добавить подоконник
              </button>

              {totalPrice !== null && (
                <p className="windowsill-lines__total">
                  Итого: <strong>{formatPrice(totalPrice)}</strong>
                </p>
              )}

              {!allValid && (
                <p className="windowsill-lines__hint">
                  Укажите для каждого подоконника размеры от 1 до {WINDOWSILL_MAX_WIDTH} ×{' '}
                  {WINDOWSILL_MAX_DEPTH} мм.
                </p>
              )}

              <button
                type="button"
                className="windowsill-lines__order"
                disabled={totalPrice === null}
                onClick={() => setOrderOpen(true)}
              >
                Заказать
              </button>
            </div>
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

      {orderOpen && totalPrice !== null && (
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
              Напишите нам на{' '}
              <a href={AVITO_BRAND_URL} target="_blank" rel="noreferrer">
                Авито
              </a>{' '}
              — мы ответим в ближайшее время. Укажите в сообщении техническую информацию из блока ниже.
            </p>

            <a
              className="windowsill-modal__avito"
              href={AVITO_BRAND_URL}
              target="_blank"
              rel="noreferrer"
            >
              Перейти на Авито
            </a>

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
