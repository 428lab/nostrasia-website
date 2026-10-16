import { useTranslation } from 'react-i18next'

import { FLEA_MARKET_2026, PROGRAMS_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

export const FleaMarket = () => {
  const { t } = useTranslation()
  const localized = useLocalized()

  if (FLEA_MARKET_2026.length === 0) return null

  const callUrl = PROGRAMS_2026.find((p) => p.id === 'fleaMarket')?.url

  return (
    <section className="sec" id="market">
      <div className="wrap">
        <SectionHead label={t('market.label')} title={t('market.title')} />
        <ul className="mk-g">
          {FLEA_MARKET_2026.map((seller) => (
            <li className="mk" key={seller.shop}>
              <b>{seller.shop}</b>
              <p>{localized(seller.items)}</p>
              <small>{seller.name}</small>
              {(seller.npub || seller.x) && (
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
                  {seller.x && (
                    <a
                      href={`https://x.com/${seller.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X
                    </a>
                  )}
                </span>
              )}
            </li>
          ))}
        </ul>
        {callUrl && (
          <a
            className="btn2"
            href={callUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('market.callForSellers')}
          </a>
        )}
      </div>
    </section>
  )
}
