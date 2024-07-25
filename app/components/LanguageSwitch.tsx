import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { CheckIcon } from '~/icons/Check'

const Check = ({ active }: { active: boolean }) => (
  <CheckIcon
    className={`transition-all stroke-secondary dark:stroke-primary ${active ? 'w-auto opacity-100' : 'pr-0 w-0 opacity-0'}`}
  />
)

export const LanguageSwitch = () => {
  const { i18n } = useTranslation()

  const setSearchParams = useSearchParams()[1]

  const handleChangeLanguage = (lng: 'ja' | 'en') => {
    i18n.changeLanguage(lng)
    setSearchParams({ lng })
  }

  return (
    <div className="flex gap-2 leading-none bg-foreground dark:bg-background p-3 rounded-full text-white dark:text-primary">
      <button
        className="flex items-center"
        onClick={() => handleChangeLanguage('en')}
      >
        <Check active={i18n.language === 'en'} />
        <span>English</span>
      </button>
      <div className="border-l border-background dark:border-dark-background" />
      <button
        className="flex items-center"
        onClick={() => handleChangeLanguage('ja')}
      >
        <Check active={i18n.language === 'ja'} />
        <span>日本語</span>
      </button>
    </div>
  )
}
