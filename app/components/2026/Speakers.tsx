import { useTranslation } from 'react-i18next'

import { SPEAKER_PLACEHOLDER_COUNT, SPEAKERS_2026, Speaker } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** 図形のアバター。背景・頭・体の色と、頭の形（円 / 四角）を順番に回す */
const AVATARS = [
  { bg: '#F6C324', head: '#8E30EB', body: '#F2542D', square: false },
  { bg: '#0E7C7B', head: '#F2542D', body: '#F6C324', square: true },
  { bg: '#8E30EB', head: '#F6C324', body: '#0E7C7B', square: false },
  { bg: '#F2542D', head: '#0E7C7B', body: '#8E30EB', square: true },
]

const Avatar = ({ index }: { index: number }) => {
  const { bg, head, body, square } = AVATARS[index % AVATARS.length]
  return (
    <svg viewBox="0 0 84 84" aria-hidden="true">
      <rect x="2" y="2" width="80" height="80" fill={bg} opacity=".25" />
      {square ? (
        <rect x="28" y="12" width="28" height="28" fill={head} />
      ) : (
        <circle cx="42" cy="26" r="15" fill={head} />
      )}
      <path d="M12 82a30 30 0 0 1 60 0z" fill={body} />
    </svg>
  )
}

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
        <SectionHead
          icon="speakers"
          label={t('speakers.label')}
          title={t('speakers.title')}
        />
        <div className="sg">
          {SPEAKERS_2026.length > 0
            ? SPEAKERS_2026.map((speaker, i) => (
                <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
              ))
            : Array.from({ length: SPEAKER_PLACEHOLDER_COUNT }, (_, i) => (
                <div className="sp" key={i}>
                  <Avatar index={i} />
                  <b>{t('speakers.tba')}</b>
                  <small>{t('speakers.soon')}</small>
                </div>
              ))}
        </div>
        <p className="note">{t('speakers.note')}</p>
      </div>
    </section>
  )
}
