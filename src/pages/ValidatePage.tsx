import { useState } from 'react'
import { validateOrderText } from '../utils/validateOrder'
import './ValidatePage.css'

export default function ValidatePage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validateOrderText> | null>(null)

  const handleValidate = () => {
    setResult(validateOrderText(text))
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
      </div>
    </div>
  )
}
