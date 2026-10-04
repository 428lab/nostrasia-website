import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { PU, Shape } from '~/icons/2026/Shapes'

import { JoinButton } from './JoinButton'
import { Lead, QSection } from './QSection'
import { localize } from './sections'

export const Price = () => {
  const { t, i18n } = useTranslation()
  const { fee, registrationUrl } = EVENT_2026
  const feeText = fee ? localize(fee, i18n) : null
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
            ? t('price.capFee', { fee: feeText, ...raw })
            : t('price.capFeeTbd')}
          {' ・ '}
          {registrationUrl ? t('price.capReg') : t('price.capRegTbd')}
        </>
      }
    >
      {!fee && (
        <p className="price" role="img" aria-label={t('price.tbdLabel')}>
          ¥ ???
        </p>
      )}
      {feeText ? (
        <Lead i18nKey="price.lead" values={{ fee: feeText }} />
      ) : (
        <Lead i18nKey="price.leadTbd" />
      )}
      {!registrationUrl && <p className="txt">{t('price.text')}</p>}
      <p className="acts">
        {registrationUrl ? (
          <JoinButton variant="section" />
        ) : (
          <span className="off">
            ⚡ {t('join.register')}
            <small>{t('join.soon')}</small>
          </span>
        )}
        <a className="btn2" href="#footer">
          {t('price.follow')}
        </a>
      </p>
    </QSection>
  )
}
