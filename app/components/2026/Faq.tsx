import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useDateLabel, useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** locale の faq.items.* のキー。entry は事前エントリーが必要なときだけ出す */
const ITEMS = ['1', '2', 'entry', '3', '4']

export const Faq = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const dateLabel = useDateLabel()
  const {
    date,
    startTime,
    venue,
    fee,
    feeNote,
    entryRequired,
    registrationUrl,
  } = EVENT_2026
  const vars = {
    date: dateLabel(date),
    venue: venue ? localized(venue.name) : '',
    fee: fee ? localized(fee) : '',
    note: feeNote ? localized(feeNote) : '',
    interpolation: { escapeValue: false },
  }

  /** 決まった値に応じて、質問・回答の locale キーを選ぶ */
  const keys = (key: string) => {
    switch (key) {
      case '1':
        return {
          q: 'faq.items.1.q',
          a: !entryRequired
            ? 'faq.items.1.a'
            : registrationUrl
              ? 'faq.items.1.aEntryOpen'
              : 'faq.items.1.aEntry',
        }
      case '2':
        return {
          q: 'faq.items.2.q',
          a: !fee
            ? 'faq.items.2.a'
            : feeNote
              ? 'faq.items.2.aFeeNote'
              : 'faq.items.2.aFee',
        }
      case 'entry':
        return {
          q: 'faq.items.entry.q',
          a: registrationUrl ? 'faq.items.entry.aOpen' : 'faq.items.entry.a',
        }
      case '3':
        return date && venue
          ? {
              q: 'faq.items.3.qDecided',
              a: startTime
                ? 'faq.items.3.aDecided'
                : 'faq.items.3.aDecidedTime',
            }
          : { q: 'faq.items.3.q', a: 'faq.items.3.a' }
      default:
        return { q: `faq.items.${key}.q`, a: `faq.items.${key}.a` }
    }
  }

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <SectionHead icon="faq" label={t('faq.label')} title={t('faq.title')} />
        {ITEMS.filter((key) => key !== 'entry' || entryRequired).map((key) => {
          const { q, a } = keys(key)
          return (
            <details key={key}>
              <summary>{t(q, vars)}</summary>
              <p>{t(a, vars)}</p>
            </details>
          )
        })}
      </div>
    </section>
  )
}
