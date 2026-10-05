import { useTranslation } from 'react-i18next'

import { EVENT_2026, SPONSOR_TIERS_2026, SponsorTier } from '~/data/2026'

import { SectionHead } from './SectionHead'

/** tier ごとの枠の並べ方と「募集中」表記 */
const TIER_STYLE: Record<
  SponsorTier['id'],
  { className: string; openLabel: string }
> = {
  tier1: { className: 'slots', openLabel: 'sponsors.open' },
  tier2: { className: 'slots s2', openLabel: 'sponsors.open' },
  tier3: { className: 'slots s3', openLabel: 'sponsors.openShort' },
}

export const Sponsors = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="sponsors">
      <div className="wrap">
        <SectionHead label={t('sponsors.label')} title={t('sponsors.title')} />
        <p className="lead mb">{t('sponsors.lead')}</p>
        {SPONSOR_TIERS_2026.map((tier) => {
          const style = TIER_STYLE[tier.id]
          return (
            <div className="tier" key={tier.id}>
              <h3>{t(`sponsors.tiers.${tier.id}`)}</h3>
              <div className={style.className}>
                {tier.sponsors.length > 0
                  ? tier.sponsors.map((sponsor, i) => (
                      <a
                        className="slot"
                        key={`${sponsor.name}-${i}`}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsor.logo ? (
                          <img src={sponsor.logo} alt={sponsor.name} />
                        ) : (
                          sponsor.name
                        )}
                      </a>
                    ))
                  : Array.from({ length: tier.openSlots }, (_, i) => (
                      <div className="slot" key={i}>
                        {t(style.openLabel)}
                      </div>
                    ))}
              </div>
            </div>
          )
        })}
        <a
          className="btn2"
          href={EVENT_2026.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('sponsors.contact')}
        </a>
        <p className="note">{t('sponsors.note')}</p>
      </div>
    </section>
  )
}
