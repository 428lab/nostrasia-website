import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'
import { FeatureTile } from '~/components/FeatureTile'
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
          className="absolute right-0 top-[310px] md:top-[277px] w-[120px] md:w-auto -z-10"
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
        <div className="space-y-20">
          <div className="space-y-6">
            <h2 className="font-bold text-2xl leading-none text-primary">
              {t('features.label')}
            </h2>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
              {(
                [
                  {
                    label: t('features.learnAbout.label'),
                    description: t('features.learnAbout.description'),
                    backgroundIcon: '/features/h.svg',
                    color: 'primary',
                  },
                  {
                    label: t('features.tryUsing.label'),
                    description: t('features.tryUsing.description'),
                    backgroundIcon: '/features/d.svg',
                    color: 'secondary',
                  },
                  {
                    label: t('features.interactWithNostrUsers.label'),
                    description: t(
                      'features.interactWithNostrUsers.description',
                    ),
                    backgroundIcon: '/features/e.svg',
                    color: 'primary',
                  },
                  {
                    label: t('features.conferencesWorkshops.label'),
                    description: t('features.conferencesWorkshops.description'),
                    backgroundIcon: '/features/w.svg',
                    color: 'secondary',
                  },
                ] as const
              ).map(({ label, description, backgroundIcon, color }) => (
                <FeatureTile
                  key={label}
                  title={label}
                  description={description}
                  backgroundIcon={backgroundIcon}
                  color={color}
                />
              ))}
            </div>
            <div className="flex w-full justify-end">
              <a href="/" className="text-primary inline-block hover:underline">
                {t('features.previous')} →
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-primary">
              {t('overview.label')}
            </h2>
            <div>
              <h3 className="font-bold">{t('overview.date')}</h3>
              <p>{t('eventDate')}</p>
            </div>
            <div className="space-y-3">
              <h2 className="font-bold">{t('overview.place.label')}</h2>
              <a
                className="text-primary hover:underline"
                href="https://cryptoloungegox.com/"
              >
                {t('overview.place.name')}
              </a>
              <div>
                <p>〒{t('overview.place.address.postalCode')}</p>
                <p>{t('overview.place.address.address1')}</p>
                <p>{t('overview.place.address.address2')}</p>
              </div>
              <div className="overflow-hidden rounded-xl w-full h-[288px]">
                <iframe
                  title="Crypto Lounge GOX - Google Map"
                  className="w-full h-[288px] scale-[1.015]"
                  src="https://maps.google.co.jp/maps?output=embed&q=東京都新宿区歌舞伎町２丁目１９−１５てなむタウンビル6FCrypto Lounge GOX"
                />
              </div>
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
        </div>
      </Layout>
    </>
  )
}
