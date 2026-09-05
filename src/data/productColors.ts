export type ProductColorId = 'unpainted' | 'oak' | 'light_oak' | 'nut' | 'black'

export interface ProductColor {
  id: ProductColorId
  label: string
  images: string[]
}

const colorLabels: Record<ProductColorId, string> = {
  unpainted: 'Непокрашенный',
  oak: 'Дуб',
  light_oak: 'Светлый дуб',
  nut: 'Орех',
  black: 'Чёрный',
}

export function buildProductColors(
  base: string,
  filesByColor: Record<ProductColorId, string[]>,
): ProductColor[] {
  return (Object.keys(filesByColor) as ProductColorId[]).map((id) => ({
    id,
    label: colorLabels[id],
    images: filesByColor[id].map((file) => `${base}/${id}/${encodeURIComponent(file)}`),
  }))
}

export function getProductColorLabel(
  colors: ProductColor[],
  colorId: ProductColorId,
): string {
  return colors.find((color) => color.id === colorId)?.label ?? colorId
}
