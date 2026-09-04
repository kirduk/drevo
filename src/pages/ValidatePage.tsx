import { useState } from 'react'
import { buildCorrectOrderText, validateOrderText } from '../utils/validateOrder'
import './ValidatePage.css'

export default function ValidatePage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validateOrderText> | null>(null)
  const [copied, setCopied] = useState(false)

  const handleValidate = () => {
    setResult(validateOrderText(text))
    setCopied(false)
  }

  const correctedText =
    result && !result.ok && result.order ? buildCorrectOrderText(result.order) : ''

  const handleCopy = async () => {
    if (!correctedText) return
    await navigator.clipboard.writeText(correctedText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="validate-page">
      <div className="validate-page__card">
        <h1 className="validate-page__title">Validate</h1>

        <label className="validate-page__field">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="вставьте сюда техническую информацию из сообщения на Авито"
            rows={14}
          />
        </label>

        <button type="button" className="validate-page__submit" onClick={handleValidate}>
          Провалидировать
        </button>

        {result && (
          <div
            className={`validate-page__result ${result.ok ? 'validate-page__result--ok' : 'validate-page__result--error'}`}
          >
            <h2>{result.ok ? 'Всё ОК' : 'Есть ошибка'}</h2>

            {result.ok ? (
              <p>Техническая информация и цены прошли проверку.</p>
            ) : (
              <ul>
                {result.issues.map((issue) => (
                  <li key={issue.message}>{issue.message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {correctedText && (
          <div className="validate-page__correct">
            <div className="validate-page__correct-head">
              <span>Правильный расчёт</span>
              <button type="button" className="validate-page__copy" onClick={handleCopy}>
                {copied ? (
                  'Скопировано'
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    Копировать
                  </>
                )}
              </button>
            </div>
            <pre>{correctedText}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
