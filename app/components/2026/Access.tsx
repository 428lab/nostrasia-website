import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { Lead, QSection } from './QSection'
import { localize } from './sections'

/** フロアマップのイメージ図の区画（配置は未定のイメージ） */
const FLOOR = [
  { key: 'main', className: 'a' },
  { key: 'workshop', className: 'b' },
  { key: 'market', className: 'c' },
  { key: 'shrine', className: 'd2' },
  { key: 'social', className: 'e2' },
  { key: 'entrance', className: 'x' },
] as const

export const Access = () => {
  const { t, i18n } = useTranslation()
  const { venue } = EVENT_2026
  const venueName = venue ? localize(venue.name, i18n) : t('tbd.venue')

  return (
    <QSection id="access">
      {venue ? (
        <Lead i18nKey="access.lead" values={{ venue: venueName }} />
      ) : (
        <Lead i18nKey="access.leadTbd" />
      )}
      <span className="kick">{t('access.floorKick')}</span>
      <div className="card">
        <div className="fmap" role="img" aria-label={t('access.floorLabel')}>
          {FLOOR.map((f) => (
            <div key={f.key} className={f.className}>
              {t(`access.floor.${f.key}`)}
            </div>
          ))}
        </div>
        <p className="cap">
          {venue ? t('access.floorCap') : t('access.floorCapTbd')}
        </p>
      </div>
      <span className="kick">ACCESS</span>
      <div className="access">
        <div
          className="pin"
          role="img"
          aria-label={
            venue
              ? t('access.mapLabel', {
                  venue: venueName,
                  interpolation: { escapeValue: false },
                })
              : t('access.mapLabelTbd')
          }
        >
          <b>{venueName}</b>
        </div>
        <div className="card">
          {venue ? (
            <>
              <p className="txt">
                {venueName}
                <br />
                {localize(venue.address, i18n)}
              </p>
              <p className="act">
                <a
                  className="btn"
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('access.openMap')}
                </a>
              </p>
            </>
          ) : (
            <p className="txt">{t('access.text')}</p>
          )}
        </div>
      </div>
    </QSection>
  )
}
