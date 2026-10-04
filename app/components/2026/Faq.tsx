import { Trans, useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { Lead, QSection } from './QSection'

const QUESTIONS = ['first', 'entry', 'keys', 'relay', 'zap', 'nip'] as const
const STEPS = ['client', 'keys', 'post'] as const

export const Faq = () => {
  const { t } = useTranslation()
  const { entryRequired, registrationUrl } = EVENT_2026
  // 事前エントリーが要らなければ「事前エントリーは必要？」は出さない
  const questions = QUESTIONS.filter((key) => key !== 'entry' || entryRequired)

  /** 参加登録・事前エントリーの受付が始まったら、「決まり次第」ではない答えに切り替える */
  const answer = (key: (typeof QUESTIONS)[number]) => {
    if (key === 'first') {
      if (entryRequired)
        return registrationUrl
          ? t('faq.items.first.aEntryOpen')
          : t('faq.items.first.aEntry')
      return registrationUrl
        ? t('faq.items.first.aOpen')
        : t('faq.items.first.a')
    }
    if (key === 'entry' && registrationUrl) return t('faq.items.entry.aOpen')
    return t(`faq.items.${key}.a`)
  }

  return (
    <QSection id="faq">
      <Lead i18nKey="faq.lead" />
      <div className="faq card">
        {questions.map((key) => (
          <details key={key}>
            <summary>{t(`faq.items.${key}.q`)}</summary>
            <p>{answer(key)}</p>
            {key === 'entry' && registrationUrl && (
              <p className="act">
                <JoinButton variant="section" />
              </p>
            )}
          </details>
        ))}
      </div>
      <span className="kick">{t('faq.stepsKick')}</span>
      <ol className="steps">
        {STEPS.map((key) => (
          <li key={key} className="card">
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
