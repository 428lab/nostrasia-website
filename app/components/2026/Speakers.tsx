import { useTranslation } from 'react-i18next'

import { SPEAKER_PLACEHOLDER_COUNT, SPEAKERS_2026, Speaker } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { Avatar } from './Avatar'
import { SectionHead } from './SectionHead'
import { Veil } from './Veil'

const SpeakerCard = ({
  speaker,
  index,
}: {
  speaker: Speaker
  index: number
}) => {
  const localized = useLocalized()
  const content = (
    <>
      {speaker.image ? (
        <img src={speaker.image} alt="" />
      ) : (
        <Avatar index={index} />
      )}
      <b>{speaker.name}</b>
      {speaker.title && <small>{localized(speaker.title)}</small>}
    </>
  )
  return speaker.profileUrl ? (
    <a
      className="sp"
      href={speaker.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="sp">{content}</div>
  )
}

export const Speakers = () => {
  const { t } = useTranslation()

  return (
    <section className="sec" id="speakers">
      <div className="wrap">
        <SectionHead label={t('speakers.label')} title={t('speakers.title')} />
        {SPEAKERS_2026.length > 0 ? (
          <>
            <div className="sg">
              {SPEAKERS_2026.map((speaker, i) => (
                <SpeakerCard
                  key={`${speaker.name}-${i}`}
                  speaker={speaker}
                  index={i}
                />
              ))}
            </div>
            <p className="note">{t('speakers.note')}</p>
          </>
        ) : (
          <Veil title={t('speakers.tbd')} sub={t('speakers.note')}>
            <div className="sg">
              {Array.from({ length: SPEAKER_PLACEHOLDER_COUNT }, (_, i) => (
                <div className="sp" key={i}>
                  <Avatar index={i} />
                  <b>{t('speakers.tbd')}</b>
                  <small>{t('speakers.soon')}</small>
                </div>
              ))}
            </div>
          </Veil>
        )}
      </div>
    </section>
  )
}
