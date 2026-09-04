export type WindowsillColorId = 'unpainted' | 'oak' | 'light_oak' | 'nut' | 'black'

export interface WindowsillColor {
  id: WindowsillColorId
  label: string
  folder: string
  images: string[]
}

const base = '/sources/windowsill'

export const AVITO_BRAND_URL =
  'https://www.avito.ru/brands/i364134655/all/remont_i_stroitelstvo?sellerId=24446db8f7cea6b9df0b71f5cda7f156'

export const windowsillOverviewImages = [
  { src: `${base}/all_colours.png`, alt: 'Подоконники — все цвета' },
  { src: `${base}/add.jpg`, alt: 'Дополнительные элементы подоконника' },
  { src: `${base}/diff.jpg`, alt: 'Особенности конструкции' },
  { src: `${base}/scheme.png`, alt: 'Схема подоконника' },
]

export const windowsillColors: WindowsillColor[] = [
  {
    id: 'unpainted',
    label: 'Непокрашенный',
    folder: 'unpainted',
    images: ['4.jpg', '5.jpg', '6.jpg'].map((file) => `${base}/unpainted/${file}`),
  },
  {
    id: 'oak',
    label: 'Дуб',
    folder: 'oak',
    images: ['6.4.png', '7.4.png', '8.4.png'].map((file) => `${base}/oak/${file}`),
  },
  {
    id: 'light_oak',
    label: 'Светлый дуб',
    folder: 'light_oak',
    images: ['6.jpg', '7.jpg', 'IMG_20260326_093311 (1).jpg'].map(
      (file) => `${base}/light_oak/${encodeURIComponent(file)}`,
    ),
  },
  {
    id: 'nut',
    label: 'Орех',
    folder: 'nut',
    images: ['6.1.png', '7.1.png', '8.1.png'].map((file) => `${base}/nut/${file}`),
  },
  {
    id: 'black',
    label: 'Чёрный',
    folder: 'black',
    images: ['6.png', '7.11.png', '8.png'].map((file) => `${base}/black/${file}`),
  },
]

export const DEFAULT_WINDOWSILL_COLOR: WindowsillColorId = 'oak'

export const windowsillDescriptionCommon = `Подоконник из массива дуба, толстого дубового шпона и влагостойкой фанеры. Данная конфигурация позволяет добиться максимальной устойчивости к изменению формы дерева под влиянием времени и перепада температур.

Дубовый шпон — это тот же дуб, что и массив, просто распиленный вдоль дерева. И в отличие от массива дубовый шпон даёт более красивый рисунок дерева.

Толщина подоконника — 16,5 мм, видимой части — 40 мм. Толщина дубового шпона — 1,5 мм.`

export const windowsillDescriptionOil = `Изделие покрыто в два слоя немецким маслом фирмы SAICOS. Данное масло является натуральным и экологически чистым. Имеет сертификаты пожарной безопасности. Разрешено для детского использования и использованию в детских садах.`

export const windowsillProductionText =
  'Непокрашенный подоконник — 1 неделя. Покрашенный — 2 недели, так как масло сохнет между нанесением слоёв.'

export const WINDOWSILL_MAX_WIDTH = 2500
export const WINDOWSILL_MAX_DEPTH = 1200

export function getWindowsillColorLabel(colorId: WindowsillColorId): string {
  return windowsillColors.find((color) => color.id === colorId)?.label ?? colorId
}
