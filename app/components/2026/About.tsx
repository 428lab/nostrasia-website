import { useTranslation } from 'react-i18next'

import { Lead, QSection } from './QSection'

export const About = () => {
  const { t } = useTranslation()
  return (
    <QSection id="about">
      <Lead i18nKey="about.lead" />
      <div className="def">
        <div className="card">
          <h3>
            Nostrasia<small>{t('about.nostrasiaSub')}</small>
          </h3>
          <p className="txt">{t('about.nostrasiaText')}</p>
        </div>
        <div className="card">
          <h3>
            Nostr<small>{t('about.nostrSub')}</small>
          </h3>
          <p className="txt">{t('about.nostrText')}</p>
        </div>
      </div>
    </QSection>
  )
}

const PROGRAM = ['talk', 'handson', 'market', 'shrine', 'show', 'dj'] as const

export const Program = () => {
  const { t } = useTranslation()
  return (
    <QSection id="program">
      <Lead i18nKey="program.lead" />
      <p className="note">{t('program.note')}</p>
      <ol className="prog">
        {PROGRAM.map((key, i) => (
          <li key={key} className="card">
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t(`program.items.${key}.title`)}</h3>
            <p>{t(`program.items.${key}.text`)}</p>
          </li>
        ))}
      </ol>
    </QSection>
  )
}
