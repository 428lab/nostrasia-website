import { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

import { formatTime } from '~/data/2026'
import { useRevealOnce } from '~/hooks/useRevealOnce'

import { SectionHead } from './SectionHead'

type Kind = 'T' | 'L' | 'W' | 'S'
type Bar = {
  kind: Kind
  label: string
  time: boolean
  a: number
  l: number
  d: number
}

// TODO: 時刻が決まったら app/data/2026.ts に移す
/** 時刻の目盛り（未定は null → --:--） */
const TICKS: (string | null)[] = Array(8).fill(null)
/**
 * 枠だけのタイムテーブル（時刻・内容は未定）。
 * a: 開始位置、l: 長さ（どちらも目盛り 1 つ = 1）、d: 伸びはじめる遅延（ms）、
 * label: locale の timetable.bars.*、time: true なら下段に時刻（未定は --:--）、false なら TBA
 */
// prettier-ignore
const TRACKS: { id: string; name: string; bars: Bar[] }[] = [
  {
    id: 'A',
    name: 'main',
    bars: [
      { kind: 'T', label: 'talk', time: false, a: 0, l: 2, d: 0 },
      { kind: 'T', label: 'talk', time: false, a: 2, l: 2, d: 120 },
      { kind: 'S', label: 'social', time: true, a: 4.5, l: 1, d: 240 },
      { kind: 'T', label: 'talk', time: false, a: 5.5, l: 2.5, d: 360 },
    ],
  },
  {
    id: 'B',
    name: 'sub',
    bars: [
      { kind: 'L', label: 'lt', time: false, a: 0.5, l: 1.5, d: 60 },
      { kind: 'L', label: 'lt', time: false, a: 2, l: 1.5, d: 180 },
      { kind: 'T', label: 'talk', time: false, a: 4, l: 2, d: 300 },
      { kind: 'L', label: 'lt', time: false, a: 6, l: 2, d: 420 },
    ],
  },
  {
    id: 'C',
    name: 'handson',
    bars: [
      { kind: 'W', label: 'workshop', time: false, a: 0, l: 3, d: 120 },
      { kind: 'W', label: 'workshop', time: false, a: 3.5, l: 3, d: 280 },
    ],
  },
  {
    id: 'D',
    name: 'plaza',
    bars: [
      { kind: 'S', label: 'socialMarket', time: true, a: 0, l: 4, d: 180 },
      { kind: 'S', label: 'socialDj', time: true, a: 4, l: 4, d: 340 },
    ],
  },
]

const LEGEND: { kind: Kind; label: string; color: string }[] = [
  { kind: 'T', label: 'talk', color: '#8E30EB' },
  { kind: 'L', label: 'lt', color: '#F2542D' },
  { kind: 'W', label: 'workshop', color: '#0E7C7B' },
  { kind: 'S', label: 'social', color: '#F6C324' },
]

export const TimeTable = () => {
  const { t } = useTranslation()
  // 画面に入ったときに 1 回だけバーを左から伸ばす
  const [ref, shown] = useRevealOnce<HTMLDivElement>()

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          icon="timetable"
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        <div className="tt-scroll">
          <div ref={ref} className={shown ? 'gantt in' : 'gantt'}>
            <div className="axis">
              <span />
              <div className="tk">
                {TICKS.map((time, i) => (
                  <span key={i}>{formatTime(time)}</span>
                ))}
              </div>
            </div>
            {TRACKS.map((track) => (
              <div className="row" key={track.id}>
                <b>
                  {t('timetable.track', { id: track.id })}
                  <small>{t(`timetable.tracks.${track.name}`)}</small>
                </b>
                <div className="lane">
                  {track.bars.map((bar, i) => (
                    <div
                      key={i}
                      className={`bar ${bar.kind}`}
                      style={
                        {
                          '--a': bar.a,
                          '--l': bar.l,
                          '--d': bar.d,
                        } as CSSProperties
                      }
                    >
                      {t(`timetable.bars.${bar.label}`)}
                      <small>
                        {bar.time ? formatTime(null) : t('timetable.bars.tba')}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="legend">
          {LEGEND.map(({ kind, label, color }) => (
            <span key={kind}>
              <i style={{ background: color }} />
              {t(`timetable.bars.${label}`)}
            </span>
          ))}
        </div>
        <p className="note">{t('timetable.note')}</p>
      </div>
    </section>
  )
}
