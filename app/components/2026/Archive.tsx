import { useTranslation } from 'react-i18next'

import { ARCHIVES } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { Lead, QSection } from './QSection'

export const Archive = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <QSection id="archive">
      <Lead i18nKey="archive.lead" values={{ n: ARCHIVES.length }} />
      <ul className="arc">
        {ARCHIVES.map((a) => (
          <li key={a.year}>
            {a.external ? (
              <a href={a.href} target="_blank" rel="noopener noreferrer">
                <span className="y">{a.year}</span>
                <span className="s">
                  {t(`archive.y${a.year}`)}
                  {'\n'}
                  {t('archive.external')}
                </span>
              </a>
            ) : (
              // /2024 /2025 は年ごとに locale と CSS が違うので全ページ遷移にする
              <a href={to(a.href)}>
                <span className="y">{a.year}</span>
                <span className="s">
                  {t(`archive.y${a.year}`)}
                  {'\n'}
                  {t('archive.internal')}
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </QSection>
  )
}
