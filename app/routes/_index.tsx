import { useTranslation } from 'react-i18next'

import { Button } from '~/components/Button'
import { FeatureTile } from '~/components/FeatureTile'
import { Layout } from '~/components/Layout'
import { Logo } from '~/components/Logo'
import { TimeScheduleProgram } from '~/components/TimeScheduleProgram'

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
            <h2 className="font-bold text-2xl leading-none text-primary text-center">
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
              <a
                href="https://www.youtube.com/@nostrasia/videos"
                target="_blank"
                rel="noreferrer"
                className="text-primary inline-block hover:underline"
              >
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
                target="_blank"
                rel="noreferrer"
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
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-primary">
              {t('timeTable.label')}
            </h2>
            <div className="space-y-4">
              <p className="font-bold">12:00</p>
              <TimeScheduleProgram
                place="main"
                start="12:30"
                end="13:00"
                title={t('timeTable.venueOpening')}
              />

              <p className="font-bold">13:00</p>
              <TimeScheduleProgram
                place="main"
                start="13:00"
                end="14:00"
                title={
                  <>
                    <p>{t('timeTable.openingRemark')}</p>
                    <p>{t('timeTable.presentationSummaryOfNostrUseInJapan')}</p>
                    <p>
                      {t(
                        'timeTable.presentationNostrBasedAppsAndServicesFromJapan',
                      )}
                    </p>
                  </>
                }
              />

              <p className="font-bold">14:00</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-4">
                  <TimeScheduleProgram
                    place="main"
                    start="14:00"
                    end="14:30"
                    title={t('timeTable.lightningTalksPart1')}
                  />
                  <TimeScheduleProgram
                    place="main"
                    start="14:30"
                    end="16:00"
                    title={t('timeTable.openForConversations')}
                  />
                  <TimeScheduleProgram
                    place="main"
                    start="16:00"
                    end="16:30"
                    title={t('timeTable.lightningTalksPart2')}
                  />
                  <TimeScheduleProgram
                    place="main"
                    start="16:30"
                    end="18:00"
                    title={t('timeTable.openForConversationsAndBoardGames')}
                  />
                </div>
                <TimeScheduleProgram
                  place="lounge1"
                  start="14:00"
                  end="18:00"
                  title={t('timeTable.merchandiseBooth')}
                />
                <TimeScheduleProgram
                  place="lounge2"
                  start="14:00"
                  end="18:00"
                  title={
                    <>
                      <p>{t('openForConversations')}</p>
                      <p>{t('timeTable.nostrGuruIsHere')}</p>
                    </>
                  }
                />
                <TimeScheduleProgram
                  place="vipRoom"
                  start="14:00"
                  end="18:00"
                  title={
                    <>
                      <p>{t('timeTable.hookahShisaLounge')}</p>
                      <p>{t('timeTable.nostrichSpawnRoom')}</p>
                    </>
                  }
                />
              </div>

              <p className="font-bold">18:00</p>
              <TimeScheduleProgram
                place="main"
                start="18:00"
                end="20:00"
                title={t('timeTable.secretParty')}
              />

              <p className="font-bold">20:00</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <TimeScheduleProgram
                  place="main"
                  start="20:00"
                  end="20:50"
                  title={t('timeTable.openForConversations')}
                />
                <TimeScheduleProgram
                  place="lounge1"
                  start="20:00"
                  end="20:50"
                  title={t('timeTable.karaoke')}
                />
                <TimeScheduleProgram
                  place="lounge2"
                  start="20:00"
                  end="20:50"
                  title={t('timeTable.karaoke')}
                />
                <TimeScheduleProgram
                  place="vipRoom"
                  start="20:00"
                  end="20:50"
                  title={t('timeTable.karaoke')}
                />
              </div>
              <TimeScheduleProgram
                place="main"
                start="20:50"
                end="21:00"
                title={t('timeTable.closingRemark')}
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg text-primary">
              {t('floorMap.label')}
            </h2>
            <img
              className="w-full"
              src="/map.webp"
              alt="Floor Map"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-primary">
              {t('sponsor.label')}
            </h2>
            <div>
              <a
                href="https://zenryokukikai.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                <img
                  src="/zenryokukikai.webp"
                  alt="全力機械株式会社"
                  width={203}
                  height={80}
                  loading="lazy"
                />
              </a>
            </div>
            <div>
              <a
                href="https://geyser.fund/project/nostrasia2024food"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold"
              >
                Nostrasia 2024 Food
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
