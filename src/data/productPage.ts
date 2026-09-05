import type { ProductColor, ProductColorId } from './productColors'

export interface ProductOverviewImage {
  src: string
  alt: string
}

export interface ProductPriceRates {
  unpainted: number
  painted: number
}

export type ProductDimensionMode = 'area' | 'volume'

export type ProductPriceFormula = 'area' | 'volume' | 'fauxbeam'

export interface ProductPageConfig {
  title: string
  lead: string
  overviewImages: ProductOverviewImage[]
  colors: ProductColor[]
  defaultColorId: ProductColorId
  descriptionCommon: string
  descriptionOil: string
  productionText: string
  dimensionMode?: ProductDimensionMode
  priceFormula?: ProductPriceFormula
  maxWidth: number
  maxDepth: number
  maxLength?: number
  maxHeight?: number
  defaultWidth?: string
  defaultDepth?: string
  defaultLength?: string
  defaultHeight?: string
  secondDimensionLabel?: string
  priceRates: ProductPriceRates
  orderHeading: string
  itemLabel: string
  addItemLabel: string
  galleryAltSuffix: string
  lightboxAlt: string
}
