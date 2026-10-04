import { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026, formatTime } from '~/data/2026'
import { useRevealOnce } from '~/hooks/useRevealOnce'
import { Shape } from '~/icons/2026/Shapes'

import { Lead, QSection } from './QSection'
import { localize } from './sections'

// TODO: 時刻が決まったら app/data/2026.ts に移す
/** 時刻の目盛り（8 コマ）。未定のあいだは --:-- */
const TICKS: (string | null)[] = Array(8).fill(null)
/**
 * タイムテーブルのイメージ（枠だけ）。a: 開始コマ、l: 長さ（コマ数）、d: 置かれる順。
 * kind: T = Talk / L = LT / W = Workshop / S = Social
 */
const TRACKS: {
  name: string
  bars: { kind: 'T' | 'L' | 'W' | 'S'; a: number; l: number; d: number }[]
}[] = [
  {
    name: 'TRACK A',
    bars: [
      { kind: 'T', a: 0, l: 2, d: 0 },
      { kind: 'T', a: 2, l: 2, d: 3 },
      { kind: 'S', a: 4.5, l: 1, d: 7 },
      { kind: 'T', a: 5.5, l: 2.5, d: 10 },
    ],
  },
  {
    name: 'TRACK B',
    bars: [
      { kind: 'L', a: 0.5, l: 1.5, d: 1 },
      { kind: 'L', a: 2, l: 1.5, d: 4 },
      { kind: 'T', a: 4, l: 2, d: 8 },
      { kind: 'L', a: 6, l: 2, d: 11 },
    ],
  },
  {
    name: 'TRACK C',
    bars: [
      { kind: 'W', a: 0, l: 3, d: 2 },
      { kind: 'W', a: 3.5, l: 3, d: 9 },
    ],
  },
  {
    name: 'TRACK D',
    bars: [
      { kind: 'S', a: 0, l: 4, d: 5 },
      { kind: 'S', a: 4, l: 4, d: 6 },
    ],
  },
]
const KIND_LABEL = { T: 'Talk', L: 'LT', W: 'Workshop', S: 'Social' } as const
const LEGEND = [
  { kind: 'T', color: '#8E30EB' },
  { kind: 'L', color: '#FFD400' },
  { kind: 'W', color: '#0E7C7B' },
  { kind: 'S', color: '#F5F5F5' },
] as const

export const TimeTable = () => {
  const { t, i18n } = useTranslation()
  const [ganttRef, shown] = useRevealOnce<HTMLDivElement>(0.3)
  const { date, startTime, endTime, venue, fee } = EVENT_2026
  const dateText = formatDate2026(date)
  const raw = { interpolation: { escapeValue: false } }

  return (
    <QSection
      id="timetable"
      marks={[
        {
          icon: <Shape kind="sqh" />,
          label: date ? t('timetable.capMark') : t('timetable.capMarkTbd'),
        },
      ]}
      caption={
        date
          ? t('timetable.cap', { date: dateText, ...raw })
          : t('timetable.capTbd', { date: dateText, ...raw })
      }
    >
      {date ? (
        <Lead i18nKey="timetable.lead" values={{ date: dateText }} />
      ) : (
        <Lead i18nKey="timetable.leadTbd" />
      )}
      <dl className="ov" id="overview" aria-label={t('a11y.overview')}>
        <div>
          <dt>{t('timetable.date')}</dt>
          <dd>
            {dateText}
            <small>
              {t('timetable.timeRange', {
                start: formatTime(startTime),
                end: formatTime(endTime),
                ...raw,
              })}
            </small>
          </dd>
        </div>
        <div>
          <dt>{t('timetable.venue')}</dt>
          <dd>{venue ? localize(venue.name, i18n) : t('tbd.short')}</dd>
        </div>
        <div>
          <dt>{t('timetable.fee')}</dt>
          <dd>{fee ? localize(fee, i18n) : t('tbd.short')}</dd>
        </div>
      </dl>
      <span className="kick">{t('timetable.kick')}</span>
      {/* 横スクロールする表なので、キーボードでもスクロールできるようにフォーカスを受ける */}
      <div
        className="tt-scroll"
        role="region"
        aria-label={t('timetable.tableLabel')}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div ref={ganttRef} className={shown ? 'gantt in' : 'gantt'}>
          <div className="axis">
            <span />
            <div className="tk">
              {TICKS.map((tick, i) => (
                <span key={i}>{formatTime(tick)}</span>
              ))}
            </div>
          </div>
          {TRACKS.map((track) => (
            <div key={track.name} className="row">
              <b>{track.name}</b>
              <div className="lane">
                {track.bars.map((bar) => (
                  <div
                    key={bar.d}
                    className={`gb ${bar.kind}`}
                    style={
                      {
                        '--a': bar.a,
                        '--l': bar.l,
                        '--d': bar.d,
                      } as CSSProperties
                    }
                  >
                    {KIND_LABEL[bar.kind]}
                    <small>TBA</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="legend">
        {LEGEND.map((l) => (
          <span key={l.kind}>
            <i style={{ background: l.color }} />
            {KIND_LABEL[l.kind]}
          </span>
        ))}
      </div>
      <p className="note">{t('timetable.note')}</p>
    </QSection>
  )
}
