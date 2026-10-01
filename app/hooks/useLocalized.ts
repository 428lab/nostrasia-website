import { useTranslation } from 'react-i18next'

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
