import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { LanguageEN } from '~/icons/2025/LanguageEN'
import { LanguageJA } from '~/icons/2025/LanguageJA'

export const LanguageSwitch = () => {
  return (
    <div className="flex items-center leading-none bg-transparent">
      <LanguageSwitchButton lng="ja">
        <LanguageJA />
      </LanguageSwitchButton>
      <span>/</span>
      <LanguageSwitchButton lng="en">
        <LanguageEN />
      </LanguageSwitchButton>
    </div>
  )
}

const LanguageSwitchButton = ({
  lng,
  children,
}: {
  lng: 'ja' | 'en'
  children: React.ReactNode
}) => {
  const { i18n } = useTranslation()

  const setSearchParams = useSearchParams()[1]

  const handleChangeLanguage = (lng: 'ja' | 'en') => {
    i18n.changeLanguage(lng)
    setSearchParams({ lng })
  }

  return (
    <button
      className={
        'flex items-center pl-3 pr-2 py-3 hover:opacity-100 transition ' +
        (i18n.language === lng ? 'opacity-100' : 'opacity-60')
      }
      onClick={() => handleChangeLanguage(lng)}
    >
      <span>{children}</span>
    </button>
  )
}
