import { useEffect } from 'react'
import './ImageLightbox.css'

interface ImageLightboxProps {
  images: string[]
  index: number
  alt: string
  caption?: string
  onClose: () => void
  onIndexChange: (index: number) => void
}

export default function ImageLightbox({
  images,
  index,
  alt,
  caption,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const hasPrev = index > 0
  const hasNext = index < images.length - 1
  const showNav = images.length > 1

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'ArrowLeft' && hasPrev) {
        onIndexChange(index - 1)
      }

      if (event.key === 'ArrowRight' && hasNext) {
        onIndexChange(index + 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, hasPrev, hasNext, onClose, onIndexChange])

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="image-lightbox__content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="image-lightbox__close" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>

        {showNav && (
          <button
            type="button"
            className="image-lightbox__nav image-lightbox__nav--prev"
            aria-label="Предыдущее фото"
            disabled={!hasPrev}
            onClick={() => hasPrev && onIndexChange(index - 1)}
          >
            ‹
          </button>
        )}

        <img src={images[index]} alt={alt} />

        {showNav && (
          <button
            type="button"
            className="image-lightbox__nav image-lightbox__nav--next"
            aria-label="Следующее фото"
            disabled={!hasNext}
            onClick={() => hasNext && onIndexChange(index + 1)}
          >
            ›
          </button>
        )}

        {caption && <p className="image-lightbox__caption">{caption}</p>}
      </div>
    </div>
  )
}
