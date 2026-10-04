import { useTranslation } from 'react-i18next'

import { EVENT_2026, SPONSOR_TIERS_2026, SponsorTier } from '~/data/2026'

import { BbFace, BbHead } from './Faces'

/** tier ごとの枠の大きさ（大・中・小） */
const TIER_CLASS: Record<SponsorTier['id'], string> = {
  tier1: 'lg',
  tier2: 'md',
  tier3: 'sm',
}

export const Sponsors = () => {
  const { t } = useTranslation()

  return (
    <BbFace
      id="sponsors"
      headingId="h-sp"
      diag={{ dir: 'l', f: 0.78, piece: 'triangle' }}
      arch={{ side: -1, rotate: -10 }}
    >
      <BbHead icon="sponsors" headingId="h-sp" />
      {/* 1 社でも決まったら「募集しています」のリードにしない */}
      <p className="bl">
        {SPONSOR_TIERS_2026.every((tier) => tier.sponsors.length === 0)
          ? t('sponsors.lead')
          : t('sponsors.leadGot')}
      </p>
      <ul className="slots">
        {SPONSOR_TIERS_2026.flatMap((tier) =>
          tier.sponsors.length > 0
            ? tier.sponsors.map((sponsor, i) => (
                <li
                  key={`${tier.id}-${sponsor.name}-${i}`}
                  className={`${TIER_CLASS[tier.id]} got`}
                >
                  <a
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
                </li>
              ))
            : Array.from({ length: tier.openSlots }, (_, i) => (
                <li key={`${tier.id}-${i}`} className={TIER_CLASS[tier.id]}>
                  <small>SPONSOR</small>
                  {t('sponsors.open')}
                </li>
              )),
        )}
      </ul>
      <a
        className="btn2"
        href={EVENT_2026.contactUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('sponsors.contact')}
      </a>
      <p className="bnote">{t('sponsors.note')}</p>
    </BbFace>
  )
}
