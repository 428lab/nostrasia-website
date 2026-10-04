import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { PU, Shape } from '~/icons/2026/Shapes'

import { JoinButton } from './JoinButton'
import { Lead, QSection } from './QSection'
import { localize } from './sections'

export const Price = () => {
  const { t, i18n } = useTranslation()
  const { fee, feeNote, registrationUrl, entryRequired } = EVENT_2026
  const feeText = fee ? localize(fee, i18n) : null
  const noteText = fee && feeNote ? localize(feeNote, i18n) : null
  const raw = { interpolation: { escapeValue: false } }

  return (
    <QSection
      id="price"
      marks={[
        { icon: <Shape kind="man" color={PU} />, label: t('price.capYou') },
        {
          icon: <Shape kind={fee ? 'sq' : 'sqh'} color="#FFD400" />,
          label: fee ? t('price.capFeeMark') : t('price.capFeeMarkTbd'),
        },
      ]}
      caption={
        <>
          {feeText
            ? noteText
              ? t('price.capFeeNote', { fee: feeText, note: noteText, ...raw })
              : t('price.capFee', { fee: feeText, ...raw })
            : t('price.capFeeTbd')}
          {' ・ '}
          {entryRequired
            ? registrationUrl
              ? t('price.capEntry')
              : t('price.capEntryTbd')
            : registrationUrl
              ? t('price.capReg')
              : t('price.capRegTbd')}
        </>
      }
    >
      {!fee && (
        <p className="price" role="img" aria-label={t('price.tbdLabel')}>
          ¥ ???
        </p>
      )}
      {feeText ? (
        noteText ? (
          <Lead
            i18nKey="price.leadNote"
            values={{ fee: feeText, note: noteText }}
          />
        ) : (
          <Lead i18nKey="price.lead" values={{ fee: feeText }} />
        )
      ) : (
        <Lead i18nKey="price.leadTbd" />
      )}
      {entryRequired ? (
        <p className="txt">
          {registrationUrl ? t('price.entryTextOpen') : t('price.entryText')}
        </p>
      ) : (
        !registrationUrl && <p className="txt">{t('price.text')}</p>
      )}
      <p className="acts">
        {registrationUrl ? (
          <JoinButton variant="section" />
        ) : (
          <span className="off">
            ⚡ {t(entryRequired ? 'join.entry' : 'join.register')}
            <small>{t(entryRequired ? 'join.entrySoon' : 'join.soon')}</small>
          </span>
        )}
        <a className="btn2" href="#footer">
          {t('price.follow')}
        </a>
      </p>
    </QSection>
  )
}
