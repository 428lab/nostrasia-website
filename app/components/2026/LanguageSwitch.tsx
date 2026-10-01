import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { isJa } from './sections'

// 仕組みは 2025 年版（components/2025/Header/LanguageSwitch.tsx）と同じ
export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation()
  const setSearchParams = useSearchParams()[1]
  const current = isJa(i18n) ? 'ja' : 'en'

  const handleChangeLanguage = (lng: 'ja' | 'en') => {
    i18n.changeLanguage(lng)
    // 切り替えでページ先頭に戻さない
    setSearchParams({ lng }, { preventScrollReset: true })
  }

  return (
    <div className="lang" role="group" aria-label={t('a11y.language')}>
      {(['ja', 'en'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          aria-pressed={current === lng}
          onClick={() => handleChangeLanguage(lng)}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
