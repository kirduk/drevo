import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { formatContactRequest, sendVkMessage } from './server/vkNotifier.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT || 8080)

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

app.use(express.static(path.join(__dirname, 'dist')))

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`)
})
