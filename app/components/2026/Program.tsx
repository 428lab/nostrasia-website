import { useTranslation } from 'react-i18next'

import { GtFace, Lead } from './Faces'

/** locale の program.items.* のキー（過去回の企画） */
const ITEMS = ['talk', 'handson', 'market', 'shrine', 'show', 'dj']

export const Program = () => {
  const { t } = useTranslation()

  return (
    <GtFace id="program" no="02" anim="stamp">
      <Lead i18nKey="program.lead" />
      <p className="note top">{t('program.note')}</p>
      <ol className="big-list">
        {ITEMS.map((key, i) => (
          <li key={key}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{t(`program.items.${key}.title`)}</h3>
            <p>{t(`program.items.${key}.text`)}</p>
          </li>
        ))}
      </ol>
    </GtFace>
  )
}
