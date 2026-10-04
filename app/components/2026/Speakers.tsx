import { useTranslation } from 'react-i18next'

import { SPEAKER_PLACEHOLDER_COUNT, SPEAKERS_2026 } from '~/data/2026'
import { PU, Shape, TE, YE } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'
import { localize } from './sections'

/** 図形アバター（円＝頭、半円＝胴）の色。順に繰り返す */
const AVATAR_COLORS = [PU, TE, YE]

export const Speakers = () => {
  const { t, i18n } = useTranslation()
  const tba = SPEAKERS_2026.length === 0

  return (
    <QSection
      id="speakers"
      marks={[
        { icon: <Shape kind="man" color={PU} />, label: t('speakers.capMark') },
      ]}
      caption={tba ? t('speakers.capTbd') : t('speakers.cap')}
    >
      {tba && <Lead i18nKey="speakers.lead" />}
      <ul className="sg">
        {tba
          ? Array.from({ length: SPEAKER_PLACEHOLDER_COUNT }, (_, i) => (
              <li key={i}>
                <Shape
                  kind="man"
                  color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  className="av"
                />
                <b>Speaker TBA</b>
                <span>{t('speakers.tba')}</span>
              </li>
            ))
          : SPEAKERS_2026.map((s, i) => (
              <li key={`${s.name}-${i}`}>
                {s.image ? (
                  <img className="av" src={s.image} alt="" />
                ) : (
                  <Shape
                    kind="man"
                    color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                    className="av"
                  />
                )}
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
