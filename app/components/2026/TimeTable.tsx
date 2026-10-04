import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026, formatTime } from '~/data/2026'
import { useRevealOnce } from '~/hooks/useRevealOnce'

import { GlyphWord } from './Glyph'
import { QSection } from './QSection'
import { localize } from './sections'

// TODO: 時刻が決まったら app/data/2026.ts に移す
const TRACKS = ['TRACK A', 'TRACK B', 'TRACK C', 'TRACK D']
const SLOTS: {
  time: string | null
  cells: ({ tag: string; on?: boolean } | null)[]
}[] = [
  {
    time: null,
    cells: [
      { tag: 'Talk', on: true },
      { tag: 'Workshop' },
      { tag: 'Market' },
      { tag: 'Social' },
    ],
  },
  {
    time: null,
    cells: [
      { tag: 'LT' },
      { tag: 'Workshop' },
      { tag: 'Market' },
      { tag: 'Social' },
    ],
  },
  {
    time: null,
    cells: [
      { tag: 'Talk', on: true },
      { tag: 'Hands-on' },
      { tag: 'Market' },
      { tag: 'Social' },
    ],
  },
  { time: null, cells: [{ tag: 'LT' }, null, { tag: 'Show' }, { tag: 'DJ' }] },
]

/** 「2026」の 2 字目・4 字目を白、残りの字（. と月日）は黄の色ピースにする */
const accFor = (text: string) => '.w.w' + 'y'.repeat(text.length - 4)

/**
 * 日付を図形文字で描く。未定の「?」はピースがばらけたまま置き、日付が決まって数字になれば組み上がった形で出る。
 * 画面に入ったとき 1 回だけ、ピースが散らばった位置から組み上がる。
 * スマホは「2026.」と「MM.DD」の 2 行、PC は 1 行。
 */
const DateGlyph = ({ value, label }: { value: string; label: string }) => {
  const [ref, shown] = useRevealOnce<HTMLDivElement>(0.4)
  const head = value.slice(0, 5)
  const tail = value.slice(5)
  const acc = accFor(value)
  return (
    <div
      ref={ref}
      className={shown ? 'dg io in' : 'dg io'}
      role="img"
      aria-label={label}
    >
      <GlyphWord className="sp-only" text={head} acc={acc.slice(0, 5)} loose />
      <GlyphWord
        className="sp-only"
        text={tail}
        acc={acc.slice(5)}
        gi={5}
        loose
      />
      <GlyphWord className="pc-only" text={value} acc={acc} loose />
    </div>
  )
}

export const TimeTable = () => {
  const { t, i18n } = useTranslation()
  const { date, startTime, endTime, venue, fee } = EVENT_2026
  const dateText = formatDate2026(date)
  const raw = { interpolation: { escapeValue: false } }

  return (
    <QSection id="timetable">
      <DateGlyph
        value={dateText}
        label={
          date ? dateText : t('timetable.dateTbd', { date: dateText, ...raw })
        }
      />
      {!date && <p className="dcap">{t('timetable.dateNote')}</p>}
      <dl
        className="ov card"
        id="overview"
        aria-label={t('timetable.overview')}
      >
        <div>
          <dt>{t('timetable.date')}</dt>
          <dd>
            {dateText}{' '}
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
        className="tt"
        role="region"
        aria-label={t('timetable.tableLabel')}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">TIME</th>
              {TRACKS.map((track) => (
                <th key={track} scope="col">
                  {track}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, i) => (
              <tr key={i}>
                <td className="t">{formatTime(slot.time)}</td>
                {slot.cells.map((cell, j) => (
                  <td key={j}>
                    {cell ? (
                      <span className={cell.on ? 'tag on' : 'tag'}>
                        {cell.tag}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="scroll-hint">{t('timetable.scrollHint')}</p>
    </QSection>
  )
}
