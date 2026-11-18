import { useTranslation } from 'react-i18next'

import { SPONSORS_2026, Sponsor } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** url が無ければ npub のプロフィール（フリマと同じ njump.me）にリンクする */
const sponsorHref = (sponsor: Sponsor) =>
  sponsor.url ?? (sponsor.npub ? `https://njump.me/${sponsor.npub}` : undefined)

/** 枠の中に出すリンク先の文字。URL はドメインとパス、npub は前後だけ残して縮める（リンク先は njump.me） */
const hrefLabel = (sponsor: Sponsor) => {
  if (sponsor.url)
    return sponsor.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  if (sponsor.npub)
    return `${sponsor.npub.slice(0, 10)}…${sponsor.npub.slice(-4)}`
  return undefined
}

/** 枠そのものはリンクにせず、リンク先の文字だけを押せるようにする */
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
  const href = sponsorHref(sponsor)
  const label = hrefLabel(sponsor)
  return (
    <>
      {name}
      {sponsor.support && (
        <small className="slot-for">
          {sponsor.support.map((s) => localized(s)).join(' / ')}
        </small>
      )}
      {href && label && (
        <a
          className="slot-url"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label} ↗
        </a>
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
          {SPONSORS_2026.map((sponsor) => (
            <li
              key={sponsor.name}
              className={sponsor.logo ? 'has-logo' : undefined}
            >
              <div className="slot">
                <SponsorName sponsor={sponsor} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
