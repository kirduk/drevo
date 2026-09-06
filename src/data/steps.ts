import { buildProductColors } from './productColors'
import type { ProductStepsPageConfig } from './productStepsPage'

const base = '/sources/steps'

export const stepsPageConfig: ProductStepsPageConfig = {
  title: 'Ступени для лестниц',
  lead: 'Ступени и подступенки из массива дуба и дубовой палубы для бетонных лестниц — точная подгонка под ваш марш.',
  overviewImages: [
    { src: `${base}/all_colours.png`, alt: 'Ступени — все цвета' },
    { src: `${base}/scheme.png`, alt: 'Схема ступени' },
    { src: `${base}/diff.jpg`, alt: 'Особенности конструкции' },
    { src: `${base}/1.jpg`, alt: 'Ступень с подступёнком' },
    { src: `${base}/2.jpg`, alt: 'Ступень — вид 2' },
    { src: `${base}/4.jpg`, alt: 'Ступень — вид 3' },
    { src: `${base}/8.jpg`, alt: 'Ступень — вид 4' },
    { src: `${base}/9.jpg`, alt: 'Ступень — вид 5' },
    { src: `${base}/22.jpeg`, alt: 'Ступень — пример 1' },
    { src: `${base}/23.jpeg`, alt: 'Ступень — пример 2' },
    { src: `${base}/24.jpeg`, alt: 'Ступень — пример 3' },
  ],
  colors: buildProductColors(base, {
    unpainted: ['colour.png'],
    oak: ['colour.png'],
    light_oak: ['colour.jpg'],
    nut: ['colour.png'],
    black: ['colour.png'],
  }),
  defaultColorId: 'oak',
  descriptionCommon: `Ступень для бетонной лестницы из массива дуба, дубовой палубы 3 мм и влагостойкой фанеры. Данная конфигурация позволяет добиться максимальной устойчивости к изменению формы дерева под влиянием времени и перепада температур.

Дубовая палуба — это массив дуба толщиной 3 мм. И в отличие от изделия полностью из массива, дубовая палуба даёт более красивый рисунок дерева.

Ступень может быть как с подступёнком (как указано на фото), так и без него.
Подступёнок идёт вместе с торцевой заглушкой из дубовой палубы 3 мм.

Ступень:
Толщина ступени — 21 мм. Толщина палубы — 3 мм.
Выступы сделаны из массива дуба 20 мм на 40 мм.

Ступень насаживается на бетонное основание, и своими свесами прикрывает щели и края.

Подступёнок:
Толщина подступёнка — 10,5 мм. Толщина шпона — 1,5 мм.`,
  descriptionOil:
    'Изделие покрыто в два слоя немецким маслом фирмы SAICOS. Данное масло является натуральным и экологически чистым. Имеет сертификаты пожарной безопасности. Разрешено для детского использования и использованию в детских садах.',
  productionText:
    'Непокрашенная ступень — 1 неделя. Покрашенная — 2 недели, так как масло сохнет между нанесением слоёв.',
  maxWidth: 2500,
  maxLength: 1200,
  defaultTreadWidth: '1000',
  defaultTreadLength: '300',
  defaultRiserWidth: '1000',
  defaultRiserLength: '150',
  defaultPlatformWidth: '1000',
  defaultPlatformLength: '1000',
  treadRates: { unpainted: 24500, painted: 28250 },
  riserRates: { unpainted: 15000, painted: 18750 },
  platformRates: { unpainted: 24500, painted: 28250 },
  orderHeading: 'Заказ: Ступени',
  galleryAltSuffix: 'ступень',
  lightboxAlt: 'Увеличенное фото ступени',
}
