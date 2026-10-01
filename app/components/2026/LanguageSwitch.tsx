import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const LANGS = [
  { lng: 'ja', label: 'JA' },
  { lng: 'en', label: 'EN' },
] as const

export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation()
  const setSearchParams = useSearchParams()[1]

  const handleChangeLanguage = (lng: 'ja' | 'en') => {
    i18n.changeLanguage(lng)
    setSearchParams({ lng })
  }

  return (
    <div className="lang" role="group" aria-label={t('lang.label')}>
      {LANGS.map(({ lng, label }) => (
        <button
          key={lng}
          type="button"
          aria-pressed={i18n.language === lng}
          onClick={() => handleChangeLanguage(lng)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
