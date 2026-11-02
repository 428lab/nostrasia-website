import { useTranslation } from 'react-i18next'

import { SPONSORS_2026, Sponsor } from '~/data/2026'

import { SectionHead } from './SectionHead'

/** url が無ければ npub のプロフィール（フリマと同じ njump.me）にリンクする */
const sponsorHref = (sponsor: Sponsor) =>
  sponsor.url ?? (sponsor.npub ? `https://njump.me/${sponsor.npub}` : undefined)

const SponsorName = ({ sponsor }: { sponsor: Sponsor }) => {
  if (sponsor.logo) return <img src={sponsor.logo} alt={sponsor.name} />
  if (sponsor.icon)
    return (
      <>
        <img className="slot-icon" src={sponsor.icon} alt="" />
        {sponsor.name}
      </>
    )
  return sponsor.name
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
              <li key={sponsor.name}>
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
