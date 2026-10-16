import { useTranslation } from 'react-i18next'

import { FLEA_MARKET_2026, PROGRAMS_2026, Seller } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** 見出しの上に吊るす提灯の数。狭い画面では CSS で間引く */
const LANTERNS = 9

const Stall = ({ seller, index }: { seller: Seller; index: number }) => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const sign = seller.shop ?? seller.name

  return (
    <li className={`stall c${index % 4}`}>
      <div className="awn" aria-hidden="true" />
      <div className="stall-b">
        {seller.status === 'planned' && (
          <span className="fuda">{t('market.planned')}</span>
        )}
        <h3>{sign}</h3>
        {seller.shop && seller.name && <p className="by">{seller.name}</p>}
        <ul className="goods">
          {seller.items.map((item) => (
            <li key={item.ja}>{localized(item)}</li>
          ))}
        </ul>
        <p className="say">
          <span className="vh">{t('market.say')}: </span>
          {localized(seller.message)}
        </p>
        {seller.images && (
          <div className="ph">
            {seller.images.map((image) => (
              <a
                key={image.src}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={image.src}
                  alt={localized(image.alt)}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        )}
        <div className="ft">
          <span className="pay">
            {seller.payment.map((p) => (
              <i key={p} className={p}>
                {t(`market.${p}`)}
              </i>
            ))}
          </span>
          <span className="lk">
            {seller.npub && (
              <a
                href={`https://njump.me/${seller.npub}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nostr
              </a>
            )}
            {seller.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </li>
  )
}

export const FleaMarket = () => {
  const { t } = useTranslation()

  if (FLEA_MARKET_2026.length === 0) return null

  const callUrl = PROGRAMS_2026.find((p) => p.id === 'fleaMarket')?.url
  const payAll = FLEA_MARKET_2026.every(
    (s) => s.payment.includes('lightning') && s.payment.includes('cash'),
  )

  return (
    <section className="sec mkt" id="market">
      <div className="lanterns" aria-hidden="true">
        {Array.from({ length: LANTERNS }, (_, i) => (
          <span key={i} className={`ln c${i % 4}`} />
        ))}
      </div>
      <div className="wrap">
        <SectionHead label={t('market.label')} title={t('market.title')} />
        <p className="lead">{t('market.lead')}</p>
        <ul className="mk-facts">
          <li>{t('market.count', { count: FLEA_MARKET_2026.length })}</li>
          {payAll && <li>{t('market.payAll')}</li>}
        </ul>
        <ul className="stalls">
          {FLEA_MARKET_2026.map((seller, i) => (
            <Stall key={seller.npub ?? i} seller={seller} index={i} />
          ))}
        </ul>
        {callUrl && (
          <div className="mk-cta">
            <p className="ptl">{t('market.ctaTitle')}</p>
            <p>{t('market.ctaText')}</p>
            <a
              className="btn2"
              href={callUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('market.callForSellers')}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
