import { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import { AVITO_BRAND_URL } from '../data/company'
import type { ProductStepsPageConfig } from '../data/productStepsPage'
import type { ProductColorId } from '../data/productColors'
import { getProductColorLabel } from '../data/productColors'
import { calculateProductPrice, formatPrice } from '../utils/productPrice'
import ImageLightbox from './ImageLightbox'
import './ProductOrderPage.css'

interface StepSetLine {
  id: string
  colorId: ProductColorId
  treadWidth: string
  treadLength: string
  riserWidth: string
  riserLength: string
}

interface PlatformLine {
  id: string
  colorId: ProductColorId
  width: string
  length: string
}

interface ParsedStepSet {
  line: StepSetLine
  colorLabel: string
  treadWidth: number
  treadLength: number
  riserWidth: number
  riserLength: number
  treadPrice: number
  riserPrice: number
  price: number
  valid: boolean
}

interface ParsedPlatform {
  line: PlatformLine
  colorLabel: string
  width: number
  length: number
  price: number
  valid: boolean
}

interface LightboxState {
  images: string[]
  index: number
}

interface ProductStepsPageProps {
  config: ProductStepsPageConfig
}

let lineCounter = 1

function createStepSet(config: ProductStepsPageConfig): StepSetLine {
  return {
    id: `step-${lineCounter++}`,
    colorId: config.defaultColorId,
    treadWidth: config.defaultTreadWidth,
    treadLength: config.defaultTreadLength,
    riserWidth: config.defaultRiserWidth,
    riserLength: config.defaultRiserLength,
  }
}

function createPlatform(config: ProductStepsPageConfig): PlatformLine {
  return {
    id: `platform-${lineCounter++}`,
    colorId: config.defaultColorId,
    width: config.defaultPlatformWidth,
    length: config.defaultPlatformLength,
  }
}

function isValidSize(width: number, length: number, maxWidth: number, maxLength: number): boolean {
  return width > 0 && length > 0 && width <= maxWidth && length <= maxLength
}

export default function ProductStepsPage({ config }: ProductStepsPageProps) {
  const [galleryColorId, setGalleryColorId] = useState<ProductColorId>(config.defaultColorId)
  const [stepSets, setStepSets] = useState<StepSetLine[]>(() => [createStepSet(config)])
  const [platforms, setPlatforms] = useState<PlatformLine[]>([])
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

  const parseStepSet = (line: StepSetLine): ParsedStepSet => {
    const treadWidth = Number(line.treadWidth) || 0
    const treadLength = Number(line.treadLength) || 0
    const riserWidth = Number(line.riserWidth) || 0
    const riserLength = Number(line.riserLength) || 0
    const unpainted = line.colorId === 'unpainted'
    const treadValid = isValidSize(treadWidth, treadLength, config.maxWidth, config.maxLength)
    const riserValid = isValidSize(riserWidth, riserLength, config.maxWidth, config.maxLength)
    const valid = treadValid && riserValid

    const treadPrice = treadValid
      ? calculateProductPrice(treadWidth, treadLength, unpainted, config.treadRates)
      : 0
    const riserPrice = riserValid
      ? calculateProductPrice(riserWidth, riserLength, unpainted, config.riserRates)
      : 0

    return {
      line,
      colorLabel: getProductColorLabel(config.colors, line.colorId),
      treadWidth,
      treadLength,
      riserWidth,
      riserLength,
      treadPrice,
      riserPrice,
      price: treadPrice + riserPrice,
      valid,
    }
  }

  const parsePlatform = (line: PlatformLine): ParsedPlatform => {
    const width = Number(line.width) || 0
    const length = Number(line.length) || 0
    const valid = isValidSize(width, length, config.maxWidth, config.maxLength)
    const price = valid
      ? calculateProductPrice(width, length, line.colorId === 'unpainted', config.platformRates)
      : 0

    return {
      line,
      colorLabel: getProductColorLabel(config.colors, line.colorId),
      width,
      length,
      price,
      valid,
    }
  }

  const parsedStepSets = useMemo(() => stepSets.map(parseStepSet), [stepSets, config])
  const parsedPlatforms = useMemo(() => platforms.map(parsePlatform), [platforms, config])

  const allStepSetsValid = parsedStepSets.length > 0 && parsedStepSets.every((item) => item.valid)
  const allPlatformsValid = parsedPlatforms.every((item) => item.valid)
  const allValid = allStepSetsValid && allPlatformsValid

  const totalPrice = allValid
    ? parsedStepSets.reduce((sum, item) => sum + item.price, 0) +
      parsedPlatforms.reduce((sum, item) => sum + item.price, 0)
    : null

  const orderText =
    totalPrice !== null
      ? [
          config.orderHeading,
          '',
          'Ступени с подступёнками:',
          ...parsedStepSets.map(
            (item, index) =>
              `${index + 1}. Цвет: ${item.colorLabel}\n   Ступень: ${item.treadWidth}×${item.treadLength} мм — ${formatPrice(item.treadPrice)}\n   Подступёнок: ${item.riserWidth}×${item.riserLength} мм — ${formatPrice(item.riserPrice)}\n   Итого: ${formatPrice(item.price)}`,
          ),
          ...(parsedPlatforms.length > 0
            ? [
                '',
                'Площадки:',
                ...parsedPlatforms.map(
                  (item, index) =>
                    `${index + 1}. Цвет: ${item.colorLabel}, ${item.width}×${item.length} мм — ${formatPrice(item.price)}`,
                ),
              ]
            : []),
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

  const updateStepSet = (id: string, patch: Partial<StepSetLine>) => {
    setStepSets((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const updatePlatform = (id: string, patch: Partial<PlatformLine>) => {
    setPlatforms((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const addStepSet = () => {
    setStepSets((current) => [...current, { ...createStepSet(config), colorId: galleryColorId }])
  }

  const removeStepSet = (id: string) => {
    setStepSets((current) => (current.length <= 1 ? current : current.filter((line) => line.id !== id)))
  }

  const addPlatform = () => {
    setPlatforms((current) => [...current, { ...createPlatform(config), colorId: galleryColorId }])
  }

  const removePlatform = (id: string) => {
    setPlatforms((current) => current.filter((line) => line.id !== id))
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
              <h3 className="windowsill-lines__title">Ступени с подступёнками</h3>

              {parsedStepSets.map((item, index) => (
                <div key={item.line.id} className="windowsill-lines__row">
                  <div className="windowsill-lines__head">
                    <span>
                      Ступень с подступёнком {index + 1}
                    </span>
                    {stepSets.length > 1 && (
                      <button
                        type="button"
                        className="windowsill-lines__remove"
                        onClick={() => removeStepSet(item.line.id)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>

                  <div className="windowsill-lines__grid windowsill-lines__grid--steps">
                    <label>
                      Цвет
                      <select
                        value={item.line.colorId}
                        onChange={(event) =>
                          updateStepSet(item.line.id, {
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
                      Ступень, ширина, мм
                      <input
                        type="number"
                        min={1}
                        max={config.maxWidth}
                        value={item.line.treadWidth}
                        onChange={(event) =>
                          updateStepSet(item.line.id, { treadWidth: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Ступень, длина, мм
                      <input
                        type="number"
                        min={1}
                        max={config.maxLength}
                        value={item.line.treadLength}
                        onChange={(event) =>
                          updateStepSet(item.line.id, { treadLength: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Подступёнок, ширина, мм
                      <input
                        type="number"
                        min={1}
                        max={config.maxWidth}
                        value={item.line.riserWidth}
                        onChange={(event) =>
                          updateStepSet(item.line.id, { riserWidth: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Подступёнок, длина, мм
                      <input
                        type="number"
                        min={1}
                        max={config.maxLength}
                        value={item.line.riserLength}
                        onChange={(event) =>
                          updateStepSet(item.line.id, { riserLength: event.target.value })
                        }
                      />
                    </label>
                    <div className="windowsill-lines__price windowsill-lines__price--steps">
                      <span>Стоимость</span>
                      {item.valid ? (
                        <div className="windowsill-lines__price-breakdown">
                          <strong>{formatPrice(item.price)}</strong>
                          <small>
                            ступень {formatPrice(item.treadPrice)} + подступёнок{' '}
                            {formatPrice(item.riserPrice)}
                          </small>
                        </div>
                      ) : (
                        <strong>—</strong>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="windowsill-lines__add" onClick={addStepSet}>
                Добавить ступень с подступёнком
              </button>

              <h3 className="windowsill-lines__title windowsill-lines__title--secondary">Площадки</h3>

              {parsedPlatforms.length === 0 && (
                <p className="windowsill-lines__empty">При необходимости добавьте площадки отдельно.</p>
              )}

              {parsedPlatforms.map((item, index) => (
                <div key={item.line.id} className="windowsill-lines__row">
                  <div className="windowsill-lines__head">
                    <span>Площадка {index + 1}</span>
                    <button
                      type="button"
                      className="windowsill-lines__remove"
                      onClick={() => removePlatform(item.line.id)}
                    >
                      Удалить
                    </button>
                  </div>

                  <div className="windowsill-lines__grid">
                    <label>
                      Цвет
                      <select
                        value={item.line.colorId}
                        onChange={(event) =>
                          updatePlatform(item.line.id, {
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
                        onChange={(event) => updatePlatform(item.line.id, { width: event.target.value })}
                      />
                    </label>
                    <label>
                      Длина, мм
                      <input
                        type="number"
                        min={1}
                        max={config.maxLength}
                        value={item.line.length}
                        onChange={(event) => updatePlatform(item.line.id, { length: event.target.value })}
                      />
                    </label>
                    <div className="windowsill-lines__price">
                      <span>Стоимость</span>
                      <strong>{item.valid ? formatPrice(item.price) : '—'}</strong>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="windowsill-lines__add" onClick={addPlatform}>
                Добавить площадку
              </button>

              {totalPrice !== null && (
                <p className="windowsill-lines__total">
                  Итого: <strong>{formatPrice(totalPrice)}</strong>
                </p>
              )}

              {!allValid && (
                <p className="windowsill-lines__hint">
                  Укажите для каждой позиции размеры от 1 до {config.maxWidth} × {config.maxLength} мм.
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
          aria-labelledby="steps-order-modal-title"
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

            <h2 id="steps-order-modal-title" className="windowsill-modal__title">
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
