import type { ProductColor, ProductColorId } from './productColors'

export interface ProductOverviewImage {
  src: string
  alt: string
}

export interface ProductPriceRates {
  unpainted: number
  painted: number
}

export interface ProductPageConfig {
  title: string
  lead: string
  overviewImages: ProductOverviewImage[]
  colors: ProductColor[]
  defaultColorId: ProductColorId
  descriptionCommon: string
  descriptionOil: string
  productionText: string
  maxWidth: number
  maxDepth: number
  priceRates: ProductPriceRates
  orderHeading: string
  itemLabel: string
  addItemLabel: string
  galleryAltSuffix: string
  lightboxAlt: string
}
