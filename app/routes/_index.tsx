import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'
import { LanguageSwitch } from '~/components/LanguageSwitch'

import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const { t } = useTranslation()
  return (
    <div className="text-center w-full max-w-[800px] mx-auto">
      <div className="px-10 py-[120px] w-full space-y-6">
        <h1 className="text-4xl leading-none w-full flex justify-center">
          <img className="w-auto" src="/logo.svg" alt="Nostrasia 2024" />
        </h1>
        <h2 className="text-2xl font-bold text-primary">
          <div>2024.9.23</div>
          <div>{t('hero.inTokyo')}</div>
        </h2>
        <p className="font-bold text-primary">
          {t('hero.freedomNostrConference')}
        </p>
        <Button color="secondary">{t('join')}</Button>
      </div>
      <div className="fixed bottom-10 ml-4 max-w-[816px] w-full flex">
        <LanguageSwitch />
      </div>
    </div>
  )
}
