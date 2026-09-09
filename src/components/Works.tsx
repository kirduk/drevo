import { useEffect, useRef, useState } from 'react'
import ImageLightbox from './ImageLightbox'
import './Works.css'

interface WorkItem {
  id: string
  image: string
  description: string
}

export default function Works() {
  const [items, setItems] = useState<WorkItem[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/sources/works/works.json')
      .then((response) => (response.ok ? response.json() : []))
      .then((data: WorkItem[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
  }, [])

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return

    const maxScroll = track.scrollWidth - track.clientWidth
    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(track.scrollLeft < maxScroll - 4)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [items])

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector<HTMLElement>('.works__card')
    const gap = 20
    const step = card ? card.offsetWidth + gap : track.clientWidth * 0.85

    track.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section id="works" className="section works">
      <div className="container">
        <div className="works__head">
          <h2 className="section-title">Наши работы</h2>
          <p className="section-lead">
            Примеры изделий, которые мы уже изготовили и установили — от подоконников и откосов
            до лестниц и других деревянных конструкций.
          </p>
        </div>

        <div className="works__carousel">
          <button
            type="button"
            className="works__nav works__nav--prev"
            aria-label="Предыдущие работы"
            disabled={!canScrollLeft}
            onClick={() => scroll('left')}
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="works__track"
            onScroll={updateScrollState}
          >
            {items.map((item, index) => (
              <article key={item.id} className="works__card">
                <button
                  type="button"
                  className="works__media"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Открыть фото: ${item.description || 'Наша работа'}`}
                >
                  <img src={item.image} alt={item.description || 'Наша работа'} loading="lazy" />
                </button>
                {item.description && <p className="works__caption">{item.description}</p>}
              </article>
            ))}
          </div>

          <button
            type="button"
            className="works__nav works__nav--next"
            aria-label="Следующие работы"
            disabled={!canScrollRight}
            onClick={() => scroll('right')}
          >
            ›
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={items.map((item) => item.image)}
          index={lightboxIndex}
          alt={items[lightboxIndex]?.description || 'Наша работа'}
          caption={items[lightboxIndex]?.description}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </section>
  )
}
