import {
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_WORK_HOURS,
  SITE_NAME,
  YANDEX_MAP_LAT,
  YANDEX_MAP_LON,
} from './company'

export interface PageSeoConfig {
  title: string
  description: string
  keywords?: string
  noindex?: boolean
}

const DEFAULT_KEYWORDS =
  'мировое древо, изделия из дуба, подоконники деревянные, откосы, столешницы, лестницы на заказ, ступени, фальшбалки, санкт-петербург'

const LOGO_PATH = '/sources/logo/logo_cut_1.jfif'

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
  if (configured) return configured
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

export function getCanonicalUrl(pathname: string): string {
  const origin = getSiteOrigin()
  if (!origin) return pathname
  return `${origin}${pathname === '/' ? '/' : pathname}`
}

export function getAbsoluteAssetUrl(path: string): string {
  const origin = getSiteOrigin()
  return origin ? `${origin}${path}` : path
}

function createLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description:
      'Производство изделий из массива дуба и шпона в Санкт-Петербурге: подоконники, откосы, столешницы, лестницы, ступени и фальш-балки.',
    url: getSiteOrigin() || undefined,
    telephone: COMPANY_PHONE,
    image: getAbsoluteAssetUrl(LOGO_PATH),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'наб. реки Екатерингофки, 29-31Т',
      addressLocality: 'Санкт-Петербург',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: YANDEX_MAP_LAT,
      longitude: YANDEX_MAP_LON,
    },
    openingHours: 'Mo-Fr 10:00-18:00',
    areaServed: {
      '@type': 'City',
      name: 'Санкт-Петербург',
    },
  }
}

function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  const origin = getSiteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: origin ? `${origin}${item.path}` : item.path,
    })),
  }
}

function createProductJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'RUB',
      url: getCanonicalUrl(path),
    },
  }
}

export const PAGE_SEO: Record<string, PageSeoConfig> = {
  '/': {
    title: 'Мировое Древо — изделия из дуба на заказ в Санкт-Петербурге',
    description:
      'Фабрика «Мировое Древо» изготавливает подоконники, откосы, столешницы, лестницы, ступени и фальш-балки из массива дуба. Производство в Санкт-Петербурге, индивидуальные размеры и расчёт.',
    keywords: DEFAULT_KEYWORDS,
  },
  '/products/windowsill': {
    title: 'Деревянные подоконники из дуба на заказ | Мировое Древо',
    description:
      'Подоконники из массива дуба и шпона по вашим размерам. Непокрашенные и окрашенные варианты, онлайн-расчёт стоимости. Производство в Санкт-Петербурге.',
    keywords: 'деревянные подоконники, подоконник из дуба, подоконники на заказ спб, мировое древо',
  },
  '/products/slope': {
    title: 'Деревянные откосы для окон на заказ | Мировое Древо',
    description:
      'Откосы из массива дуба для окон и дверных проёмов. Точная подгонка, единый стиль с подоконником, онлайн-калькулятор цены.',
    keywords: 'деревянные откосы, откосы из дуба, откосы на заказ спб',
  },
  '/products/countertop': {
    title: 'Столешницы из дуба на заказ | Мировое Древо',
    description:
      'Столешницы для кухни и столов из массива дуба и шпона. Индивидуальные размеры, защитное масло SAICOS, расчёт стоимости онлайн.',
    keywords: 'столешница из дуба, деревянная столешница на заказ, столешница спб',
  },
  '/products/fauxbeam': {
    title: 'Фальш-балки из дерева на заказ | Мировое Древо',
    description:
      'Декоративные фальш-балки из дубового шпона для потолков и стен. Изготовление по размерам, выбор цвета, онлайн-расчёт.',
    keywords: 'фальшбалки, декоративные балки из дерева, фальш-балки спб',
  },
  '/products/stairs': {
    title: 'Лестницы из дерева на заказ с 3D-визуализацией | Мировое Древо',
    description:
      'Проектирование и изготовление лестниц из натурального дерева. 3D-визуализация в вашей квартире до начала производства. Санкт-Петербург.',
    keywords: 'лестницы на заказ, деревянные лестницы спб, лестница из дуба, 3d визуализация лестницы',
  },
  '/products/steps': {
    title: 'Ступени для лестниц из дуба на заказ | Мировое Древо',
    description:
      'Ступени и подступенки из массива дуба и дубовой палубы для бетонных лестниц. Индивидуальные размеры, онлайн-калькулятор.',
    keywords: 'ступени для лестниц, деревянные ступени, ступени из дуба спб',
  },
  '/legal/terms': {
    title: 'Пользовательское соглашение | Мировое Древо',
    description: 'Пользовательское соглашение сайта фабрики «Мировое Древо».',
    noindex: true,
  },
  '/legal/privacy': {
    title: 'Политика конфиденциальности | Мировое Древо',
    description: 'Политика обработки персональных данных фабрики «Мировое Древо».',
    noindex: true,
  },
  '/validate': {
    title: 'Validate | Мировое Древо',
    description: 'Validate page',
    noindex: true,
  },
}

export function getPageJsonLd(
  pathname: string,
): Record<string, unknown> | Array<Record<string, unknown>> | undefined {
  switch (pathname) {
    case '/':
      return createLocalBusinessJsonLd()
    case '/products/windowsill':
      return [
        createProductJsonLd(
          'Деревянные подоконники',
          'Подоконники из массива дуба и шпона по индивидуальным размерам.',
          '/products/windowsill',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Подоконники', path: '/products/windowsill' },
        ]),
      ]
    case '/products/slope':
      return [
        createProductJsonLd(
          'Деревянные откосы',
          'Откосы из массива дуба для окон и дверных проёмов.',
          '/products/slope',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Откосы', path: '/products/slope' },
        ]),
      ]
    case '/products/countertop':
      return [
        createProductJsonLd(
          'Столешницы из дуба',
          'Столешницы для кухни и столов из массива дуба по индивидуальным размерам.',
          '/products/countertop',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Столешницы', path: '/products/countertop' },
        ]),
      ]
    case '/products/fauxbeam':
      return [
        createProductJsonLd(
          'Фальш-балки из дерева',
          'Декоративные фальш-балки из дубового шпона для интерьера.',
          '/products/fauxbeam',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Фальш-балки', path: '/products/fauxbeam' },
        ]),
      ]
    case '/products/stairs':
      return [
        createProductJsonLd(
          'Лестницы из дерева на заказ',
          'Проектирование и изготовление лестниц с 3D-визуализацией.',
          '/products/stairs',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Лестницы', path: '/products/stairs' },
        ]),
      ]
    case '/products/steps':
      return [
        createProductJsonLd(
          'Ступени для лестниц из дуба',
          'Ступени и подступенки из массива дуба для бетонных лестниц.',
          '/products/steps',
        ),
        createBreadcrumbJsonLd([
          { name: 'Главная', path: '/' },
          { name: 'Ступени', path: '/products/steps' },
        ]),
      ]
    default:
      return undefined
  }
}

export const DEFAULT_PAGE_SEO = PAGE_SEO['/']

export const SITEMAP_PATHS = [
  '/',
  '/products/windowsill',
  '/products/slope',
  '/products/countertop',
  '/products/fauxbeam',
  '/products/stairs',
  '/products/steps',
]

export const SEO_DEFAULTS = {
  siteName: SITE_NAME,
  locale: 'ru_RU',
  themeColor: '#5c3d2e',
  logoPath: LOGO_PATH,
  phone: COMPANY_PHONE,
  address: COMPANY_ADDRESS,
  workHours: COMPANY_WORK_HOURS,
}
