import { CSSProperties, Fragment, useRef } from 'react'
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

/** ページ内は小さな一覧だけ出し、タップで全体（ダイアログ）を開く */
export const TimeTable = () => {
  const { t, i18n } = useTranslation()
  const localized = useLocalized()
  const dialog = useRef<HTMLDialogElement>(null)
  const now = useJstNow()
  const phase = phaseOf(now)
  const { registrationUrl } = EVENT_2026

  if (TIMETABLE_2026.length === 0) return null

  const nowMin = phase?.kind === 'live' ? phase.min : null
  // 「いま」の線は、まだ始まっていない最初の枠の手前に引く
  const nowBefore =
    nowMin === null
      ? -1
      : TIMETABLE_2026.findIndex((s) => toMin(s.start) > nowMin)

  const open = () => {
    const d = dialog.current
    if (!d) return
    d.showModal()
    // 当日は「いま」の位置を真ん中まで送る。開いた直後は「閉じる」へのフォーカスで先頭に戻るので 1 フレーム待つ
    requestAnimationFrame(() => {
      const mark = d.querySelector('.tt-now') ?? d.querySelector('.tt-row.live')
      if (!mark) return
      const top =
        mark.getBoundingClientRect().top - d.getBoundingClientRect().top
      d.scrollTop += top - d.clientHeight / 2
    })
  }

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        <button type="button" className="tt-peek" onClick={open}>
          <span className="tt-peek-top">
            <Status phase={phase} />
            <span className="tt-open">{t('timetable.open')}</span>
          </span>
          {/* PC の 2 列は上から下へ読む順に詰める */}
          <span
            className="tt-mini"
            style={
              {
                '--rows': Math.ceil(TIMETABLE_2026.length / 2),
              } as CSSProperties
            }
          >
            {TIMETABLE_2026.map((s) => (
              <span
                key={`${s.start}-${s.place}`}
                className={`tt-mini-i p-${s.place} ${stateOf(s, phase)}`}
              >
                <time>{s.start}</time>
                {localized(s.title)}
              </span>
            ))}
          </span>
        </button>
      </div>

      {/* 背景タップで閉じる。キーボードは dialog 標準の Esc */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialog}
        className="tt-dlg"
        aria-label={t('timetable.title')}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className="tt-dlg-in">
          {/* 見出しは一覧を送っても上に残す */}
          <header className="tt-head">
            <div>
              <p className="tt-head-l">{t('timetable.label')}</p>
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
            <button
              type="button"
              className="tt-x"
              onClick={() => dialog.current?.close()}
            >
              {t('timetable.close')}
            </button>
          </header>
          <ol className="tt-list">
            {TIMETABLE_2026.map((s, i) => (
              <Fragment key={`${s.start}-${s.place}`}>
                {i === nowBefore && nowMin !== null && (
                  <li className="tt-now" aria-hidden="true">
                    <span>{t('timetable.now')}</span>
                    <time>{hhmm(nowMin)}</time>
                  </li>
                )}
                <li className={`tt-row p-${s.place} ${stateOf(s, phase)}`}>
                  <div className="tt-when">
                    <time className="tt-start">{s.start}</time>
                    <time className="tt-end">– {s.end}</time>
                  </div>
                  <div className="tt-what">
                    <b className="tt-title">{localized(s.title)}</b>
                    <div className="tt-meta">
                      <span className={`tt-place p-${s.place}`}>
                        {t(`timetable.place.${s.place}`)}
                      </span>
                      {s.speaker && <span className="tt-by">{s.speaker}</span>}
                      {stateOf(s, phase) === 'live' && (
                        <span className="tt-live">{t('timetable.live')}</span>
                      )}
                    </div>
                  </div>
                </li>
              </Fragment>
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
      </dialog>
    </section>
  )
}
