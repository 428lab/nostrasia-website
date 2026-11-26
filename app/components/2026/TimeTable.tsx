import { CSSProperties, Fragment } from 'react'
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

/** 枠がまたぐ行の範囲 [from, to)。終わりの時刻以降に始まる最初の行の手前まで */
const rowsOf = (s: Session) => {
  const from = SLOTS.findIndex((slot) => slot.start === s.start)
  const to = SLOTS.findIndex((slot) => toMin(slot.start) >= toMin(s.end))
  return { from, to: to === -1 ? SLOTS.length : to }
}

const minutes = (s: Session) => toMin(s.end) - toMin(s.start)

/** 場所が決まっていて 1 時間以上続く枠（フリーマーケット・ボードゲームなど）。右の列に縦に伸ばす */
const isLong = (s: Session) => s.place !== 'all' && minutes(s) >= 60

/**
 * 各枠を置く列 [col, col + span) を決める。
 * 長い枠は右の列（いちばん長いものが右端）、それ以外は左の列に詰め、
 * そのあと短い枠を空いている列へ横に広げる（並行の枠がない行は全幅になる）。
 * narrow は長い枠だけの列（スマホでは細い縦書きの帯にする）
 */
const layout = () => {
  const overlaps = (a: Session, b: Session) => {
    const x = rowsOf(a)
    const y = rowsOf(b)
    return x.from < y.to && y.from < x.to
  }
  const assign = (sessions: Session[]) => {
    const lanes: Session[][] = []
    const laneOf = new Map<Session, number>()
    for (const s of sessions) {
      let lane = lanes.findIndex((l) => l.every((t) => !overlaps(s, t)))
      if (lane === -1) lane = lanes.push([]) - 1
      lanes[lane].push(s)
      laneOf.set(s, lane)
    }
    return { count: lanes.length, laneOf }
  }
  const short = assign(TIMETABLE_2026.filter((s) => !isLong(s)))
  const long = assign(
    TIMETABLE_2026.filter(isLong).sort((a, b) => minutes(b) - minutes(a)),
  )
  const cols = Math.max(short.count + long.count, 1)
  const narrow = Array.from({ length: cols }, (_, c) => c >= short.count)
  // used[row][col] は、そのマスがもう埋まっているか
  const used = SLOTS.map(() => Array<boolean>(cols).fill(false))
  const place = new Map<Session, { col: number; span: number }>()
  for (const s of TIMETABLE_2026) {
    const col = isLong(s)
      ? cols - 1 - (long.laneOf.get(s) ?? 0)
      : (short.laneOf.get(s) ?? 0)
    place.set(s, { col, span: 1 })
    const { from, to } = rowsOf(s)
    for (let r = from; r < to; r++) used[r][col] = true
  }
  const free = (s: Session, col: number) => {
    const { from, to } = rowsOf(s)
    for (let r = from; r < to; r++) if (used[r][col]) return false
    return true
  }
  // 長い枠は自分の列だけに置き、横には広げない（スマホの縦書きの帯が太らないように）
  for (const s of TIMETABLE_2026.filter((t) => !isLong(t))) {
    const p = place.get(s)!
    const { from, to } = rowsOf(s)
    const take = (col: number) => {
      for (let r = from; r < to; r++) used[r][col] = true
    }
    while (p.col > 0 && free(s, p.col - 1)) {
      p.col--
      p.span++
      take(p.col)
    }
    while (p.col + p.span < cols && free(s, p.col + p.span)) {
      take(p.col + p.span)
      p.span++
    }
  }
  return { cols, narrow, place }
}

const LAYOUT = layout()

/** 登壇枠の番号（メインセッション N / LT N の N）。同じ種類の枠の中で何番目か */
const kindNumber = (s: Session) =>
  TIMETABLE_2026.filter((t) => t.kind === s.kind).indexOf(s) + 1

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

/** 全枠をページ内に縦の時間軸で出す。左に時刻、縦線に時刻ごとの丸印、右に枠のカード（長い枠は終わりの行まで縦に伸ばす） */
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
  // グリッドの行番号。「いま」の線を引くときは、その手前に 1 行足す
  const row = (i: number) =>
    i + 1 + (nowBefore !== -1 && i >= nowBefore ? 1 : 0)

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        <div className="tt-day">
          <p className="tt-day-t">
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
        <div
          className="tt-line"
          style={
            {
              // PC は列をすべて同じ幅、スマホは長い枠だけの列を細い帯にする
              '--lanes': `repeat(${LAYOUT.cols}, minmax(0, 1fr))`,
              '--lanes-sp': LAYOUT.narrow
                .map((n) => (n ? 'var(--nw)' : 'minmax(0, 1fr)'))
                .join(' '),
            } as CSSProperties
          }
        >
          {nowBefore !== -1 && nowMin !== null && (
            <div
              className="tt-now"
              style={{ gridRow: row(nowBefore) - 1 }}
              aria-hidden="true"
            >
              <span className="tt-now-l">{t('timetable.now')}</span>
              <span className="tt-dot" />
              <time>{hhmm(nowMin)}</time>
            </div>
          )}
          {SLOTS.map((slot, i) => {
            // 終わりが揃っていれば左に出し、ばらばらなら各カードに出す
            const sameEnd = new Set(slot.items.map((s) => s.end)).size === 1
            const states = slot.items.map((s) => stateOf(s, phase))
            const rowState = states.every((st) => st === 'past')
              ? 'past'
              : states.includes('live')
                ? 'live'
                : ''
            return (
              <Fragment key={slot.start}>
                <div
                  className={`tt-when ${rowState}`}
                  style={{ gridRow: row(i) }}
                >
                  <time className="tt-start">{slot.start}</time>
                  {sameEnd && (
                    <time className="tt-end">– {slot.items[0].end}</time>
                  )}
                </div>
                <span
                  className={`tt-dot ${rowState}`}
                  style={{ gridRow: row(i) }}
                  aria-hidden="true"
                />
                {slot.items.map((s, j) => {
                  const p = LAYOUT.place.get(s)!
                  const { to } = rowsOf(s)
                  const narrow = LAYOUT.narrow[p.col]
                  return (
                    <div
                      key={s.title.ja}
                      className={`tt-card p-${s.place} ${states[j]}${narrow ? ' narrow' : ''}`}
                      style={{
                        gridRow: `${row(i)} / ${row(to)}`,
                        gridColumn: `${p.col + 3} / span ${p.span}`,
                      }}
                    >
                      {!sameEnd && <time className="tt-end">– {s.end}</time>}
                      <b className="tt-title">
                        {s.kind
                          ? t(`timetable.kind.${s.kind}`, { n: kindNumber(s) })
                          : localized(s.title)}
                      </b>
                      {s.kind && (
                        <span className="tt-talk">
                          {s.speaker && (
                            <b className="tt-talk-by">{s.speaker}</b>
                          )}
                          <span className="tt-talk-t">
                            {localized(s.title)}
                          </span>
                        </span>
                      )}
                      {s.note && (
                        <span className="tt-note">{localized(s.note)}</span>
                      )}
                      <div className="tt-meta">
                        <span className={`tt-place p-${s.place}`}>
                          {t(`timetable.place.${s.place}`)}
                        </span>
                        {!s.kind && s.speaker && (
                          <span className="tt-by">{s.speaker}</span>
                        )}
                        {states[j] === 'live' && (
                          <span className="tt-live">{t('timetable.live')}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </Fragment>
            )
          })}
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
