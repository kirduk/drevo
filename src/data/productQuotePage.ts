import type { ProductOverviewImage } from './productPage'

export interface ProductQuotePageConfig {
  title: string
  lead: string | string[]
  showcaseTitle: string
  showcaseImages: ProductOverviewImage[]
  portfolioTitle: string
  portfolioImages: ProductOverviewImage[]
  description: string
  priceTitle: string
  priceText: string
  orderHeading: string
  orderMessage: string
  lightboxAlt: string
}
