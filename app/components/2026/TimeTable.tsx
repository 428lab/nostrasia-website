import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026, formatTime } from '~/data/2026'

import { DateReel } from './DateReel'
import { QSection } from './QSection'
import { formatDateLong, localize } from './sections'

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

export const TimeTable = () => {
  const { t, i18n } = useTranslation()
  const {
    date,
    startTime,
    endTime,
    venue,
    fee,
    feeNote,
    entryRequired,
    registrationUrl,
  } = EVENT_2026
  const dateText = formatDate2026(date)
  const dateLong = formatDateLong(date, i18n)
  const raw = { interpolation: { escapeValue: false } }

  return (
    <QSection id="timetable">
      <DateReel
        value={dateText}
        label={
          date ? dateLong : t('timetable.dateTbd', { date: dateText, ...raw })
        }
      />
      <dl className="ov" id="overview" aria-label={t('timetable.overview')}>
        <div>
          <dt>{t('timetable.date')}</dt>
          <dd>
            {dateLong}{' '}
            {/* 日付だけ決まって時刻が未定のときは「--:--」ではなく文で出す */}
            {date && !startTime ? (
              <span className="sub">{t('timetable.timeTbd')}</span>
            ) : (
              <small>
                {t('timetable.timeRange', {
                  start: formatTime(startTime),
                  end: formatTime(endTime),
                  ...raw,
                })}
              </small>
            )}
          </dd>
        </div>
        <div>
          <dt>{t('timetable.venue')}</dt>
          <dd>
            {venue ? localize(venue.name, i18n) : t('tbd.venue')}
            {venue && (
              <span className="sub">
                {localize(venue.address, i18n)}{' '}
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('access.openMap')} ↗
                </a>
              </span>
            )}
          </dd>
        </div>
        <div>
          <dt>{t('timetable.fee')}</dt>
          <dd>
            {fee ? localize(fee, i18n) : t('tbd.fee')}
            {fee && feeNote && (
              <span className="sub">{localize(feeNote, i18n)}</span>
            )}
          </dd>
        </div>
        {entryRequired && (
          <div>
            <dt>{t('timetable.entry')}</dt>
            <dd>
              {t('timetable.entryRequired')}
              {!registrationUrl && (
                <span className="sub">{t('timetable.entryTbd')}</span>
              )}
            </dd>
          </div>
        )}
      </dl>
      <span className="kick">{t('timetable.kick')}</span>
      {/* 横スクロールする表なので、キーボードでもスクロールできるようにフォーカスを受ける */}
      <div
        className="tt o"
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
