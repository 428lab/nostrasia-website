import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026 } from '~/data/2026'

import { GlyphWord } from './Glyph'
import { JoinButton } from './JoinButton'
import { localize } from './sections'

/** 生成動画。読み込めて再生できたら薄く重ねる。reduced-motion / データセーバーでは読み込まない */
const HeroVideo = ({
  video,
}: {
  video: NonNullable<typeof EVENT_2026.heroVideo>
}) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    if (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData
    )
      return
    const onPlaying = () => setOk(true)
    v.addEventListener('playing', onPlaying)
    try {
      v.load()
      v.play()?.catch(() => {})
    } catch {
      // 再生できない環境では静止ヒーローのまま
    }
    return () => v.removeEventListener('playing', onPlaying)
  }, [])

  return (
    <video
      ref={ref}
      className={ok ? 'hero-video ok' : 'hero-video'}
      muted
      loop
      playsInline
      preload="none"
      poster={video.poster}
    >
      {video.webm && <source src={video.webm} type="video/webm" />}
      {video.mp4 && <source src={video.mp4} type="video/mp4" />}
    </video>
  )
}

/**
 * ヒーロー。図形文字の NOSTR / ASIA（PC は NOSTRASIA 1 行）と 2026。
 * 読み込み時に各字のピースが散らばった位置から定位置へ組み上がる（CSS animation、2 秒以内）。
 * 組み上がったあとはピースにホバーすると跳ねる。
 */
export const Hero = () => {
  const { t, i18n } = useTranslation()
  const { heroVideo, venue } = EVENT_2026
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => setDone(true), reduce ? 0 : 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className={done ? 'hero o done' : 'hero o'}
      aria-labelledby="hero-title"
    >
      <div className="hero-bg" aria-hidden="true">
        {heroVideo && <HeroVideo video={heroVideo} />}
      </div>
      <h1 id="hero-title">
        <span className="sr">Nostrasia 2026</span>
        <GlyphWord className="hl sp-only" text="NOSTR" acc="...w." gi={0} />
        <GlyphWord className="hl sp-only" text="ASIA" acc=".w.w" gi={5} />
        <GlyphWord
          className="hl pc-only"
          text="NOSTRASIA"
          acc="...w..w.w"
          gi={0}
        />
        <GlyphWord className="hy" text="2026" acc=".w.w" gi={9} />
      </h1>
      <div className="hero-foot">
        <p className="catch">{t('hero.catch')}</p>
        <div className="hero-row">
          <p className="meta">
            <small>{t('hero.kind')}</small>
            <span className="d">{formatDate2026(EVENT_2026.date)}</span>
            {venue ? localize(venue.name, i18n) : t('tbd.venue')}
          </p>
          <JoinButton variant="hero" />
        </div>
      </div>
    </section>
  )
}
