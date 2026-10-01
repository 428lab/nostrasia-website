import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** フロアマップ（会場未定のため図形によるイメージ）。key は locale の access.floor.* */
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
        <SectionHead
          icon="access"
          label={t('access.label')}
          title={t('access.title')}
        />
        <div className="acc">
          <div className="amap">
            <svg viewBox="0 0 400 300" aria-hidden="true">
              <rect x="0" y="130" width="400" height="16" fill="#C9CDD2" />
              <rect x="180" y="0" width="16" height="300" fill="#C9CDD2" />
              <circle cx="90" cy="70" r="40" fill="#8E30EB" opacity=".25" />
              <rect
                x="250"
                y="190"
                width="90"
                height="70"
                fill="#F6C324"
                opacity=".5"
              />
              <path d="M300 30l40 70h-80z" fill="#F2542D" opacity=".35" />
              <path
                d="M40 260a40 40 0 0 1 80 0z"
                fill="#0E7C7B"
                opacity=".35"
              />
            </svg>
            <p>{venue ? localized(venue.name) : t('venueTBA')}</p>
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
        <div className="floor" aria-label={t('access.floorLabel')}>
          {FLOOR.map(({ className, key }) => (
            <div className={className} key={key}>
              {t(`access.floor.${key}`)}
            </div>
          ))}
        </div>
        <p className="note">{t('access.floorNote')}</p>
      </div>
    </section>
  )
}
