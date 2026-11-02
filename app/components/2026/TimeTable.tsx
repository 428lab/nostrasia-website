import { Trans, useTranslation } from 'react-i18next'

import { EVENT_2026, TIMETABLE_2026 } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** 時刻順の一覧。空のあいだはセクションを出さない */
export const TimeTable = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const { registrationUrl } = EVENT_2026

  if (TIMETABLE_2026.length === 0) return null

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        <ol className="tt-list">
          {TIMETABLE_2026.map((s) => (
            <li key={`${s.start}-${s.place}`}>
              <time className="tt-time">{`${s.start}–${s.end}`}</time>
              <div>
                <b className="tt-title">{localized(s.title)}</b>
                <div className="tt-meta">
                  <span className={`tt-place p-${s.place}`}>
                    {t(`timetable.place.${s.place}`)}
                  </span>
                  {s.speaker && <span className="tt-by">{s.speaker}</span>}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="note">
          {/* registrationUrl が無ければ「events lab」をリンクにしない */}
          <Trans
            i18nKey="timetable.note"
            components={{
              a: registrationUrl ? (
                // 中身（events lab）は Trans が訳文から入れる
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ) : (
                <span />
              ),
            }}
          />
        </p>
      </div>
    </section>
  )
}
