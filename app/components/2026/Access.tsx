import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { GtFace, Lead } from './Faces'
import { localize } from './sections'

export const Access = () => {
  const { t, i18n } = useTranslation()
  const { venue } = EVENT_2026
  const name = venue ? localize(venue.name, i18n) : t('tbd.venue')

  return (
    <GtFace id="access" no="04" anim="stamp">
      {venue ? (
        <Lead i18nKey="access.lead" values={{ venue: name }} />
      ) : (
        <Lead i18nKey="access.leadTbd" />
      )}
      <div className="access">
        <div
          className="pin"
          role="img"
          aria-label={t('access.pinLabel', { venue: name })}
        >
          <b>{name}</b>
        </div>
        {venue ? (
          <div>
            <p className="txt">{localize(venue.address, i18n)}</p>
            <a
              className="btn2"
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('access.openMap')}
            </a>
          </div>
        ) : (
          <p className="txt">{t('access.textTbd')}</p>
        )}
      </div>
    </GtFace>
  )
}
