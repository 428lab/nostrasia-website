import { useTranslation } from 'react-i18next'

import { EVENT_2026, SPONSOR_CONTACTS, timeRange2026 } from '~/data/2026'
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
  const note = feeNote ? localized(feeNote) : ''
  const vars = {
    date: dateLabel(date),
    time: timeRange2026() ?? '',
    venue: venue ? localized(venue.name) : '',
    fee: fee ? localized(fee) : '',
    note,
    // en の文中に入れるとき用（"All-you-can-drink" → "all-you-can-drink"）
    noteLower: note.charAt(0).toLowerCase() + note.slice(1),
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

  /** 回答の下に添えるもの（リンク・連絡先） */
  const extra = (key: string) => {
    if (key === 'entry' && registrationUrl)
      return (
        <p className="faq-link">
          <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
            {t('about.entryLink')}
          </a>
        </p>
      )
    if (key === '4')
      return (
        <ul className="contacts">
          {SPONSOR_CONTACTS.map(({ name, npub, x }) => (
            <li key={name}>
              <b>{name}</b>
              <a
                href={`https://njump.me/${npub}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Nostr</span>
                <code>{npub}</code>
              </a>
              <a
                href={`https://x.com/${x}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>X</span>
                <code>@{x}</code>
              </a>
            </li>
          ))}
        </ul>
      )
    return null
  }

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <SectionHead label={t('faq.label')} title={t('faq.title')} />
        <dl className="faqs">
          {ITEMS.filter((key) => key !== 'entry' || entryRequired).map(
            (key) => {
              const { q, a } = keys(key)
              return (
                <div key={key}>
                  <dt>{t(q, vars)}</dt>
                  <dd>
                    <p>{t(a, vars)}</p>
                    {extra(key)}
                  </dd>
                </div>
              )
            },
          )}
        </dl>
      </div>
    </section>
  )
}
