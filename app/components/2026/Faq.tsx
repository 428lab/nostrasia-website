import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { BbFace, BbHead } from './Faces'
import { JoinButton } from './JoinButton'

/** locale の faq.items.* のキー */
const ITEMS = ['first', 'entry', 'fee', 'when', 'keys', 'sponsor']

/**
 * 値が決まると答えが合わなくなる問い（「調整中です」と答えているもの）。
 * app/data/2026.ts の該当値が決まったら出さない
 */
const HIDE_WHEN_DECIDED: Record<string, () => boolean> = {
  fee: () => EVENT_2026.fee !== null,
  when: () => EVENT_2026.date !== null && EVENT_2026.venue !== null,
  /** こちらは逆に、事前エントリーが必要なときだけ出す */
  entry: () => !EVENT_2026.entryRequired,
}

/**
 * 事前エントリーの有無と受付先の有無で答えが変わる問いは、locale の別キーを使う。
 * 受付先が決まったら「下のボタンから」と答え、答えの下に参加ボタンを出す
 */
const answerKey = (key: string) => {
  const { entryRequired, registrationUrl } = EVENT_2026
  if (key === 'first' && entryRequired)
    return registrationUrl ? 'aEntryOpen' : 'aEntry'
  if (key === 'entry' && registrationUrl) return 'aOpen'
  return 'a'
}

export const Faq = () => {
  const { t } = useTranslation()

  return (
    <BbFace
      id="faq"
      headingId="h-faq"
      diag={{ dir: 'r', f: 0.2, piece: 'half' }}
      arch={{ side: 1, rotate: 14 }}
    >
      <BbHead icon="faq" headingId="h-faq" />
      {ITEMS.filter((key) => !HIDE_WHEN_DECIDED[key]?.()).map((key) => (
        <details key={key}>
          <summary>{t(`faq.items.${key}.q`)}</summary>
          <p>{t(`faq.items.${key}.${answerKey(key)}`)}</p>
          {key === 'entry' && EVENT_2026.registrationUrl && (
            <JoinButton variant="section" />
          )}
        </details>
      ))}
    </BbFace>
  )
}
