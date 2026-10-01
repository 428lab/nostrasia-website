import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionHead } from './SectionHead'

/** コンテンツ（過去回の例）。key は locale の program.items.* */
const ITEMS: { key: string; icon: ReactNode }[] = [
  { key: 'talk', icon: <circle cx="26" cy="26" r="22" fill="#8E30EB" /> },
  { key: 'lt', icon: <path d="M4 38a22 22 0 0 1 44 0z" fill="#0E7C7B" /> },
  {
    key: 'handson',
    icon: (
      <>
        <rect x="6" y="6" width="40" height="40" fill="#F6C324" />
        <circle cx="26" cy="26" r="8" fill="#161616" />
      </>
    ),
  },
  { key: 'market', icon: <path d="M26 4l22 42H4z" fill="#F2542D" /> },
  {
    key: 'shrine',
    icon: (
      <>
        <rect x="4" y="8" width="44" height="6" fill="#F2542D" />
        <rect x="8" y="18" width="36" height="4" fill="#F2542D" />
        <rect x="12" y="14" width="5" height="34" fill="#161616" />
        <rect x="35" y="14" width="5" height="34" fill="#161616" />
      </>
    ),
  },
  {
    key: 'heroShow',
    icon: (
      <>
        <circle cx="26" cy="32" r="16" fill="#8E30EB" />
        <path d="M26 2l12 22H14z" fill="#F6C324" />
      </>
    ),
  },
  {
    key: 'dj',
    icon: (
      <>
        <circle cx="26" cy="26" r="22" fill="#161616" />
        <circle cx="26" cy="26" r="14" fill="#0E7C7B" />
        <circle cx="26" cy="26" r="5" fill="#F6C324" />
      </>
    ),
  },
  {
    key: 'social',
    icon: (
      <>
        <circle cx="15" cy="15" r="9" fill="#8E30EB" />
        <circle cx="37" cy="15" r="9" fill="#F2542D" />
        <circle cx="15" cy="37" r="9" fill="#F6C324" />
        <circle cx="37" cy="37" r="9" fill="#0E7C7B" />
      </>
    ),
  },
]

export const Program = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="program">
      <div className="wrap">
        <SectionHead
          icon="program"
          label={t('program.label')}
          title={t('program.title')}
        />
        <div className="cg">
          {ITEMS.map(({ key, icon }) => (
            <article className="cc" key={key}>
              <svg viewBox="0 0 52 52" aria-hidden="true">
                {icon}
              </svg>
              <h3>
                <small>{t(`program.items.${key}.label`)}</small>
                {t(`program.items.${key}.title`)}
              </h3>
              <p>{t(`program.items.${key}.desc`)}</p>
            </article>
          ))}
        </div>
        <p className="note">{t('program.note')}</p>
      </div>
    </section>
  )
}
