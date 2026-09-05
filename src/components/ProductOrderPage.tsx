import { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { AVITO_BRAND_URL } from '../data/company'
import type { ProductPageConfig } from '../data/productPage'
import type { ProductColorId } from '../data/productColors'
import { getProductColorLabel } from '../data/productColors'
import { calculateProductPrice, calculateFauxbeamPrice, calculateProductVolumePrice, formatPrice } from '../utils/productPrice'
import ImageLightbox from './ImageLightbox'
import './ProductOrderPage.css'

interface OrderLine {
  id: string
  colorId: ProductColorId
  width: string
  depth: string
  height: string
}

interface ParsedLine {
  line: OrderLine
  colorLabel: string
  width: number
  depth: number
  height: number
  price: number
  valid: boolean
}

let lineCounter = 1

function createLine(config: ProductPageConfig): OrderLine {
  return {
    id: `line-${lineCounter++}`,
    colorId: config.defaultColorId,
    width: config.defaultWidth ?? '1200',
    depth: config.defaultDepth ?? config.defaultLength ?? '400',
    height: config.defaultHeight ?? '200',
  }
}

interface LightboxState {
  images: string[]
  index: number
}

interface ProductOrderPageProps {
  config: ProductPageConfig
}

export default function ProductOrderPage({ config }: ProductOrderPageProps) {
  const isVolume = config.dimensionMode === 'volume'
  const priceFormula = config.priceFormula ?? (isVolume ? 'volume' : 'area')
  const secondDimensionLabel = config.secondDimensionLabel ?? 'Глубина'
  const maxLength = config.maxLength ?? config.maxDepth
  const maxHeight = config.maxHeight ?? config.maxDepth
  const [galleryColorId, setGalleryColorId] = useState<ProductColorId>(config.defaultColorId)
  const [lines, setLines] = useState<OrderLine[]>(() => [createLine(config)])
  const [orderOpen, setOrderOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const overviewImageSrcs = useMemo(
    () => config.overviewImages.map((image) => image.src),
    [config.overviewImages],
  )

  const galleryColor = useMemo(
    () => config.colors.find((color) => color.id === galleryColorId) ?? config.colors[1],
    [config.colors, galleryColorId],
  )

  const parseLine = (line: OrderLine): ParsedLine => {
    const width = Number(line.width) || 0
    const depth = Number(line.depth) || 0
    const height = Number(line.height) || 0
    const valid = isVolume
      ? width > 0 &&
        depth > 0 &&
        height > 0 &&
        width <= config.maxWidth &&
        depth <= maxLength &&
        height <= maxHeight
      : width > 0 && depth > 0 && width <= config.maxWidth && depth <= config.maxDepth

    const price = valid
      ? priceFormula === 'fauxbeam'
        ? calculateFauxbeamPrice(
            width,
            depth,
            height,
            line.colorId === 'unpainted',
            config.priceRates,
          )
        : priceFormula === 'volume'
          ? calculateProductVolumePrice(
              width,
              depth,
              height,
              line.colorId === 'unpainted',
              config.priceRates,
            )
          : calculateProductPrice(width, depth, line.colorId === 'unpainted', config.priceRates)
      : 0

    return {
      line,
      colorLabel: getProductColorLabel(config.colors, line.colorId),
      width,
      depth,
      height,
      price,
      valid,
    }
  }

  const parsedLines = useMemo(() => lines.map(parseLine), [lines, config])
  const allValid = parsedLines.every((item) => item.valid)
  const totalPrice = allValid ? parsedLines.reduce((sum, item) => sum + item.price, 0) : null

  const orderText =
    totalPrice !== null
      ? [
          config.orderHeading,
          '',
          ...parsedLines.map((item, index) =>
            priceFormula === 'fauxbeam' || priceFormula === 'volume'
              ? `${index + 1}. Цвет: ${item.colorLabel}, ${item.width}×${item.depth}×${item.height} мм — ${formatPrice(item.price)}`
              : `${index + 1}. Цвет: ${item.colorLabel}, ${item.width}×${item.depth} мм — ${formatPrice(item.price)}`,
          ),
          '',
          `Итого: ${formatPrice(totalPrice)}`,
        ].join('\n')
      : ''

  const showOilNote = galleryColorId !== 'unpainted'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOrderOpen(false)
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

  const updateLine = (id: string, patch: Partial<OrderLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const addLine = () => {
    setLines((current) => [...current, { ...createLine(config), colorId: galleryColorId }])
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
            <h1 className="section-title">{config.title}</h1>
            <p className="section-lead">{config.lead}</p>
          </header>

          <section className="windowsill-overview" aria-label="Общие фото изделия">
            <div
              className={`windowsill-overview__row ${config.overviewImages.length > 4 ? 'windowsill-overview__row--many' : ''}`}
            >
              {config.overviewImages.map((image, index) => (
                <figure key={image.src} className="windowsill-overview__item">
                  <button
                    type="button"
                    className="windowsill-overview__button"
                    onClick={() => setLightbox({ images: overviewImageSrcs, index })}
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
              {config.descriptionCommon.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="windowsill-section windowsill-section--accent">
            <h2 className="windowsill-section__title">Сроки изготовления</h2>
            <p className="windowsill-section__lead">{config.productionText}</p>
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Выбор цвета</h2>
            <div className="windowsill-colors">
              {config.colors.map((color) => (
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
              {galleryColor.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className="windowsill-gallery__item"
                  onClick={() => setLightbox({ images: galleryColor.images, index })}
                >
                  <img
                    src={image}
                    alt={`${galleryColor.label} — ${config.galleryAltSuffix}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="windowsill-oil-note">
              {showOilNote && <p>{config.descriptionOil}</p>}
            </div>

            <div className="windowsill-lines">
              <h3 className="windowsill-lines__title">Ваш заказ</h3>

              {parsedLines.map((item, index) => (
                <div key={item.line.id} className="windowsill-lines__row">
                  <div className="windowsill-lines__head">
                    <span>
                      {config.itemLabel} {index + 1}
                    </span>
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

                  <div
                    className={`windowsill-lines__grid ${isVolume ? 'windowsill-lines__grid--volume' : ''}`}
                  >
                    <label>
                      Цвет
                      <select
                        value={item.line.colorId}
                        onChange={(event) =>
                          updateLine(item.line.id, {
                            colorId: event.target.value as ProductColorId,
                          })
                        }
                      >
                        {config.colors.map((color) => (
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
                        max={config.maxWidth}
                        value={item.line.width}
                        onChange={(event) => updateLine(item.line.id, { width: event.target.value })}
                      />
                    </label>
                    <label>
                      {isVolume ? 'Длина, мм' : `${secondDimensionLabel}, мм`}
                      <input
                        type="number"
                        min={1}
                        max={isVolume ? maxLength : config.maxDepth}
                        value={item.line.depth}
                        onChange={(event) => updateLine(item.line.id, { depth: event.target.value })}
                      />
                    </label>
                    {isVolume && (
                      <label>
                        Высота, мм
                        <input
                          type="number"
                          min={1}
                          max={maxHeight}
                          value={item.line.height}
                          onChange={(event) =>
                            updateLine(item.line.id, { height: event.target.value })
                          }
                        />
                      </label>
                    )}
                    <div className="windowsill-lines__price">
                      <span>Стоимость</span>
                      <strong>{item.valid ? formatPrice(item.price) : '—'}</strong>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="windowsill-lines__add" onClick={addLine}>
                {config.addItemLabel}
              </button>

              {totalPrice !== null && (
                <p className="windowsill-lines__total">
                  Итого: <strong>{formatPrice(totalPrice)}</strong>
                </p>
              )}

              {!allValid && (
                <p className="windowsill-lines__hint">
                  {isVolume
                    ? `Укажите для каждого изделия размеры от 1 до ${config.maxWidth} × ${maxLength} × ${maxHeight} мм.`
                    : `Укажите для каждого изделия размеры от 1 до ${config.maxWidth} × ${config.maxDepth} мм${secondDimensionLabel === 'Длина' ? ' (ширина × длина)' : ''}.`}
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

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          index={lightbox.index}
          alt={config.lightboxAlt}
          onClose={() => setLightbox(null)}
          onIndexChange={(index) => setLightbox((current) => (current ? { ...current, index } : null))}
        />
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
              — мы ответим в ближайшее время. Укажите в сообщении техническую информацию из блока
              ниже.
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
