import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

/**
 * 参加登録ボタン。ヘッダー・ヒーロー・メニュー・下部の帯・いくら？ で共通。
 * registrationUrl が未定のあいだはページ内の「いくら？」（#price）へ飛ばし、「調整中」を添える。
 * いくら？ の中（section）は飛び先そのものなので、未定のあいだはリンクにしない。
 * entryRequired のあいだは文言を「事前エントリー」にし、未定のあいだは「受付は調整中」を添える。
 */
export const JoinButton = ({
  variant,
}: {
  variant: 'header' | 'hero' | 'menu' | 'bar' | 'section'
}) => {
  const { t } = useTranslation()
  const url = EVENT_2026.registrationUrl
  const entry = EVENT_2026.entryRequired
  const go = entry ? t('join.entry') : t('join.go')
  const register = entry ? t('join.entry') : t('join.register')
  const link = url
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#price' }

  switch (variant) {
    case 'header':
      return (
        <a className="cta-s" {...link}>
          {go}
        </a>
      )
    case 'menu':
      return (
        <a className="mcta" {...link}>
          {entry ? t('join.entryMenu') : t('join.menu')}
        </a>
      )
    case 'hero':
      return (
        <a className="h-cta" {...link}>
          {go}
          {!url && (
            <small>{entry ? t('join.entrySoon') : t('join.soonLong')}</small>
          )}
        </a>
      )
    case 'bar':
      // 左が GT（橙）、右が BB（方眼）。継ぎ目は斜め
      return (
        <a className="bar" {...link}>
          <span className="b-g">{register}</span>
          <span className="b-b">
            {url ? '↗' : entry ? t('join.entrySoon') : t('join.soon')}
          </span>
        </a>
      )
    case 'section':
      if (!url)
        return (
          <p className="btn-off">
            {entry ? t('join.entrySectionTbd') : t('join.sectionTbd')}
          </p>
        )
      return (
        <a className="btn2" {...link}>
          {register} ↗
        </a>
      )
  }
}
