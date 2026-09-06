import { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import { AVITO_BRAND_URL } from '../data/company'
import type { ProductQuotePageConfig } from '../data/productQuotePage'
import ImageLightbox from './ImageLightbox'
import './ProductOrderPage.css'

interface LightboxState {
  images: string[]
  index: number
}

interface ProductQuotePageProps {
  config: ProductQuotePageConfig
}

function ImageGrid({
  images,
  many,
  onOpen,
}: {
  images: ProductQuotePageConfig['showcaseImages']
  many?: boolean
  onOpen: (srcs: string[], index: number) => void
}) {
  const srcs = useMemo(() => images.map((image) => image.src), [images])

  return (
    <div className={`windowsill-overview__row ${many ? 'windowsill-overview__row--many' : ''}`}>
      {images.map((image, index) => (
        <figure key={image.src} className="windowsill-overview__item">
          <button
            type="button"
            className="windowsill-overview__button"
            onClick={() => onOpen(srcs, index)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        </figure>
      ))}
    </div>
  )
}

export default function ProductQuotePage({ config }: ProductQuotePageProps) {
  const [orderOpen, setOrderOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const orderText = `${config.orderHeading}\n\n${config.orderMessage}`

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(orderText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index })
  }

  return (
    <>
      <Header />
      <main className="windowsill-page">
        <div className="container">
          <header className="windowsill-page__hero">
            <h1 className="section-title">{config.title}</h1>
            {Array.isArray(config.lead) ? (
              <p className="section-lead section-lead--fixed-lines">
                {config.lead.map((line) => (
                  <span key={line} className="section-lead__line">
                    {line}
                  </span>
                ))}
              </p>
            ) : (
              <p className="section-lead">{config.lead}</p>
            )}
          </header>

          <section className="windowsill-overview" aria-label={config.showcaseTitle}>
            <h2 className="windowsill-section__title">{config.showcaseTitle}</h2>
            <ImageGrid
              images={config.showcaseImages}
              many={config.showcaseImages.length > 4}
              onOpen={openLightbox}
            />
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Описание</h2>
            <div className="windowsill-section__text">
              {config.description.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="windowsill-section windowsill-section--accent">
            <h2 className="windowsill-section__title">Стоимость</h2>
            <p className="windowsill-section__lead">{config.priceText}</p>
          </section>

          <section className="windowsill-overview" aria-label={config.portfolioTitle}>
            <h2 className="windowsill-section__title">{config.portfolioTitle}</h2>
            <ImageGrid images={config.portfolioImages} onOpen={openLightbox} />
          </section>

          <section className="windowsill-section">
            <h2 className="windowsill-section__title">Заказ</h2>
            <p className="windowsill-section__text">
              Свяжитесь с нами — обсудим ваш проект, подготовим 3D-визуализацию и рассчитаем
              стоимость индивидуально.
            </p>
            <button
              type="button"
              className="windowsill-lines__order"
              onClick={() => setOrderOpen(true)}
            >
              Заказать
            </button>
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

      {orderOpen && (
        <div
          className="windowsill-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-order-modal-title"
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

            <h2 id="quote-order-modal-title" className="windowsill-modal__title">
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
