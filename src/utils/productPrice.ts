import type { ProductPriceRates } from '../data/productPage'

function roundUpTo100(value: number): number {
  return Math.ceil(value / 100) * 100
}

export function calculateProductPrice(
  widthMm: number,
  depthMm: number,
  unpainted: boolean,
  rates: ProductPriceRates,
): number {
  const width = roundUpTo100(widthMm)
  const depth = roundUpTo100(depthMm)
  const rate = unpainted ? rates.unpainted : rates.painted
  return Math.round((width * depth * rate) / 1_000_000)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}
