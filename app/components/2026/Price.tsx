import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { Lead, QSection } from './QSection'
import { localize } from './sections'

export const Price = () => {
  const { t, i18n } = useTranslation()
  const { fee, feeNote, entryRequired, registrationUrl } = EVENT_2026
  const feeText = fee ? localize(fee, i18n) : null

  return (
    <QSection id="price">
      {/* 未定のあいだは「¥???」、決まったら参加費そのものを同じ大きさで出す */}
      {feeText ? (
        <p
          className="price"
          role="img"
          aria-label={t('price.feeLabel', {
            fee: feeText,
            interpolation: { escapeValue: false },
          })}
        >
          {feeText}
        </p>
      ) : (
        <p className="price" role="img" aria-label={t('price.tbdLabel')}>
          ¥<span>???</span>
        </p>
      )}
      {feeText && feeNote ? (
        <Lead
          i18nKey="price.leadNote"
          values={{ fee: feeText, note: localize(feeNote, i18n) }}
        />
      ) : feeText ? (
        <Lead i18nKey="price.lead" values={{ fee: feeText }} />
      ) : (
        <Lead i18nKey="price.leadTbd" />
      )}
      {entryRequired ? (
        <p className="txt">
          {t(registrationUrl ? 'price.textEntryOpen' : 'price.textEntry')}
        </p>
      ) : (
        !registrationUrl && <p className="txt">{t('price.text')}</p>
      )}
      <p className="act">
        <JoinButton variant="section" />
      </p>
    </QSection>
  )
}
