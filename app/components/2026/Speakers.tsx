import { useTranslation } from 'react-i18next'

import { SPEAKER_PLACEHOLDER_COUNT, SPEAKERS_2026, Speaker } from '~/data/2026'
import { useLocalized } from '~/hooks/useLocalized'

import { SectionHead } from './SectionHead'

/** 画像が無い登壇者の仮アバター。灰色の人型シルエット */
const Avatar = () => (
  <svg viewBox="0 0 84 84" aria-hidden="true">
    <rect width="84" height="84" fill="#EEF0F2" />
    <circle cx="42" cy="30" r="14" fill="#C9CDD2" />
    <path d="M14 84a28 28 0 0 1 56 0z" fill="#C9CDD2" />
  </svg>
)

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  const localized = useLocalized()
  const content = (
    <>
      {speaker.image ? <img src={speaker.image} alt="" /> : <Avatar />}
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
        <div className="sg">
          {SPEAKERS_2026.length > 0
            ? SPEAKERS_2026.map((speaker, i) => (
                <SpeakerCard key={`${speaker.name}-${i}`} speaker={speaker} />
              ))
            : Array.from({ length: SPEAKER_PLACEHOLDER_COUNT }, (_, i) => (
                <div className="sp" key={i}>
                  <Avatar />
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
