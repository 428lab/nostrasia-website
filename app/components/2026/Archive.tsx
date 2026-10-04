import { useTranslation } from 'react-i18next'

import { ARCHIVES } from '~/data/2026'
import { useTo } from '~/hooks/useTo'
import { PU, Shape, TE, YE } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'

/** 開催した年は塗った四角。色は年ごと */
const YEAR_COLORS = [PU, YE, TE]

export const Archive = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <QSection
      id="archive"
      marks={[
        { icon: <Shape kind="sq" color={PU} />, label: t('archive.capYears') },
        { icon: <Shape kind="sqh" />, label: t('archive.cap2026') },
      ]}
      caption={t('archive.cap')}
    >
      <Lead i18nKey="archive.lead" values={{ n: ARCHIVES.length }} />
      <ul className="arc">
        {ARCHIVES.map((a, i) => {
          const inner = (
            <>
              <Shape kind="sq" color={YEAR_COLORS[i % YEAR_COLORS.length]} />
              <span className="y">{a.year}</span>
              <span className="s">
                {t(`archive.y${a.year}`)}
                <br />
                {a.external ? t('archive.external') : t('archive.internal')}
              </span>
            </>
          )
          return (
            <li key={a.year}>
              {a.external ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                // /2024 /2025 は年ごとに locale と CSS が違うので全ページ遷移にする
                <a href={to(a.href)}>{inner}</a>
              )}
            </li>
          )
        })}
      </ul>
    </QSection>
  )
}
