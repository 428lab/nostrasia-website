import { useTranslation } from 'react-i18next'

import { ARCHIVES } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { SectionHead } from './SectionHead'

export const Archive = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <section className="sec" id="archive">
      <div className="wrap">
        <SectionHead label={t('archive.label')} title={t('archive.title')} />
        <div className="ar">
          {ARCHIVES.map(({ year, href, external }) => {
            const content = (
              <p>
                <b>{year}</b>
                <span>{t(`archive.years.${year}`)}</span>
              </p>
            )
            // /2024 /2025 は年ごとに locale と CSS が違うので全ページ遷移にする
            return external ? (
              <a
                key={year}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <a key={year} href={to(href)}>
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
