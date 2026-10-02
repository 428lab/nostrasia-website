import { Trans, useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { Lead, QSection } from './QSection'

const QUESTIONS = ['first', 'keys', 'relay', 'zap', 'nip'] as const
const STEPS = ['client', 'keys', 'post'] as const

export const Faq = () => {
  const { t } = useTranslation()

  return (
    <QSection id="faq">
      <Lead i18nKey="faq.lead" />
      <div className="faq">
        {QUESTIONS.map((key) => (
          <details key={key}>
            <summary>{t(`faq.items.${key}.q`)}</summary>
            <p>{t(`faq.items.${key}.a`)}</p>
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
