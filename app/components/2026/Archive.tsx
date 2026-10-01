import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { ARCHIVES } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { SectionHead } from './SectionHead'

const ICONS: Record<number, ReactNode> = {
  2023: <circle cx="22" cy="22" r="20" fill="#8E30EB" />,
  2024: <path d="M22 2l20 38H2z" fill="#F2542D" />,
  2025: <rect x="4" y="4" width="36" height="36" fill="#F6C324" />,
}

export const Archive = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <section className="sec" id="archive">
      <div className="wrap">
        <SectionHead
          icon="archive"
          label={t('archive.label')}
          title={t('archive.title')}
        />
        <div className="ar">
          {ARCHIVES.map(({ year, href, external }) => {
            const content = (
              <>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  aria-hidden="true"
                >
                  {ICONS[year]}
                </svg>
                <p>
                  <b>{year}</b>
                  <span>{t(`archive.years.${year}`)}</span>
                </p>
              </>
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
