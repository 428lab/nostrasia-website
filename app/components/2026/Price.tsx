import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { GlyphWord } from './Glyph'
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
          <span className="yen" aria-hidden="true">
            ¥
          </span>
          <GlyphWord className="pq" text="???" acc="yyy" />
        </p>
      )}
      {fee ? (
        <Lead i18nKey="price.lead" values={{ fee: localize(fee, i18n) }} />
      ) : (
        <Lead i18nKey="price.leadTbd" />
      )}
      {!registrationUrl && (
        <div className="card">
          <p className="txt">{t('price.text')}</p>
        </div>
      )}
      <p className="act">
        {registrationUrl ? (
          <JoinButton variant="section" />
        ) : (
          // 参加登録が始まるまでは、お知らせを出す公式アカウント（フッター）へ
          <a className="btn" href="#follow">
            {t('price.follow')}
            <small>{t('price.followSub')}</small>
          </a>
        )}
      </p>
    </QSection>
  )
}
