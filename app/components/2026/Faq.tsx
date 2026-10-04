import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { PU, Shape, YE } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'

const QUESTIONS = [
  'first',
  'entry',
  'fee',
  'when',
  'keys',
  'relay',
  'zap',
] as const
type QuestionKey = (typeof QUESTIONS)[number]
/**
 * 値が決まると答えと食い違う問い。fee は参加費、when は日程と会場が
 * どちらも未定（null）のあいだだけ出す。entry は事前エントリーが必要なときだけ出す
 */
const showItem = (key: QuestionKey) => {
  const { fee, date, venue, entryRequired } = EVENT_2026
  if (key === 'entry') return entryRequired
  if (key === 'fee') return !fee
  if (key === 'when') return !date && !venue
  return true
}
/** 答えの文言のキー。事前エントリーの有無と、受付先（registrationUrl）が決まったかで切り替える */
const answerKey = (key: QuestionKey) => {
  const { entryRequired, registrationUrl } = EVENT_2026
  if (key === 'entry') return registrationUrl ? 'aOpen' : 'a'
  if (key === 'first' && entryRequired)
    return registrationUrl ? 'aEntryOpen' : 'aEntry'
  return 'a'
}
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
        {QUESTIONS.filter(showItem).map((key) => (
          <details key={key}>
            <summary>{t(`faq.items.${key}.q`)}</summary>
            <p>{t(`faq.items.${key}.${answerKey(key)}`)}</p>
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
