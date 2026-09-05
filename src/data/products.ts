export interface ProductItem {
  id: string
  title: string
  description: string
  images: string[]
  href?: string
}

const windowsillPreviewImages = [
  '/sources/windowsill/oak/6.4.png',
  '/sources/windowsill/oak/7.4.png',
  '/sources/windowsill/unpainted/4.jpg',
  '/sources/windowsill/black/6.png',
]

const slopePreviewImages = [
  '/sources/slope/oak/6.4.png',
  '/sources/slope/unpainted/1.jpg',
  '/sources/slope/black/6.png',
  '/sources/slope/all_colours.png',
]

export const products: ProductItem[] = [
  {
    id: 'windowsill',
    title: 'Подоконники',
    description:
      'Деревянные подоконники из массива и шпона: неокрашенные и окрашенные варианты отделки под ваш интерьер.',
    images: windowsillPreviewImages,
    href: '/products/windowsill',
  },
  {
    id: 'slope',
    title: 'Откосы',
    description:
      'Деревянные откосы для окон и дверных проёмов — точная подгонка, аккуратный монтаж и единый стиль с подоконником.',
    images: slopePreviewImages,
    href: '/products/slope',
  },
  {
    id: 'countertop',
    title: 'Столешницы',
    description:
      'Столешницы для кухни, столов и барных зон из массива дерева с защитным покрытием и обработкой кромок.',
    images: [],
  },
  {
    id: 'fauxbeam',
    title: 'Фальш-балки',
    description:
      'Декоративные балки из дерева для потолков и стен — создают уют и подчёркивают архитектуру пространства.',
    images: [],
  },
  {
    id: 'stairs',
    title: 'Лестницы',
    description:
      'Лестницы на заказ: марши, косоуры, ограждения и отделка из натурального дерева под размеры проёма.',
    images: [],
  },
  {
    id: 'steps',
    title: 'Ступени для лестниц',
    description:
      'Отдельные ступени и комплекты для лестничных маршей — износостойкая отделка и точная фрезеровка.',
    images: [],
  },
]
