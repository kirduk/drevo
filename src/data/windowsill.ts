import { buildProductColors } from './productColors'
import type { ProductPageConfig } from './productPage'

const base = '/sources/windowsill'

export const windowsillPageConfig: ProductPageConfig = {
  title: 'Подоконники',
  lead: 'Деревянные подоконники из массива дуба и шпона с точной подгонкой под ваш проём.',
  overviewImages: [
    { src: `${base}/all_colours.png`, alt: 'Подоконники — все цвета' },
    { src: `${base}/add.jpg`, alt: 'Дополнительные элементы подоконника' },
    { src: `${base}/diff.jpg`, alt: 'Особенности конструкции' },
    { src: `${base}/scheme.png`, alt: 'Схема подоконника' },
  ],
  colors: buildProductColors(base, {
    unpainted: ['4.jpg', '5.jpg', '6.jpg'],
    oak: ['6.4.png', '7.4.png', '8.4.png'],
    light_oak: ['6.jpg', '7.jpg', 'IMG_20260326_093311 (1).jpg'],
    nut: ['6.1.png', '7.1.png', '8.1.png'],
    black: ['6.png', '7.11.png', '8.png'],
  }),
  defaultColorId: 'oak',
  descriptionCommon: `Подоконник из массива дуба, толстого дубового шпона и влагостойкой фанеры. Данная конфигурация позволяет добиться максимальной устойчивости к изменению формы дерева под влиянием времени и перепада температур.

Дубовый шпон — это тот же дуб, что и массив, просто распиленный вдоль дерева. И в отличие от массива дубовый шпон даёт более красивый рисунок дерева.

Толщина подоконника — 16,5 мм, видимой части — 40 мм. Толщина дубового шпона — 1,5 мм.`,
  descriptionOil:
    'Изделие покрыто в два слоя немецким маслом фирмы SAICOS. Данное масло является натуральным и экологически чистым. Имеет сертификаты пожарной безопасности. Разрешено для детского использования и использованию в детских садах.',
  productionText:
    'Непокрашенный подоконник — 1 неделя. Покрашенный — 2 недели, так как масло сохнет между нанесением слоёв.',
  maxWidth: 2500,
  maxDepth: 1200,
  priceRates: { unpainted: 18750, painted: 22500 },
  orderHeading: 'Заказ: Подоконники',
  itemLabel: 'Подоконник',
  addItemLabel: 'Добавить подоконник',
  galleryAltSuffix: 'подоконник',
  lightboxAlt: 'Увеличенное фото подоконника',
}
