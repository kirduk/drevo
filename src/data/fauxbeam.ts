import { buildProductColors } from './productColors'
import type { ProductPageConfig } from './productPage'

const base = '/sources/fauxbeam'

export const fauxbeamPageConfig: ProductPageConfig = {
  title: 'Фальшбалки',
  lead: 'Декоративные фальшбалки из дубового шпона и влагостойкой фанеры — для потолков и стен с характерным рисунком дерева.',
  overviewImages: [
    { src: `${base}/all_colours.png`, alt: 'Фальшбалки — все цвета' },
    { src: `${base}/1.jpg`, alt: 'Фальшбалка' },
    { src: `${base}/2.jpg`, alt: 'Фальшбалка — вид 2' },
    { src: `${base}/7.jpg`, alt: 'Фальшбалка — вид 3' },
    { src: `${base}/8.jpeg`, alt: 'Фальшбалка — вид 4' },
    { src: `${base}/9.jpeg`, alt: 'Фальшбалка — вид 5' },
    { src: `${base}/diff.jpg`, alt: 'Особенности конструкции' },
    { src: `${base}/scheme.png`, alt: 'Схема фальшбалки' },
  ],
  colors: buildProductColors(base, {
    unpainted: ['1.jpg', '2.jpg', '7.jpg', '8.jpeg', '9.jpeg'],
    oak: ['colour.png'],
    light_oak: ['colour.jpg'],
    nut: ['colour.png'],
    black: ['colour.png'],
  }),
  defaultColorId: 'oak',
  descriptionCommon: `Фальшбалка из влагостойкой фанеры и толстого дубового шпона. Данная конфигурация позволяет добиться максимальной устойчивости к изменению формы дерева под влиянием времени и перепада температур.

Дубовый шпон — это тот же дуб, что и массив, просто распиленный вдоль дерева. И в отличие от массива дубовый шпон даёт более красивый рисунок дерева.

Толщина стороны фальшбалки — 16,5 мм. Толщина шпона — 1,5 мм.`,
  descriptionOil:
    'Изделие покрыто в два слоя немецким маслом фирмы SAICOS. Данное масло является натуральным и экологически чистым. Имеет сертификаты пожарной безопасности. Разрешено для детского использования и использованию в детских садах.',
  productionText:
    'Непокрашенная фальшбалка — 1 неделя. Покрашенная — 2 недели, так как масло сохнет между нанесением слоёв.',
  dimensionMode: 'volume',
  priceFormula: 'fauxbeam',
  maxWidth: 1000,
  maxDepth: 6000,
  maxLength: 6000,
  maxHeight: 1000,
  defaultWidth: '120',
  defaultLength: '3000',
  defaultHeight: '200',
  priceRates: { unpainted: 16_250_000, painted: 20_000_000 },
  orderHeading: 'Заказ: Фальшбалки',
  itemLabel: 'Фальшбалка',
  addItemLabel: 'Добавить фальшбалку',
  galleryAltSuffix: 'фальшбалка',
  lightboxAlt: 'Увеличенное фото фальшбалки',
}
