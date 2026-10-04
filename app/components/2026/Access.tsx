import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** フロアマップ（配置が未定のためイメージ）。key は locale の access.floor.* */
const FLOOR = [
  { className: 'fA', key: 'main' },
  { className: 'fB', key: 'market' },
  { className: 'fC', key: 'shrine' },
  { className: 'fD', key: 'workshop' },
  { className: 'fE', key: 'social' },
  { className: 'fF', key: 'reception' },
]

export const Access = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const venue = EVENT_2026.venue

  return (
    <section className="sec" id="access">
      <div className="wrap">
        <SectionHead label={t('access.label')} title={t('access.title')} />
        <div className="acc">
          <div className="amap">
            <svg viewBox="0 0 400 300" aria-hidden="true">
              <rect x="0" y="130" width="400" height="16" fill="#C9CDD2" />
              <rect x="180" y="0" width="16" height="300" fill="#C9CDD2" />
            </svg>
            <p>
              {venue
                ? t('access.mapCaption', {
                    venue: localized(venue.name),
                    interpolation: { escapeValue: false },
                  })
                : t('venueTBA')}
            </p>
          </div>
          {venue ? (
            <div className="panel">
              <p className="ptl">{localized(venue.name)}</p>
              <p className="ptx">{localized(venue.address)}</p>
              <p className="ptx">
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('access.map')}
                </a>
              </p>
            </div>
          ) : (
            <div className="panel">
              <p className="ptl">{t('access.panelTitle')}</p>
              <p className="ptx">{t('access.panelText')}</p>
            </div>
          )}
        </div>
        <p className="h3s" id="floor">
          {t('access.floorTitle')}
        </p>
        <div className="floor" role="img" aria-label={t('access.floorLabel')}>
          {FLOOR.map(({ className, key }) => (
            <div className={className} key={key}>
              {t(`access.floor.${key}`)}
            </div>
          ))}
        </div>
        <p className="note">
          {venue ? t('access.floorNoteVenue') : t('access.floorNote')}
        </p>
      </div>
    </section>
  )
}
