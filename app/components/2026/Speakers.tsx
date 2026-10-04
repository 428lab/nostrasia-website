import { useTranslation } from 'react-i18next'

import { SPEAKER_PLACEHOLDER_COUNT, SPEAKERS_2026 } from '~/data/2026'

import { QGlyph } from './Glyph'
import { Lead, QSection } from './QSection'
import { localize } from './sections'

export const Speakers = () => {
  const { t, i18n } = useTranslation()
  const tba = SPEAKERS_2026.length === 0

  return (
    <QSection id="speakers">
      {tba && <Lead i18nKey="speakers.lead" />}
      <ul className="spk">
        {tba
          ? Array.from({ length: SPEAKER_PLACEHOLDER_COUNT }, (_, i) => (
              <li key={i} className="card">
                {/* 顔の枠に組みかけの「？」 */}
                <div className="face" aria-hidden="true">
                  <QGlyph v="f" face={i} />
                </div>
                <b>Speaker TBA</b>
                <span>{t('speakers.tba')}</span>
              </li>
            ))
          : SPEAKERS_2026.map((s, i) => (
              <li key={`${s.name}-${i}`} className="card">
                <div className="face" aria-hidden="true">
                  {s.image ? (
                    <img src={s.image} alt="" />
                  ) : (
                    <QGlyph v="f" face={i} />
                  )}
                </div>
                <b>
                  {s.profileUrl ? (
                    <a
                      href={s.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.name}
                    </a>
                  ) : (
                    s.name
                  )}
                </b>
                {s.title && <span>{localize(s.title, i18n)}</span>}
              </li>
            ))}
      </ul>
      {tba && <p className="note">{t('speakers.note')}</p>}
    </QSection>
  )
}
