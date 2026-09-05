import { useEffect, useMemo, useState } from 'react'
import type { GalleryImage, GalleryManifest } from '../types'
import ImageLightbox from './ImageLightbox'
import './Gallery.css'

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const imageSrcs = useMemo(
    () => images.map((image) => `/photos/${image.file}`),
    [images],
  )

  useEffect(() => {
    fetch('/photos/gallery.json')
      .then((res) => (res.ok ? res.json() : { images: [] }))
      .then((data: GalleryManifest) => setImages(data.images ?? []))
      .catch(() => setImages([]))
  }, [])

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="gallery__head">
          <p className="section-label">Галерея</p>
          <h2 className="section-title">Наши реализованные проекты</h2>
          <p className="section-lead">
            Добавляйте фотографии в папку <code>public/photos/</code> и описывайте их в{' '}
            <code>gallery.json</code> — они автоматически появятся в этой галерее.
          </p>
        </div>

        {images.length > 0 ? (
          <div className="gallery__grid">
            {images.map((image, index) => (
              <button
                key={image.file}
                type="button"
                className="gallery__item"
                onClick={() => setActiveIndex(index)}
              >
                <img src={`/photos/${image.file}`} alt={image.title} loading="lazy" />
                <span className="gallery__overlay">
                  <strong>{image.title}</strong>
                  {image.category && <small>{image.category}</small>}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="gallery__empty">
            <div className="gallery__empty-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <rect x="8" y="12" width="48" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
                <circle cx="24" cy="28" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 44l14-12 10 8 16-18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Галерея готова к наполнению</h3>
            <p>
              Положите JPG или PNG в <code>public/photos/</code> и добавьте запись в{' '}
              <code>public/photos/gallery.json</code>.
            </p>
          </div>
        )}
      </div>

      {activeIndex !== null && images[activeIndex] && (
        <ImageLightbox
          images={imageSrcs}
          index={activeIndex}
          alt={images[activeIndex].title}
          caption={images[activeIndex].title}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
        />
      )}
    </section>
  )
}
