import { useTranslation } from 'react-i18next'

import { SPONSORS_2026, Sponsor } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** url が無ければ npub のプロフィール（フリマと同じ njump.me）にリンクする */
const sponsorHref = (sponsor: Sponsor) =>
  sponsor.url ?? (sponsor.npub ? `https://njump.me/${sponsor.npub}` : undefined)

const SponsorName = ({ sponsor }: { sponsor: Sponsor }) => {
  const localized = useLocalized()
  const name = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} />
  ) : sponsor.icon ? (
    <>
      <img className="slot-icon" src={sponsor.icon} alt="" />
      {sponsor.name}
    </>
  ) : (
    sponsor.name
  )
  return (
    <>
      {name}
      {sponsor.support && (
        <small className="slot-for">
          {sponsor.support.map((s) => localized(s)).join(' / ')}
        </small>
      )}
    </>
  )
}

export const Sponsors = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="sponsors">
      <div className="wrap">
        <SectionHead label={t('sponsors.label')} title={t('sponsors.title')} />
        <ul className="slots">
          {SPONSORS_2026.map((sponsor) => {
            const href = sponsorHref(sponsor)
            return (
              <li
                key={sponsor.name}
                className={sponsor.logo ? 'has-logo' : undefined}
              >
                {href ? (
                  <a
                    className="slot"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SponsorName sponsor={sponsor} />
                  </a>
                ) : (
                  <div className="slot">
                    <SponsorName sponsor={sponsor} />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
