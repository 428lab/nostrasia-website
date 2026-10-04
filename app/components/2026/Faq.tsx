import { Trans, useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { Lead, QSection } from './QSection'

const QUESTIONS = ['first', 'entry', 'keys', 'relay', 'zap', 'nip'] as const
const STEPS = ['client', 'keys', 'post'] as const

export const Faq = () => {
  const { t } = useTranslation()
  const { entryRequired, registrationUrl } = EVENT_2026
  // 事前エントリーが要るときだけ entry の問いを出し、回答を受付の状況で切り替える
  const questions = QUESTIONS.filter((key) => key !== 'entry' || entryRequired)
  const answerKey = (key: (typeof QUESTIONS)[number]) => {
    if (key === 'entry') return registrationUrl ? 'aOpen' : 'a'
    if (key === 'first' && entryRequired)
      return registrationUrl ? 'aEntryOpen' : 'aEntry'
    return 'a'
  }

  return (
    <QSection id="faq">
      <Lead i18nKey="faq.lead" />
      <div className="faq">
        {questions.map((key) => (
          <details key={key}>
            <summary>{t(`faq.items.${key}.q`)}</summary>
            <p>{t(`faq.items.${key}.${answerKey(key)}`)}</p>
          </details>
        ))}
      </div>
      <span className="kick">{t('faq.stepsKick')}</span>
      <ol className="steps">
        {STEPS.map((key) => (
          <li key={key}>
            <div>
              <b>
                {t(`faq.steps.${key}.title`, {
                  tag: EVENT_2026.hashtag,
                  interpolation: { escapeValue: false },
                })}
              </b>
              <Trans
                t={t}
                i18nKey={`faq.steps.${key}.text`}
                components={{ c: <code /> }}
              />
            </div>
          </li>
        ))}
      </ol>
    </QSection>
  )
}
