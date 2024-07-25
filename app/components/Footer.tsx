import { useTranslation } from 'react-i18next'

import { useTo } from '~/hooks/useTo'

import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'

export const Footer = () => {
  const { t } = useTranslation()

  const to = useTo()

  return (
    <>
      <div className="fixed bottom-10">
        <LanguageSwitch />
      </div>
      <footer className="absolute bottom-10 right-4 inline-flex flex-col justify-end items-end space-y-4 h-full">
        <Button
          textOnly
          href="https://docs.google.com/forms/d/e/1FAIpQLSdYu9hDT-4CTGZWq8aQOo9dhqn-7WtHFpu7si4x1R2GemV62w/viewform"
        >
          {t('contacts')}
        </Button>
        <Button textOnly href={to('/privacy-policy')}>
          {t('privacyPolicy')}
        </Button>
      </footer>
    </>
  )
}
