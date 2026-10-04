import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { Mark } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'
import { localize } from './sections'

/** フロアマップのイメージ図の区画（配置は未定のイメージ） */
const FLOOR = [
  { key: 'main', className: 'fA' },
  { key: 'market', className: 'fB' },
  { key: 'shrine', className: 'fC' },
  { key: 'workshop', className: 'fD' },
  { key: 'social', className: 'fE' },
  { key: 'entrance', className: 'fF' },
] as const

export const Access = () => {
  const { t, i18n } = useTranslation()
  const { venue } = EVENT_2026
  const venueName = venue ? localize(venue.name, i18n) : t('tbd.venue')
  const raw = { interpolation: { escapeValue: false } }

  return (
    <QSection
      id="access"
      marks={[
        {
          icon: <Mark id="access" filled={!!venue} />,
          label: venue ? t('access.capMark') : t('access.capMarkTbd'),
        },
      ]}
      caption={
        venue
          ? t('access.cap', { venue: venueName, ...raw })
          : t('access.capTbd')
      }
    >
      {venue ? (
        <Lead i18nKey="access.lead" values={{ venue: venueName }} />
      ) : (
        <Lead i18nKey="access.leadTbd" />
      )}
      <div className="acc">
        <div
          className="amap"
          role="img"
          aria-label={
            venue
              ? t('access.mapLabel', { venue: venueName, ...raw })
              : t('access.mapLabelTbd')
          }
        >
          <svg viewBox="0 0 400 240" aria-hidden="true" focusable="false">
            <rect x="0" y="104" width="400" height="14" fill="#C9CDD2" />
            <rect x="226" y="0" width="14" height="240" fill="#C9CDD2" />
            <rect x="0" y="186" width="400" height="8" fill="#DADDE1" />
            <rect x="92" y="0" width="8" height="240" fill="#DADDE1" />
            <rect x="318" y="0" width="8" height="240" fill="#DADDE1" />
          </svg>
          <p>{venueName}</p>
        </div>
        <div className="panel">
          {venue ? (
            <>
              <p>
                {venueName}
                <br />
                {localize(venue.address, i18n)}
              </p>
              <p className="acts">
                <a
                  className="btn2"
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('access.openMap')}
                </a>
              </p>
            </>
          ) : (
            <p>{t('access.text')}</p>
          )}
        </div>
      </div>
      <span className="kick">{t('access.floorKick')}</span>
      <div className="floor" role="img" aria-label={t('access.floorLabel')}>
        {FLOOR.map((f) => (
          <div key={f.key} className={f.className}>
            {t(`access.floor.${f.key}`)}
          </div>
        ))}
      </div>
      <p className="note">
        {venue ? t('access.floorNote') : t('access.floorNoteTbd')}
      </p>
    </QSection>
  )
}
