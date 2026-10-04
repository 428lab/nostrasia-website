import { useTranslation } from 'react-i18next'

import { formatDate2026, weekday2026 } from '~/data/2026'

import type { i18n as I18n } from 'i18next'
import type { Localized } from '~/data/2026'

/**
 * 現在の言語（ja / en）。初回訪問では言語が 'ja-JP' などになることがあるので、
 * 厳密比較ではなく前方一致で見る（SSR と食い違わないように）。
 */
export const currentLang = (
  i18n: Pick<I18n, 'resolvedLanguage' | 'language'>,
): 'ja' | 'en' =>
  (i18n.resolvedLanguage ?? i18n.language ?? '').startsWith('ja') ? 'ja' : 'en'

/** app/data/2026.ts の { ja, en } を現在の言語で取り出す */
export const useLocalized = () => {
  const { i18n } = useTranslation()
  const lang = currentLang(i18n)
  return (value: Localized) => value[lang]
}

const MONTHS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * 開催日の表示（曜日つき）。ja「2026.11.29（日）」/ en「Sun, Nov 29, 2026」。
 * 未定（null）は formatDate2026 と同じ「2026.??.??」
 */
export const useDateLabel = () => {
  const { i18n } = useTranslation()
  const lang = currentLang(i18n)
  return (date: string | null) => {
    if (!date) return formatDate2026(date)
    const weekday = weekday2026(date, lang)
    if (lang === 'ja') return `${formatDate2026(date)}（${weekday}）`
    const [y, m, d] = date.split('-').map(Number)
    return `${weekday}, ${MONTHS_EN[m - 1]} ${d}, ${y}`
  }
}
