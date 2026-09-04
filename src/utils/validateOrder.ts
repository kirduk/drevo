import { calculateWindowsillPrice, formatPrice } from './windowsillPrice'
import { WINDOWSILL_MAX_DEPTH, WINDOWSILL_MAX_WIDTH, windowsillColors } from '../data/windowsill'

export interface ParsedOrderItem {
  index: number
  colorLabel: string
  width: number
  depth: number
  statedPrice: number
  expectedPrice: number
}

export interface ParsedOrder {
  items: ParsedOrderItem[]
  statedTotal: number | null
}

export interface ValidationIssue {
  message: string
}

export interface ValidationResult {
  ok: boolean
  issues: ValidationIssue[]
  order: ParsedOrder | null
}

const colorLabels = new Set(windowsillColors.map((color) => color.label))

const itemLinePattern =
  /^(?:\d+\.\s*)?Цвет:\s*(.+?),\s*(\d+)\s*[×xX]\s*(\d+)\s*мм\s*[—–-]\s*(.+)$/i

const totalLinePattern = /^Итого:\s*(.+)$/i

function parsePrice(value: string): number {
  const normalized = value.replace(/\s/g, '').replace(/[^\d.,]/g, '').replace(',', '.')
  return Math.round(Number(normalized))
}

function isUnpaintedColor(label: string): boolean {
  return label.trim().toLowerCase() === 'непокрашенный'
}

function validateItem(item: ParsedOrderItem): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!colorLabels.has(item.colorLabel)) {
    issues.push({
      message: `Позиция ${item.index}: неизвестный цвет «${item.colorLabel}».`,
    })
  }

  if (item.width <= 0 || item.width > WINDOWSILL_MAX_WIDTH) {
    issues.push({
      message: `Позиция ${item.index}: ширина ${item.width} мм вне допустимого диапазона (1–${WINDOWSILL_MAX_WIDTH}).`,
    })
  }

  if (item.depth <= 0 || item.depth > WINDOWSILL_MAX_DEPTH) {
    issues.push({
      message: `Позиция ${item.index}: глубина ${item.depth} мм вне допустимого диапазона (1–${WINDOWSILL_MAX_DEPTH}).`,
    })
  }

  if (item.statedPrice !== item.expectedPrice) {
    issues.push({
      message: `Позиция ${item.index}: цена ${formatPrice(item.statedPrice)} не совпадает с расчётной ${formatPrice(item.expectedPrice)} (${item.colorLabel}, ${item.width}×${item.depth} мм).`,
    })
  }

  return issues
}

function parseLegacyFormat(text: string): ParsedOrder | null {
  const colorMatch = text.match(/^Цвет:\s*(.+)$/im)
  const widthMatch = text.match(/^Ширина:\s*(\d+)\s*мм$/im)
  const depthMatch = text.match(/^Глубина:\s*(\d+)\s*мм$/im)
  const priceMatch = text.match(/^Цена:\s*(.+)$/im)

  if (!colorMatch || !widthMatch || !depthMatch || !priceMatch) {
    return null
  }

  const colorLabel = colorMatch[1].trim()
  const width = Number(widthMatch[1])
  const depth = Number(depthMatch[1])
  const statedPrice = parsePrice(priceMatch[1])
  const expectedPrice = calculateWindowsillPrice(width, depth, isUnpaintedColor(colorLabel))

  return {
    items: [{ index: 1, colorLabel, width, depth, statedPrice, expectedPrice }],
    statedTotal: statedPrice,
  }
}

export function parseOrderText(text: string): ParsedOrder | null {
  const trimmed = text.trim()
  if (!trimmed) return null

  const lines = trimmed
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const items: ParsedOrderItem[] = []
  let statedTotal: number | null = null

  for (const line of lines) {
    const totalMatch = line.match(totalLinePattern)
    if (totalMatch) {
      statedTotal = parsePrice(totalMatch[1])
      continue
    }

    const itemMatch = line.match(itemLinePattern)
    if (itemMatch) {
      const colorLabel = itemMatch[1].trim()
      const width = Number(itemMatch[2])
      const depth = Number(itemMatch[3])
      const statedPrice = parsePrice(itemMatch[4])
      const expectedPrice = calculateWindowsillPrice(width, depth, isUnpaintedColor(colorLabel))

      items.push({
        index: items.length + 1,
        colorLabel,
        width,
        depth,
        statedPrice,
        expectedPrice,
      })
    }
  }

  if (items.length > 0) {
    return { items, statedTotal }
  }

  return parseLegacyFormat(trimmed)
}

export function validateOrderText(text: string): ValidationResult {
  const order = parseOrderText(text)

  if (!order) {
    return {
      ok: false,
      issues: [
        {
          message:
            'Не удалось распознать техническую информацию. Проверьте формат текста из заказа.',
        },
      ],
      order: null,
    }
  }

  const issues: ValidationIssue[] = []

  for (const item of order.items) {
    issues.push(...validateItem(item))
  }

  const calculatedTotal = order.items.reduce((sum, item) => sum + item.expectedPrice, 0)
  const statedItemsTotal = order.items.reduce((sum, item) => sum + item.statedPrice, 0)

  if (order.statedTotal !== null && order.statedTotal !== calculatedTotal) {
    issues.push({
      message: `Итого ${formatPrice(order.statedTotal)} не совпадает с расчётной суммой ${formatPrice(calculatedTotal)}.`,
    })
  }

  if (order.statedTotal !== null && order.statedTotal !== statedItemsTotal) {
    issues.push({
      message: `Итого ${formatPrice(order.statedTotal)} не совпадает с суммой позиций ${formatPrice(statedItemsTotal)}.`,
    })
  }

  if (order.statedTotal === null && order.items.length > 1) {
    issues.push({
      message: 'В тексте отсутствует строка «Итого».',
    })
  }

  return {
    ok: issues.length === 0,
    issues,
    order,
  }
}

export function buildCorrectOrderText(order: ParsedOrder): string {
  const lines = order.items.map(
    (item, index) =>
      `${index + 1}. Цвет: ${item.colorLabel}, ${item.width}×${item.depth} мм — ${formatPrice(item.expectedPrice)}`,
  )
  const total = order.items.reduce((sum, item) => sum + item.expectedPrice, 0)

  return ['Заказ: Подоконники', '', ...lines, '', `Итого: ${formatPrice(total)}`].join('\n')
}
