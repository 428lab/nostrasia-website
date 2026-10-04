import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { PU, Shape, YE } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'

const QUESTIONS = ['first', 'fee', 'when', 'keys', 'relay', 'zap'] as const
/** はじめての Nostr の 4 ステップ。鍵は円、リレーは四角 */
const STEPS = [
  { key: 'client', icon: null },
  { key: 'keys', icon: <Shape kind="circ" color={PU} /> },
  { key: 'relay', icon: <Shape kind="sq" color={YE} /> },
  { key: 'post', icon: null },
] as const

export const Faq = () => {
  const { t } = useTranslation()

  return (
    <QSection
      id="faq"
      marks={[
        { icon: <Shape kind="circ" color={PU} />, label: t('faq.capKey') },
        { icon: <Shape kind="sq" color={YE} />, label: t('faq.capRelay') },
      ]}
      caption={t('faq.cap')}
    >
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
        {STEPS.map((s, i) => (
          <li key={s.key}>
            <span className="sn">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <b>
                {s.icon}
                {t(`faq.steps.${s.key}.title`, {
                  tag: EVENT_2026.hashtag,
                  interpolation: { escapeValue: false },
                })}
              </b>
              <p>{t(`faq.steps.${s.key}.text`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </QSection>
  )
}
