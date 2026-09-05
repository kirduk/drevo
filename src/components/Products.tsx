import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ImageLightbox from './ImageLightbox'
import './Products.css'

interface ProductLightboxState {
  images: string[]
  index: number
  title: string
}

export default function Products() {
  const [lightbox, setLightbox] = useState<ProductLightboxState | null>(null)

  const openLightbox = (images: string[], index: number, title: string) => {
    setLightbox({ images, index, title })
  }

  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="products__head">
          <h2 className="section-title">Что мы изготавливаем</h2>
          <p className="section-lead">
            Производим изделия из натурального дерева для окон, лестниц и интерьера — от подоконников
            и откосов до столешниц, декоративных балок и лестничных конструкций.
          </p>
        </div>

        <div className="products__grid">
          {products.map((product) => {
            const cardContent = (
              <>
                <div className="products__media">
                  {product.images.length > 0 ? (
                    <>
                      <div className="products__cover">
                        <img src={product.images[0]} alt={product.title} loading="lazy" />
                      </div>
                      {product.images.length > 1 && (
                        <div className="products__thumbs">
                          {product.images.slice(1, 5).map((image) => (
                            <div key={image} className="products__thumb">
                              <img src={image} alt="" loading="lazy" />
                            </div>
                          ))}
                          {product.images.length > 5 && (
                            <span className="products__more">+{product.images.length - 5}</span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="products__placeholder">
                      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                        <rect x="8" y="12" width="48" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="24" cy="28" r="5" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M12 44l14-12 10 8 16-18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>Фото скоро появятся</span>
                    </div>
                  )}
                </div>

                <div className="products__body">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  {product.href ? (
                    <p className="products__count">Подробнее →</p>
                  ) : (
                    product.images.length > 0 && (
                      <p className="products__count">{product.images.length} фото</p>
                    )
                  )}
                </div>
              </>
            )

            if (product.href) {
              return (
                <Link key={product.id} to={product.href} className="products__card products__card--link">
                  {cardContent}
                </Link>
              )
            }

            return (
              <article key={product.id} className="products__card">
                <div className="products__media">
                  {product.images.length > 0 ? (
                    <>
                      <button
                        type="button"
                        className="products__cover"
                        onClick={() => openLightbox(product.images, 0, product.title)}
                      >
                        <img src={product.images[0]} alt={product.title} loading="lazy" />
                      </button>
                      {product.images.length > 1 && (
                        <div className="products__thumbs">
                          {product.images.slice(1, 5).map((image, index) => (
                            <button
                              key={image}
                              type="button"
                              className="products__thumb"
                              onClick={() => openLightbox(product.images, index + 1, product.title)}
                            >
                              <img src={image} alt="" loading="lazy" />
                            </button>
                          ))}
                          {product.images.length > 5 && (
                            <span className="products__more">+{product.images.length - 5}</span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="products__placeholder">
                      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                        <rect x="8" y="12" width="48" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
                        <circle cx="24" cy="28" r="5" stroke="currentColor" strokeWidth="2" />
                        <path
                          d="M12 44l14-12 10 8 16-18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>Фото скоро появятся</span>
                    </div>
                  )}
                </div>

                <div className="products__body">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  {product.images.length > 0 && (
                    <p className="products__count">{product.images.length} фото</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          index={lightbox.index}
          alt={lightbox.title}
          caption={lightbox.title}
          onClose={() => setLightbox(null)}
          onIndexChange={(index) => setLightbox((current) => (current ? { ...current, index } : null))}
        />
      )}
    </section>
  )
}
