import { useTranslation } from 'react-i18next'

import { SectionHead } from './SectionHead'

/** locale の faq.items.* のキー */
const ITEMS = ['1', '2', '3', '4']

export const Faq = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <SectionHead icon="faq" label={t('faq.label')} title={t('faq.title')} />
        {ITEMS.map((key) => (
          <details key={key}>
            <summary>{t(`faq.items.${key}.q`)}</summary>
            <p>{t(`faq.items.${key}.a`)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
