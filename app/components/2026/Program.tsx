import { useTranslation } from 'react-i18next'

import { SectionHead } from './SectionHead'

/** コンテンツ（過去回の例）。key は locale の program.items.* */
const ITEMS = [
  'talk',
  'lt',
  'handson',
  'market',
  'shrine',
  'heroShow',
  'dj',
  'social',
]

export const Program = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="program">
      <div className="wrap">
        <SectionHead label={t('program.label')} title={t('program.title')} />
        <div className="cg">
          {ITEMS.map((key) => (
            <article className="cc" key={key}>
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
