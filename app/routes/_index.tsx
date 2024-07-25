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
    <div className="w-full max-w-[816px] pl-4 mx-auto">
      <div className="px-10 py-[120px] w-full space-y-6 text-center">
        <h1 className="text-4xl leading-none w-full flex justify-center">
          <img className="w-auto" src="/logo.svg" alt="Nostrasia 2024" />
        </h1>
        <h2 className="text-2xl font-bold text-primary">
          <div>{t('eventDate')}</div>
          <div>{t('hero.inTokyo')}</div>
        </h2>
        <p className="font-bold text-primary">
          {t('hero.freedomNostrConference')}
        </p>
        <Button color="secondary">{t('join')}</Button>
      </div>
      <div className="space-y-6 mb-40">
        <h2 className="font-bold text-lg text-primary">
          {t('overview.label')}
        </h2>
        <div>
          <h3 className="font-bold">{t('overview.date')}</h3>
          <p>{t('eventDate')}</p>
        </div>
        <div>
          <h2 className="font-bold">{t('overview.place.label')}</h2>
          <p>{t('overview.place.value')}</p>
        </div>
        <div>
          <h2 className="font-bold">{t('overview.programs.label')}</h2>
          <p>{t('overview.programs.value')}</p>
        </div>
        <div>
          <h2 className="font-bold">{t('overview.fees.label')}</h2>
          <p>{t('overview.fees.value')}</p>
        </div>
      </div>
      <div className="fixed bottom-10">
        <LanguageSwitch />
      </div>
    </div>
  )
}
