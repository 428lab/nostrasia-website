import { useTranslation } from 'react-i18next'

import { GtFace, Lead } from './Faces'

export const About = () => {
  const { t } = useTranslation()

  return (
    <GtFace id="about" no="01" anim="jump">
      <Lead i18nKey="about.lead" />
      <div className="def">
        <div>
          <h3>
            Nostrasia<small>Nostr × Asia</small>
          </h3>
          <p className="txt">{t('about.nostrasia')}</p>
        </div>
        <div>
          <h3>
            Nostr<small>Notes and Other Stuff Transmitted by Relays</small>
          </h3>
          <p className="txt">{t('about.nostr')}</p>
        </div>
      </div>
    </GtFace>
  )
}
