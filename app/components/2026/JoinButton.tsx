import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

/**
 * 参加登録ボタン。ヘッダー・メニュー・ヒーロー・下部帯で共通。
 * 登録 URL が未定のあいだは開催概要（#overview）へのページ内リンクにして「準備中」を添える。
 */
export const JoinButton = ({ className }: { className: string }) => {
  const { t } = useTranslation()
  const url = EVENT_2026.registrationUrl

  if (url) {
    return (
      <a
        className={`jb ${className}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{t('join.label')}</span>
      </a>
    )
  }
  return (
    <a className={`jb ${className}`} href="#overview">
      <span>{t('join.label')}</span>
      <small>{t('join.soon')}</small>
    </a>
  )
}
