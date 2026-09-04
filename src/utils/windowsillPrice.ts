function roundUpTo100(value: number): number {
  return Math.ceil(value / 100) * 100
}

export function calculateWindowsillPrice(
  widthMm: number,
  depthMm: number,
  unpainted: boolean,
): number {
  const width = roundUpTo100(widthMm)
  const depth = roundUpTo100(depthMm)
  const rate = unpainted ? 18750 : 22500
  return Math.round((width * depth * rate) / 1_000_000)
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}
