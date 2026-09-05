import { calculateProductPrice, formatPrice } from './productPrice'
import { windowsillPageConfig } from '../data/windowsill'

export { formatPrice }

export function calculateWindowsillPrice(
  widthMm: number,
  depthMm: number,
  unpainted: boolean,
): number {
  return calculateProductPrice(widthMm, depthMm, unpainted, windowsillPageConfig.priceRates)
}
