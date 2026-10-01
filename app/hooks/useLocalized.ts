import { useTranslation } from 'react-i18next'

import type { Localized } from '~/data/2026'

/** app/data/2026.ts の { ja, en } を現在の言語で取り出す */
export const useLocalized = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('ja') ? 'ja' : 'en'
  return (value: Localized) => value[lang]
}
