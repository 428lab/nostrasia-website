import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

/**
 * 参加登録ボタン。ヘッダー・ヒーロー・メニュー・下部の帯・いくら？ で共通。
 * registrationUrl が未定のあいだはページ内の「いくら？」（#price）へ飛ばし、「調整中」を添える。
 * entryRequired なら文言を「事前エントリー」にする（entry / entrySoon）。
 */
const VARIANTS = {
  header: {
    className: 'cta-s',
    label: 'join.go',
    entry: 'join.entry',
    soon: null,
    bolt: 'text',
  },
  hero: {
    className: 'btn hcta',
    label: 'join.go',
    entry: 'join.entry',
    soon: 'join.soonLong',
    bolt: 'span',
  },
  menu: {
    className: 'mcta',
    label: 'join.menu',
    entry: 'join.entryMenu',
    soon: null,
    bolt: 'text',
  },
  bar: {
    className: 'bar',
    label: 'join.register',
    entry: 'join.entry',
    soon: 'join.soon',
    bolt: 'span',
  },
  section: {
    className: 'btn',
    label: 'join.register',
    entry: 'join.entry',
    soon: null,
    bolt: 'span',
  },
} as const

export const JoinButton = ({ variant }: { variant: keyof typeof VARIANTS }) => {
  const { t } = useTranslation()
  const v = VARIANTS[variant]
  const { registrationUrl: url, entryRequired } = EVENT_2026

  const content = (
    <>
      {v.bolt === 'span' ? <span className="bolt">⚡</span> : '⚡ '}
      {t(entryRequired ? v.entry : v.label)}
      {!url && v.soon && (
        <small>{t(entryRequired ? 'join.entrySoon' : v.soon)}</small>
      )}
    </>
  )

  if (url) {
    return (
      <a
        className={v.className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }
  return (
    <a className={v.className} href="#price">
      {content}
    </a>
  )
}
