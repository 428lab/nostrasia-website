import { useTranslation } from 'react-i18next'

import { BbFace, BbHead } from './Faces'

/** locale の faq.items.* のキー */
const ITEMS = ['first', 'fee', 'when', 'keys', 'sponsor']

export const Faq = () => {
  const { t } = useTranslation()

  return (
    <BbFace
      id="faq"
      headingId="h-faq"
      diag={{ dir: 'r', f: 0.2, piece: 'half' }}
      arch={{ side: 1, rotate: 14 }}
    >
      <BbHead icon="faq" headingId="h-faq" />
      {ITEMS.map((key) => (
        <details key={key}>
          <summary>{t(`faq.items.${key}.q`)}</summary>
          <p>{t(`faq.items.${key}.a`)}</p>
        </details>
      ))}
    </BbFace>
  )
}
