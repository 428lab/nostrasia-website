import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'
import { Layout } from '~/components/Layout'
import { Logo } from '~/components/Logo'

import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Nostrasia 2024' }]
}

export default function Index() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="relative z-0">
        <img
          src="/bg-y.svg"
          className="absolute left-0 top-0 w-[148px] md:w-auto -z-10"
          alt="background yellow"
        />
        <img
          src="/bg-p.svg"
          className="absolute right-0 top-[277px] w-[120px] md:w-auto -z-10"
          alt="background purple"
        />
      </div>
      <Layout>
        <div className="px-4 md:px-10 py-[120px] w-full space-y-6 text-center">
          <h1 className="text-4xl leading-none w-full flex justify-center z-10">
            <Logo size="large" />
          </h1>
          <h2 className="text-2xl font-bold text-primary">
            <div>{t('eventDate')}</div>
            <div>{t('hero.inTokyo')}</div>
          </h2>
          <p className="font-bold text-primary">
            {t('hero.freedomNostrConference')}
          </p>
          <Button
            color="secondary"
            href={
              i18n.language === 'ja'
                ? 'https://forms.gle/fdvKUKKpG7QGNpf8A'
                : 'https://forms.gle/Xw9QscTd5RuG5ueV7'
            }
          >
            {t('join')}
          </Button>
        </div>
        <div className="space-y-6">
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
          <Button
            color="primary"
            href={
              i18n.language === 'ja'
                ? 'https://forms.gle/fdvKUKKpG7QGNpf8A'
                : 'https://forms.gle/Xw9QscTd5RuG5ueV7'
            }
          >
            {t('join')}
          </Button>
        </div>
      </Layout>
    </>
  )
}
