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
          {venue ? (
            <div className="panel">
              <p className="ptl">{localized(venue.name)}</p>
              <p className="ptx">{localized(venue.address)}</p>
              <a
                className="btn2"
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('access.map')}
              </a>
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
