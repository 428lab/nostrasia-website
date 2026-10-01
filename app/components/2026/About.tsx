import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

export const About = () => {
  const { t } = useTranslation()
  const localized = useLocalized()

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SectionHead
          icon="about"
          label={t('about.label')}
          title={t('about.title')}
        />
        <p className="lead">{t('about.lead1')}</p>
        <p className="lead">{t('about.lead2')}</p>
        <div className="about-g" id="overview">
          <div className="panel">
            <p className="ptl">{t('about.overviewTitle')}</p>
            <p className="note">
              {t('about.overviewNote', {
                hashtag: EVENT_2026.hashtag,
                interpolation: { escapeValue: false },
              })}
            </p>
          </div>
          <dl className="ov">
            <div>
              <dt>{t('about.date')}</dt>
              <dd className="m">{formatDate2026(EVENT_2026.date)}</dd>
            </div>
            <div>
              <dt>{t('about.venue')}</dt>
              <dd>
                {EVENT_2026.venue
                  ? localized(EVENT_2026.venue.name)
                  : t('venueTBA')}
              </dd>
            </div>
            <div>
              <dt>{t('about.fee')}</dt>
              <dd>
                {EVENT_2026.fee ? localized(EVENT_2026.fee) : t('feeTBA')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
