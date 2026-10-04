import { useTranslation } from 'react-i18next'

import { EVENT_2026, SPONSOR_TIERS_2026, SponsorTier } from '~/data/2026'

import { Lead, QSection } from './QSection'

/** tier ごとの枠の大きさ。tier1 は全幅、tier2 は大枠（狭い画面で全幅、広い画面で 2 列ぶん）、tier3 は小枠 */
const TIER_CLASS: Record<SponsorTier['id'], string> = {
  tier1: 'lg full',
  tier2: 'lg',
  tier3: '',
}

export const Sponsors = () => {
  const { t } = useTranslation()

  return (
    <QSection id="sponsors">
      <Lead i18nKey="sponsors.lead" />
      <ul className="sp">
        {SPONSOR_TIERS_2026.flatMap((tier) =>
          tier.sponsors.length > 0
            ? tier.sponsors.map((s, i) => (
                <li
                  key={`${tier.id}-${s.name}-${i}`}
                  className={`${TIER_CLASS[tier.id]} has`}
                >
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.logo ? <img src={s.logo} alt={s.name} /> : s.name}
                  </a>
                </li>
              ))
            : Array.from({ length: tier.openSlots }, (_, i) => (
                <li
                  key={`${tier.id}-open-${i}`}
                  className={TIER_CLASS[tier.id] || undefined}
                >
                  <span>
                    <small>SPONSOR</small>
                    {tier.id === 'tier3'
                      ? t('sponsors.open')
                      : t('sponsors.openLarge')}
                  </span>
                </li>
              )),
        )}
      </ul>
      <div className="card">
        <p className="txt">{t('sponsors.text')}</p>
      </div>
      <p className="act">
        <a
          className="btn"
          href={EVENT_2026.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('sponsors.contact')}
          <small>{t('sponsors.contactSub')}</small>
        </a>
      </p>
    </QSection>
  )
}
