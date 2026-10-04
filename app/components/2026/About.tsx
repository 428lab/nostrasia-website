import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useDateLabel, useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

export const About = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const dateLabel = useDateLabel()
  const venue = EVENT_2026.venue
  // 「すべて調整中」の注記は、日程・会場・参加費のどれかが未定のあいだだけ出す。
  // 決まったあとは、時刻が未定ならその旨とハッシュタグ、決まっていればハッシュタグだけを出す
  const undecided = !EVENT_2026.date || !venue || !EVENT_2026.fee
  const noteKey = undecided
    ? 'about.overviewNote'
    : EVENT_2026.startTime
      ? 'about.overviewNoteHashtag'
      : 'about.overviewNoteTime'

  return (
    <section className="sec" id="about">
      <div className="wrap">
        <SectionHead label={t('about.label')} title={t('about.title')} />
        <p className="lead">{t('about.lead1')}</p>
        <p className="lead">{t('about.lead2')}</p>
        <div className="about-g" id="overview">
          <div className="panel">
            <p className="ptl">{t('about.overviewTitle')}</p>
            <p className="note">
              {t(noteKey, {
                hashtag: EVENT_2026.hashtag,
                interpolation: { escapeValue: false },
              })}
            </p>
          </div>
          <dl className="ov">
            <div>
              <dt>{t('about.date')}</dt>
              <dd className="m">{dateLabel(EVENT_2026.date)}</dd>
            </div>
            <div>
              <dt>{t('about.venue')}</dt>
              <dd>
                {venue ? localized(venue.name) : t('venueTBA')}
                {venue && (
                  <small>
                    {localized(venue.address)}
                    <br />
                    <a
                      href={venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('access.map')}
                    </a>
                  </small>
                )}
              </dd>
            </div>
            <div>
              <dt>{t('about.fee')}</dt>
              <dd>
                {EVENT_2026.fee ? localized(EVENT_2026.fee) : t('feeTBA')}
                {EVENT_2026.fee && EVENT_2026.feeNote && (
                  <small>{localized(EVENT_2026.feeNote)}</small>
                )}
              </dd>
            </div>
            {EVENT_2026.entryRequired && (
              <div>
                <dt>{t('about.entry')}</dt>
                <dd>
                  {t('about.entryRequired')}
                  <small>
                    {EVENT_2026.registrationUrl
                      ? t('about.entryOpen')
                      : t('about.entrySoon')}
                  </small>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  )
}
