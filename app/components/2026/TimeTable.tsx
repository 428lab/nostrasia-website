import { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026 } from '~/data/2026'
import { useRevealOnce } from '~/hooks/useRevealOnce'

import { BbFace, BbHead } from './Faces'
import { JoinButton } from './JoinButton'
import { localize } from './sections'

type Kind = 'T' | 'L' | 'W' | 'S'
/** a: 開始位置、l: 長さ（どちらも目盛り 1 つ = 1）、d: 伸びはじめる遅延（ms）、label: locale の timetable.bars.* */
type Bar = { kind: Kind; label: string; a: number; l: number; d: number }

// TODO: 時刻が決まったら app/data/2026.ts に移す
/** 目盛りの数（時刻は未定なので空の四角） */
const TICK_COUNT = 8
/** 枠だけのタイムテーブル（時刻・トラック・内容は未定。未定の時刻は空の四角） */
// prettier-ignore
const TRACKS: { id: string; bars: Bar[] }[] = [
  { id: 'A', bars: [
    { kind: 'T', label: 'talk', a: 0, l: 2, d: 0 },
    { kind: 'T', label: 'talk', a: 2, l: 2, d: 120 },
    { kind: 'S', label: 'social', a: 4.5, l: 1, d: 240 },
    { kind: 'T', label: 'talk', a: 5.5, l: 2.5, d: 360 },
  ] },
  { id: 'B', bars: [
    { kind: 'L', label: 'lt', a: 0.5, l: 1.5, d: 60 },
    { kind: 'L', label: 'lt', a: 2, l: 1.5, d: 180 },
    { kind: 'T', label: 'talk', a: 4, l: 2, d: 300 },
    { kind: 'L', label: 'lt', a: 6, l: 2, d: 420 },
  ] },
  { id: 'C', bars: [
    { kind: 'W', label: 'workshop', a: 0, l: 3, d: 120 },
    { kind: 'W', label: 'workshop', a: 3.5, l: 3, d: 280 },
  ] },
  { id: 'D', bars: [
    { kind: 'S', label: 'social', a: 0, l: 4, d: 180 },
    { kind: 'S', label: 'socialDj', a: 4, l: 4, d: 340 },
  ] },
]

const LEGEND: { label: string; color: string }[] = [
  { label: 'talk', color: '#8E30EB' },
  { label: 'lt', color: '#FF5A1F' },
  { label: 'workshop', color: '#0E7C7B' },
  { label: 'social', color: '#FFD400' },
]

/** 開催概要。未定の値は「調整中」「未定」の locale キーで出す */
const Overview = () => {
  const { t, i18n } = useTranslation()
  const { startTime, endTime, venue, fee } = EVENT_2026

  return (
    <>
      <h3 className="sr">{t('when.overview')}</h3>
      <dl className="ov" id="overview">
        <div>
          <dt>
            <i className="mk ye" />
            {t('when.date')}
          </dt>
          <dd className="m">
            {formatDate2026(EVENT_2026.date)}
            {startTime && endTime ? (
              <small>
                {t('when.timeRange', { start: startTime, end: endTime })}
              </small>
            ) : (
              <small>
                <i className="tq" />〜<i className="tq" />
                {t('tbd.time')}
              </small>
            )}
          </dd>
        </div>
        <div>
          <dt>
            <i className="mk t" />
            {t('when.venue')}
          </dt>
          <dd>{venue ? localize(venue.name, i18n) : t('tbd.venue')}</dd>
        </div>
        <div>
          <dt>
            <i className="mk c" />
            {t('when.fee')}
          </dt>
          <dd>{fee ? localize(fee, i18n) : t('tbd.fee')}</dd>
        </div>
      </dl>
    </>
  )
}

/** 枠だけのガント。画面に入ったときに 1 回だけ横棒を左から伸ばす */
const Gantt = () => {
  const { t } = useTranslation()
  const [ref, shown] = useRevealOnce<HTMLDivElement>()

  return (
    <>
      <p className="h3s">{t('timetable.kick')}</p>
      <div
        className="tt-scroll"
        role="region"
        aria-label={t('timetable.regionLabel')}
        // 横スクロールをキーボードでも動かせるように
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div ref={ref} className={shown ? 'gantt in' : 'gantt'}>
          <div className="axis" aria-hidden="true">
            <span />
            <div className="tk">
              {Array.from({ length: TICK_COUNT }, (_, i) => (
                <span key={i}>
                  <i className="tq" />
                </span>
              ))}
            </div>
          </div>
          {TRACKS.map((track) => (
            <div className="row" key={track.id}>
              <b>TRACK {track.id}</b>
              <div className="lane">
                {track.bars.map((bar, i) => (
                  <div
                    key={`${bar.label}-${i}`}
                    className={`bar2 ${bar.kind}`}
                    style={
                      {
                        '--a': bar.a,
                        '--l': bar.l,
                        '--d': bar.d,
                      } as CSSProperties
                    }
                  >
                    {t(`timetable.bars.${bar.label}`)}
                    <i className="tq" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="legend" aria-hidden="true">
        {LEGEND.map(({ label, color }) => (
          <span key={label}>
            <i style={{ background: color }} />
            {t(`timetable.bars.${label}`)}
          </span>
        ))}
        <span>
          <i className="tq" />
          {t('tbd.time')}
        </span>
      </div>
      <p className="bnote">{t('timetable.note')}</p>
    </>
  )
}

/** 参加費と参加登録。参加登録ボタンのページ内リンク先（#price） */
const Price = () => {
  const { t, i18n } = useTranslation()
  const { fee, registrationUrl } = EVENT_2026

  return (
    <>
      <BbHead icon="price" headingId="price" sub />
      <div className="panel">
        <div className="price">
          <p>
            {fee
              ? t('price.lead', {
                  fee: localize(fee, i18n),
                  interpolation: { escapeValue: false },
                })
              : t('price.leadTbd')}
          </p>
        </div>
        {!registrationUrl && <p className="bt">{t('price.text')}</p>}
        <JoinButton variant="section" />
        {!registrationUrl && <p className="bnote">{t('price.note')}</p>}
      </div>
    </>
  )
}

/** いつ？（開催概要・タイムテーブル）といくら？ をまとめた BB 面 */
export const TimeTable = () => (
  <BbFace
    id="timetable"
    headingId="h-when"
    diag={{ dir: 'r', f: 0.18, piece: 'square' }}
    arch={{ side: 1, rotate: 10 }}
  >
    <BbHead icon="timetable" headingId="h-when" />
    <Overview />
    <Gantt />
    <Price />
  </BbFace>
)
