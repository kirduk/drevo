export interface ProductItem {
  id: string
  title: string
  description: string
  images: string[]
}

const windowsillImages = [
  '0.jpeg',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.png',
  '8.jpg',
  '9.jpg',
].map((file) => `/sources/windowsill/unpainted/${file}`)

export const products: ProductItem[] = [
  {
    id: 'windowsill',
    title: 'Подоконники',
    description:
      'Деревянные подоконники из массива и шпона: неокрашенные, прозрачные и чёрные варианты отделки под ваш интерьер.',
    images: windowsillImages,
  },
  {
    id: 'slope',
    title: 'Откосы',
    description:
      'Деревянные откосы для окон и дверных проёмов — точная подгонка, аккуратный монтаж и единый стиль с подоконником.',
    images: [],
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
