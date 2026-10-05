import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

/**
 * 参加登録ボタン。ヘッダー・メニュー・ヒーロー・下部帯で共通。
 * 登録 URL が未定のあいだは開催概要（#overview）へのページ内リンクにして「受付は調整中」を添える。
 * 事前エントリーが必要なら、文言を「事前エントリー」（受付前は「受付は調整中」）にする。
 */
export const JoinButton = ({ className }: { className: string }) => {
  const { t } = useTranslation()
  const url = EVENT_2026.registrationUrl
  const label = EVENT_2026.entryRequired
    ? t('join.entryLabel')
    : t('join.label')

  if (url) {
    return (
      <a
        className={`jb ${className}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{label}</span>
      </a>
    )
  }
  return (
    <a className={`jb ${className}`} href="#overview">
      <span>{label}</span>
      <small>
        {EVENT_2026.entryRequired ? t('join.entrySoon') : t('join.soon')}
      </small>
    </a>
  )
}
