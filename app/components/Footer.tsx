import { useSearchParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'

export const Footer = () => {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const lng = `?lng=${params.get('lng')}` || ''

  return (
    <>
      <div className="fixed bottom-10 pl-4">
        <LanguageSwitch />
      </div>
      <footer className="absolute h-full bottom-10 right-4 inline-flex flex-col justify-end items-end space-y-4 h-full">
        <Button textOnly href="/contacts">
          {t('contacts')}
        </Button>
        <Button textOnly href={`/privacy-policy${lng}`}>
          {t('privacyPolicy')}
        </Button>
      </footer>
    </>
  )
}
