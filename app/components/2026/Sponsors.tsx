import { useTranslation } from 'react-i18next'

import { SPONSORS_2026, Sponsor } from '~/data/2026'

import { SectionHead } from './SectionHead'

const SponsorName = ({ sponsor }: { sponsor: Sponsor }) =>
  sponsor.logo ? <img src={sponsor.logo} alt={sponsor.name} /> : sponsor.name

export const Sponsors = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="sponsors">
      <div className="wrap">
        <SectionHead label={t('sponsors.label')} title={t('sponsors.title')} />
        <ul className="slots">
          {SPONSORS_2026.map((sponsor) => (
            <li key={sponsor.name}>
              {sponsor.url ? (
                <a
                  className="slot"
                  href={sponsor.url}
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
          ))}
        </ul>
      </div>
    </section>
  )
}
