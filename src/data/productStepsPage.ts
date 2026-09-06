import type { ProductColor, ProductColorId } from './productColors'
import type { ProductOverviewImage, ProductPriceRates } from './productPage'

export interface ProductStepsPageConfig {
  title: string
  lead: string
  overviewImages: ProductOverviewImage[]
  colors: ProductColor[]
  defaultColorId: ProductColorId
  descriptionCommon: string
  descriptionOil: string
  productionText: string
  maxWidth: number
  maxLength: number
  defaultTreadWidth: string
  defaultTreadLength: string
  defaultRiserWidth: string
  defaultRiserLength: string
  defaultPlatformWidth: string
  defaultPlatformLength: string
  treadRates: ProductPriceRates
  riserRates: ProductPriceRates
  platformRates: ProductPriceRates
  orderHeading: string
  galleryAltSuffix: string
  lightboxAlt: string
}
