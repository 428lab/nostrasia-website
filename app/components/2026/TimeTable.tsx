import { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

import { useRevealOnce } from '~/hooks/useRevealOnce'

import { SectionHead } from './SectionHead'
import { Veil } from './Veil'

type Kind = 'T' | 'L' | 'W' | 'S'
/** 枠の位置だけを持つ。a: 開始位置、l: 長さ（どちらも目盛り 1 つ = 1）、d: 伸びはじめる遅延（ms） */
type Bar = { kind: Kind; a: number; l: number; d: number }

/** 時刻・内容が決まったら true にして、膜を外す */
const TIMETABLE_READY = false
/** 目盛りの数。時刻はまだ決まっていないので、すべて TBD と出す */
const TICK_COUNT = 8
/**
 * 枠だけのタイムテーブル。時刻・内容・トラックはすべて未定（TBD）。
 * 決まったら時刻・トラック名・枠の内容を app/data/2026.ts に持たせて載せ替える。
 * 色（kind）は見た目のためだけで、まだ意味を持たせない。
 */
// prettier-ignore
const TRACKS: { id: string; bars: Bar[] }[] = [
  {
    id: 'A',
    bars: [
      { kind: 'T', a: 0, l: 2, d: 0 },
      { kind: 'T', a: 2, l: 2, d: 120 },
      { kind: 'S', a: 4.5, l: 1, d: 240 },
      { kind: 'T', a: 5.5, l: 2.5, d: 360 },
    ],
  },
  {
    id: 'B',
    bars: [
      { kind: 'L', a: 0.5, l: 1.5, d: 60 },
      { kind: 'L', a: 2, l: 1.5, d: 180 },
      { kind: 'T', a: 4, l: 2, d: 300 },
      { kind: 'L', a: 6, l: 2, d: 420 },
    ],
  },
  {
    id: 'C',
    bars: [
      { kind: 'W', a: 0, l: 3, d: 120 },
      { kind: 'W', a: 3.5, l: 3, d: 280 },
    ],
  },
  {
    id: 'D',
    bars: [
      { kind: 'S', a: 0, l: 4, d: 180 },
      { kind: 'S', a: 4, l: 4, d: 340 },
    ],
  },
]

export const TimeTable = () => {
  const { t } = useTranslation()
  // 画面に入ったときに 1 回だけバーを左から伸ばす
  const [ref, shown] = useRevealOnce<HTMLDivElement>()

  return (
    <section className="sec" id="timetable">
      <div className="wrap">
        <SectionHead
          label={t('timetable.label')}
          title={t('timetable.title')}
        />
        {TIMETABLE_READY ? (
          <>
            <div className="tt-scroll">
              <div ref={ref} className={shown ? 'gantt in' : 'gantt'}>
                <div className="axis">
                  <span />
                  <div className="tk">
                    {Array.from({ length: TICK_COUNT }, (_, i) => (
                      <span key={i}>{t('timetable.tbd')}</span>
                    ))}
                  </div>
                </div>
                {TRACKS.map((track) => (
                  <div className="row" key={track.id}>
                    <b>
                      {t('timetable.track', { id: track.id })}
                      <small>{t('timetable.tbd')}</small>
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
                          {t('timetable.tbd')}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="note">{t('timetable.note')}</p>
          </>
        ) : (
          <Veil title={t('timetable.tbd')} sub={t('timetable.veilSub')}>
            <div className="tt-scroll">
              <div ref={ref} className={shown ? 'gantt in' : 'gantt'}>
                <div className="axis">
                  <span />
                  <div className="tk">
                    {Array.from({ length: TICK_COUNT }, (_, i) => (
                      <span key={i}>{t('timetable.tbd')}</span>
                    ))}
                  </div>
                </div>
                {TRACKS.map((track) => (
                  <div className="row" key={track.id}>
                    <b>
                      {t('timetable.track', { id: track.id })}
                      <small>{t('timetable.tbd')}</small>
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
                          {t('timetable.tbd')}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Veil>
        )}
      </div>
    </section>
  )
}
