import { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import {
  EVENT_2026,
  formatDate2026,
  Session,
  TIMETABLE_2026,
  weekday2026,
} from '~/data/2026'
import { JstNow, toMin, useJstNow } from '~/hooks/useJstNow'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

const DAY_MS = 24 * 60 * 60 * 1000

type Phase =
  | { kind: 'before'; days: number }
  | { kind: 'soon'; min: number }
  | { kind: 'live'; min: number }
  | { kind: 'ended' }

/** 開催日と現在時刻（日本時間）から、いまが当日のどこかを決める */
const phaseOf = (now: JstNow | null): Phase | null => {
  const date = EVENT_2026.date
  if (!now || !date || TIMETABLE_2026.length === 0) return null
  const start = toMin(TIMETABLE_2026[0].start)
  const end = Math.max(...TIMETABLE_2026.map((s) => toMin(s.end)))
  if (now.date < date) {
    return {
      kind: 'before',
      days: Math.round((Date.parse(date) - Date.parse(now.date)) / DAY_MS),
    }
  }
  if (now.date > date || now.min >= end) return { kind: 'ended' }
  if (now.min < start) return { kind: 'soon', min: start - now.min }
  return { kind: 'live', min: now.min }
}

const hhmm = (min: number) =>
  `${Math.floor(min / 60)}:${String(min % 60).padStart(2, '0')}`

/** 当日の進行中は、その枠が終わったか・いまやっているか */
const stateOf = (s: Session, phase: Phase | null) => {
  if (phase?.kind === 'ended') return 'past'
  if (phase?.kind !== 'live') return ''
  if (phase.min >= toMin(s.end)) return 'past'
  if (phase.min >= toMin(s.start)) return 'live'
  return ''
}

/** 同じ時刻に始まる枠を 1 行にまとめる（並行して動くものを横に並べて見せる） */
const SLOTS = TIMETABLE_2026.reduce<{ start: string; items: Session[] }[]>(
  (acc, s) => {
    const last = acc[acc.length - 1]
    if (last?.start === s.start) last.items.push(s)
    else acc.push({ start: s.start, items: [s] })
    return acc
  },
  [],
)

const Status = ({ phase }: { phase: Phase | null }) => {
  const { t } = useTranslation()
  if (!phase) return null
  const text =
    phase.kind === 'before'
      ? t('timetable.daysLeft', { count: phase.days })
      : phase.kind === 'soon'
        ? t('timetable.startsIn', { time: hhmm(phase.min) })
        : phase.kind === 'live'
          ? t('timetable.nowAt', { time: hhmm(phase.min) })
          : t('timetable.ended')
  return <span className={`tt-status s-${phase.kind}`}>{text}</span>
}

/** 全枠をページ内に出す。日付と「いま」の見出しは、表を読んでいるあいだ上に残す */
export const TimeTable = () => {
  const { t, i18n } = useTranslation()
  const localized = useLocalized()
  const now = useJstNow()
  const phase = phaseOf(now)
  const { registrationUrl } = EVENT_2026

  if (TIMETABLE_2026.length === 0) return null

  const nowMin = phase?.kind === 'live' ? phase.min : null
  // 「いま」の線は、まだ始まっていない最初の枠の手前に引く
  const nowBefore =
    nowMin === null ? -1 : SLOTS.findIndex((slot) => toMin(slot.start) > nowMin)

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        <div className="tt">
          <div className="tt-head">
            <p className="tt-head-t">
              {t('timetable.dayTitle', {
                date: formatDate2026(EVENT_2026.date),
                wd: weekday2026(
                  EVENT_2026.date,
                  i18n.resolvedLanguage?.startsWith('ja') ? 'ja' : 'en',
                ),
              })}
            </p>
            <Status phase={phase} />
          </div>
          <ol className="tt-list">
            {SLOTS.map((slot, i) => {
              // 終わりが揃っていれば左に出し、ばらばらなら各カードに出す
              const ends = new Set(slot.items.map((s) => s.end))
              const sameEnd = ends.size === 1
              const states = slot.items.map((s) => stateOf(s, phase))
              return (
                <Fragment key={slot.start}>
                  {i === nowBefore && nowMin !== null && (
                    <li className="tt-now" aria-hidden="true">
                      <span>{t('timetable.now')}</span>
                      <time>{hhmm(nowMin)}</time>
                    </li>
                  )}
                  <li
                    className={
                      states.every((st) => st === 'past')
                        ? 'tt-row past'
                        : 'tt-row'
                    }
                  >
                    <div className="tt-when">
                      <time className="tt-start">{slot.start}</time>
                      {sameEnd && (
                        <time className="tt-end">– {slot.items[0].end}</time>
                      )}
                    </div>
                    <div className="tt-cards">
                      {slot.items.map((s, j) => (
                        <div
                          key={s.place}
                          className={`tt-card p-${s.place} ${states[j]}`}
                        >
                          {!sameEnd && (
                            <time className="tt-end">– {s.end}</time>
                          )}
                          <b className="tt-title">{localized(s.title)}</b>
                          <div className="tt-meta">
                            <span className={`tt-place p-${s.place}`}>
                              {t(`timetable.place.${s.place}`)}
                            </span>
                            {s.speaker && (
                              <span className="tt-by">{s.speaker}</span>
                            )}
                            {states[j] === 'live' && (
                              <span className="tt-live">
                                {t('timetable.live')}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                </Fragment>
              )
            })}
          </ol>
        </div>
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
