import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

/**
 * 参加登録ボタン。ヘッダー・ヒーロー・メニュー・下部の帯・いくら？ で共通。
 * registrationUrl が未定のあいだはページ内の「いくら？」へ飛ばし、「調整中」を添える。
 */
const VARIANTS = {
  header: { className: 'cta-s', label: 'join.go', soon: null, bolt: 'text' },
  hero: {
    className: 'btn',
    label: 'join.go',
    soon: 'join.soonLong',
    bolt: 'span',
  },
  menu: { className: 'mcta', label: 'join.menu', soon: null, bolt: 'text' },
  bar: {
    className: 'bar',
    label: 'join.register',
    soon: 'join.soon',
    bolt: 'span',
  },
  section: {
    className: 'btn',
    label: 'join.register',
    soon: 'join.soon',
    bolt: 'span',
  },
} as const

export const JoinButton = ({ variant }: { variant: keyof typeof VARIANTS }) => {
  const { t } = useTranslation()
  const v = VARIANTS[variant]
  const url = EVENT_2026.registrationUrl

  const content = (
    <>
      {v.bolt === 'span' ? <span className="bolt">⚡</span> : '⚡ '}
      {t(v.label)}
      {!url && v.soon && <small>{t(v.soon)}</small>}
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
