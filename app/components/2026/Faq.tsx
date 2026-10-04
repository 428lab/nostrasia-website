import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { BbFace, BbHead } from './Faces'

/** locale の faq.items.* のキー */
const ITEMS = ['first', 'fee', 'when', 'keys', 'sponsor']

/**
 * 値が決まると答えが合わなくなる問い（「調整中です」と答えているもの）。
 * app/data/2026.ts の該当値が決まったら出さない
 */
const HIDE_WHEN_DECIDED: Record<string, () => boolean> = {
  fee: () => EVENT_2026.fee !== null,
  when: () => EVENT_2026.date !== null && EVENT_2026.venue !== null,
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
          <p>{t(`faq.items.${key}.a`)}</p>
        </details>
      ))}
    </BbFace>
  )
}
