const VK_API_VERSION = '5.199'
const VK_BASE_URL = 'https://api.vk.com'

function resolvePeerIds(raw) {
  if (!raw) return []
  return raw
    .split(/[,;\s]+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function splitMessage(message, limit = 3000) {
  if (message.length <= limit) return [message]

  const chunks = []
  let start = 0

  while (start < message.length) {
    let end = Math.min(start + limit, message.length)
    if (end < message.length) {
      const newline = message.lastIndexOf('\n', end)
      if (newline > start + 50) end = newline
    }
    chunks.push(message.slice(start, end))
    start = end
    if (start < message.length && message[start] === '\n') start += 1
  }

  return chunks
}

async function postMessagesSend(accessToken, peerId, message) {
  const body = new URLSearchParams({
    access_token: accessToken,
    v: VK_API_VERSION,
    peer_id: peerId,
    random_id: String(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
    message,
  })

  const response = await fetch(`${VK_BASE_URL}/method/messages.send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })

  const payload = await response.json()
  if (!response.ok || payload.error) {
    const details = payload.error?.error_msg || response.statusText
    throw new Error(`VK API error for peer ${peerId}: ${details}`)
  }

  return payload
}

export async function sendVkMessage(message) {
  const accessToken = process.env.VK_ACCESS_TOKEN?.trim()
  const peerIds = resolvePeerIds(process.env.VK_PEER_ID)

  if (!accessToken || peerIds.length === 0) {
    console.warn('VK is not configured: set VK_ACCESS_TOKEN and VK_PEER_ID')
    console.log(message)
    return { ok: false, configured: false }
  }

  const chunks = splitMessage(message)
  for (const peerId of peerIds) {
    for (const chunk of chunks) {
      await postMessagesSend(accessToken, peerId, chunk)
    }
  }

  return { ok: true, configured: true, recipients: peerIds.length }
}

export function formatContactRequest({ name, phone, message }) {
  const lines = [
    'Заявка с сайта «Мировое Древо»',
    '',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Комментарий: ${message || '—'}`,
    '',
    `Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ]

  return lines.join('\n')
}
