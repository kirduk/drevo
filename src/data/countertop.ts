import { buildProductColors } from './productColors'
import type { ProductColor } from './productColors'
import type { ProductPageConfig } from './productPage'

const base = '/sources/countertop'

const paintedColors = buildProductColors(base, {
  unpainted: [],
  oak: ['colour.png'],
  light_oak: ['colour.jpg'],
  nut: ['colour.png'],
  black: ['colour.png'],
}).filter((color) => color.id !== 'unpainted')

const colors: ProductColor[] = [
  {
    id: 'unpainted',
    label: 'Непокрашенный',
    images: [`${base}/1.jpg`, `${base}/2.jpg`, `${base}/3.jpg`],
  },
  ...paintedColors,
]

export const countertopPageConfig: ProductPageConfig = {
  title: 'Столешницы',
  lead: 'Столешницы для кухни, столов и барных зон из массива дуба и шпона — по вашим размерам и в выбранном цвете.',
  overviewImages: [
    { src: `${base}/all_colours.png`, alt: 'Столешницы — все цвета' },
    { src: `${base}/1.jpg`, alt: 'Столешница' },
    { src: `${base}/2.jpg`, alt: 'Столешница — вид 2' },
    { src: `${base}/3.jpg`, alt: 'Столешница — вид 3' },
    { src: `${base}/diff.jpg`, alt: 'Особенности конструкции' },
    { src: `${base}/scheme.jpg`, alt: 'Схема столешницы' },
  ],
  colors,
  defaultColorId: 'oak',
  descriptionCommon: `Изготовление столешниц по вашим размерам.

Столешница из массива дуба, толстого дубового шпона и влагостойкой фанеры. Данная конфигурация позволяет добиться максимальной устойчивости к изменению формы дерева под влиянием времени и перепада температур.

Дубовый шпон — это тот же дуб, что и массив, просто распиленный вдоль дерева. И в отличие от массива дубовый шпон даёт более красивый рисунок дерева.

Толщина столешницы — 19,5 мм, видимой части — 40 мм. Толщина дубового шпона — 1,5 мм.`,
  descriptionOil:
    'Изделие покрыто в два слоя немецким маслом фирмы SAICOS. Данное масло является натуральным и экологически чистым. Имеет сертификаты пожарной безопасности. Разрешено для детского использования и использованию в детских садах.',
  productionText:
    'Непокрашенная столешница — 1 неделя. Покрашенная — 2 недели, так как масло сохнет между нанесением слоёв.',
  secondDimensionLabel: 'Длина',
  maxWidth: 2500,
  maxDepth: 3000,
  defaultWidth: '1200',
  defaultDepth: '600',
  priceRates: { unpainted: 18750, painted: 22500 },
  orderHeading: 'Заказ: Столешницы',
  itemLabel: 'Столешница',
  addItemLabel: 'Добавить столешницу',
  galleryAltSuffix: 'столешница',
  lightboxAlt: 'Увеличенное фото столешницы',
}
