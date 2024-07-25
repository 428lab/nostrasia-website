import { useTranslation } from 'react-i18next'

import { useTo } from '~/hooks/useTo'

import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'

export const Footer = () => {
  const { t } = useTranslation()

  const to = useTo()

  return (
    <>
      <div className="fixed bottom-10 pl-4">
        <LanguageSwitch />
      </div>
      <footer className="absolute h-full bottom-10 right-4 inline-flex flex-col justify-end items-end space-y-4 h-full">
        <Button textOnly href="#">
          {t('contacts')}
        </Button>
        <Button textOnly href={to('/privacy-policy')}>
          {t('privacyPolicy')}
        </Button>
      </footer>
    </>
  )
}
