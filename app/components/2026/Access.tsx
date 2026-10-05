import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'
import { Veil } from './Veil'

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
        <Veil title={t('access.floorVeil')} sub={t('access.floorVeilSub')}>
          <img
            className="floor-img"
            src="/2025/map.webp"
            alt=""
            width="2400"
            height="1968"
            loading="lazy"
            decoding="async"
          />
        </Veil>
      </div>
    </section>
  )
}
