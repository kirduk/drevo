import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { formatContactRequest, sendVkMessage } from './server/vkNotifier.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT || 8080)

const SITEMAP_PATHS = [
  '/',
  '/products/windowsill',
  '/products/slope',
  '/products/countertop',
  '/products/fauxbeam',
  '/products/stairs',
  '/products/steps',
]

function normalizeSiteUrl(url) {
  const trimmed = String(url).trim().replace(/\/$/, '')
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

function getSiteUrl(req) {
  if (process.env.SITE_URL) {
    return normalizeSiteUrl(process.env.SITE_URL)
  }

  const host = req.get('x-forwarded-host') || req.get('host')
  const protocol = req.get('x-forwarded-proto') || 'https'
  return `${protocol}://${host}`
}

app.use(express.json({ limit: '16kb' }))

app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const phone = String(req.body?.phone ?? '').trim()
  const message = String(req.body?.message ?? '').trim()
  const acceptTerms = Boolean(req.body?.acceptTerms)
  const acceptPrivacy = Boolean(req.body?.acceptPrivacy)

  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'Укажите имя и телефон.' })
  }

  if (!acceptTerms || !acceptPrivacy) {
    return res.status(400).json({
      ok: false,
      error: 'Необходимо принять пользовательское соглашение и политику конфиденциальности.',
    })
  }

  try {
    const vkMessage = formatContactRequest({ name, phone, message })
    const result = await sendVkMessage(vkMessage)

    if (!result.ok) {
      return res.status(503).json({
        ok: false,
        error: 'Сервис временно недоступен. Позвоните нам или напишите на Авито.',
      })
    }

    return res.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(502).json({
      ok: false,
      error: 'Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.',
    })
  }
})

app.get('/robots.txt', (req, res) => {
  const siteUrl = getSiteUrl(req)
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /validate

Sitemap: ${siteUrl}/sitemap.xml
`)
})

app.get('/sitemap.xml', (req, res) => {
  const siteUrl = getSiteUrl(req)
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = SITEMAP_PATHS.map(
    (pathname) => `  <url>
    <loc>${siteUrl}${pathname === '/' ? '/' : pathname}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pathname === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  ).join('\n')

  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`)
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`)
})
