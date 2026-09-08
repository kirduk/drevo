import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_PAGE_SEO,
  PAGE_SEO,
  SEO_DEFAULTS,
  getAbsoluteAssetUrl,
  getCanonicalUrl,
  getPageJsonLd,
} from '../data/seo'

const JSON_LD_ID = 'site-json-ld'

function upsertMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (!content) return

  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  if (!href) return

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(pathname: string) {
  const data = getPageJsonLd(pathname)
  const existing = document.getElementById(JSON_LD_ID)
  if (!data) {
    existing?.remove()
    return
  }

  const script = (existing as HTMLScriptElement | null) ?? document.createElement('script')
  script.id = JSON_LD_ID
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  if (!existing) {
    document.head.appendChild(script)
  }
}

function applySeo(pathname: string) {
  const config = PAGE_SEO[pathname] ?? DEFAULT_PAGE_SEO
  const canonicalUrl = getCanonicalUrl(pathname)
  const imageUrl = getAbsoluteAssetUrl(SEO_DEFAULTS.logoPath)
  const robots = config.noindex ? 'noindex, nofollow' : 'index, follow'

  document.title = config.title
  document.documentElement.lang = 'ru'

  upsertMeta('description', config.description)
  upsertMeta('keywords', config.keywords ?? '')
  upsertMeta('robots', robots)
  upsertMeta('author', SEO_DEFAULTS.siteName)
  upsertMeta('theme-color', SEO_DEFAULTS.themeColor)
  upsertMeta('format-detection', 'telephone=yes')

  upsertMeta('og:type', 'website', 'property')
  upsertMeta('og:site_name', SEO_DEFAULTS.siteName, 'property')
  upsertMeta('og:locale', SEO_DEFAULTS.locale, 'property')
  upsertMeta('og:title', config.title, 'property')
  upsertMeta('og:description', config.description, 'property')
  upsertMeta('og:url', canonicalUrl, 'property')
  upsertMeta('og:image', imageUrl, 'property')

  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', config.title)
  upsertMeta('twitter:description', config.description)
  upsertMeta('twitter:image', imageUrl)

  upsertLink('canonical', canonicalUrl)
  upsertJsonLd(pathname)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    applySeo(pathname)
  }, [pathname])

  return null
}
