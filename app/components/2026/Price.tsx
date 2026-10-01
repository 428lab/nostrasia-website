import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { Lead, QSection } from './QSection'
import { localize } from './sections'

export const Price = () => {
  const { t, i18n } = useTranslation()
  const { fee, registrationUrl } = EVENT_2026

  return (
    <QSection id="price">
      {!fee && (
        <p className="price" role="img" aria-label={t('price.tbdLabel')}>
          ¥<span>???</span>
        </p>
      )}
      <Lead
        i18nKey="price.lead"
        values={{ fee: fee ? localize(fee, i18n.language) : t('tbd.fee') }}
      />
      {!registrationUrl && <p className="txt">{t('price.text')}</p>}
      <p className="act">
        <JoinButton variant="section" />
      </p>
    </QSection>
  )
}
