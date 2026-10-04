import { useTranslation } from 'react-i18next'

import { ARCHIVES } from '~/data/2026'
import { useTo } from '~/hooks/useTo'

import { GlyphWord, Ostrich } from './Glyph'
import { Lead, QSection } from './QSection'

export const Archive = () => {
  const { t } = useTranslation()
  const to = useTo()

  return (
    <>
      <QSection id="archive">
        <Lead i18nKey="archive.lead" values={{ n: ARCHIVES.length }} />
        <ul className="arc">
          {ARCHIVES.map((a) => {
            const inner = (
              <>
                <GlyphWord className="yr" text={String(a.year)} acc="...y" />
                <span className="sr">{a.year}</span>
                <span className="s">
                  {t(`archive.y${a.year}`)}
                  {'\n'}
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
      {/* フッター手前だけに出るダチョウ */}
      <div className="cut r p to-o" aria-hidden="true" />
      <div className="ost o" aria-hidden="true">
        <Ostrich />
        <p className="ost-cap">OSTRICH ／ 12 PIECES</p>
      </div>
    </>
  )
}
