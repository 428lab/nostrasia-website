import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'
import { useDateLabel, useLocalized } from '~/hooks/useLocalized'
import { hydratedLate } from '~/hooks/useRevealOnce'

import { JoinButton } from './JoinButton'

type HeroVideoSource = NonNullable<(typeof EVENT_2026)['heroVideo']>

/**
 * ダチョウを組み上げる 12 個の図形。
 * k: 形（c 円 / t 三角 / h 半円 / q 四角）、c: 色、w・h: 大きさ、
 * fx・fy・fr: 組み上がったあとの位置と回転、sx・sy・sr・ss: 飛んでくる前の位置・回転・拡大率
 */
// prettier-ignore
const SHAPES = [
  { k: 'c', c: '#8E30EB', w: 32, h: 32, fx: -4, fy: 6, fr: 0, sx: -0.62, sy: -0.62, sr: 0, ss: 1.25 },
  { k: 't', c: '#F2542D', w: 14, h: 18, fx: -23, fy: -3, fr: -55, sx: 0.75, sy: -0.72, sr: 20, ss: 1.6 },
  { k: 'h', c: '#0E7C7B', w: 22, h: 11, fx: -6, fy: 4, fr: 195, sx: 0.66, sy: 0.64, sr: -30, ss: 1.4 },
  { k: 'q', c: '#F6C324', w: 8, h: 8, fx: 8, fy: 5, fr: 45, sx: -0.95, sy: 0.15, sr: 15, ss: 1.8 },
  { k: 'q', c: '#F6C324', w: 5, h: 28, fx: 11.5, fy: -17.5, fr: 20, sx: 0.97, sy: -0.1, sr: 70, ss: 1.1 },
  { k: 'c', c: '#8E30EB', w: 10, h: 10, fx: 16, fy: -30, fr: 0, sx: -0.15, sy: 0.84, sr: 0, ss: 2 },
  { k: 't', c: '#F2542D', w: 7, h: 8, fx: 22.5, fy: -30, fr: 90, sx: -0.7, sy: 0.78, sr: 200, ss: 2.4 },
  { k: 'c', c: '#161616', w: 2.4, h: 2.4, fx: 17.5, fy: -31.5, fr: 0, sx: 0.25, sy: -0.86, sr: 0, ss: 3.5 },
  { k: 'q', c: '#161616', w: 2.6, h: 26, fx: -9, fy: 33, fr: 6, sx: -0.97, sy: -0.32, sr: 35, ss: 1 },
  { k: 'q', c: '#161616', w: 2.6, h: 26, fx: 1, fy: 33, fr: -8, sx: 0.52, sy: 0.88, sr: -50, ss: 1 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: -10.5, fy: 47, fr: 0, sx: -0.36, sy: -0.86, sr: 30, ss: 2.2 },
  { k: 'h', c: '#0E7C7B', w: 8, h: 4, fx: 3, fy: 47, fr: 0, sx: 0.95, sy: 0.4, sr: 90, ss: 2.2 },
] as const

/** 飛来アニメーション（CSS）が終わるころ。以降はホバーで跳ねるだけにする */
const ASSEMBLED_MS = 1900

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export const Hero = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const dateLabel = useDateLabel()
  const [done, setDone] = useState(false)

  // reduced-motion・no-hydrate では飛来させず、組み上がった状態にする
  useEffect(() => {
    const timer = window.setTimeout(
      () => setDone(true),
      prefersReducedMotion() || hydratedLate() ? 0 : ASSEMBLED_MS,
    )
    return () => window.clearTimeout(timer)
  }, [])

  const venue = EVENT_2026.venue
    ? localized(EVENT_2026.venue.name)
    : t('venueTBA')
  const fee = EVENT_2026.fee
    ? t(EVENT_2026.feeNote ? 'hero.feeNote' : 'hero.fee', {
        fee: localized(EVENT_2026.fee),
        note: EVENT_2026.feeNote ? localized(EVENT_2026.feeNote) : '',
        interpolation: { escapeValue: false },
      })
    : t('hero.feeTBA')

  return (
    <section className="hero" id="top">
      <div className="hero-txt">
        <p className="catch">{t('hero.catch')}</p>
        <h1 className="logo" aria-label="Nostrasia 2026">
          <span className="n">NOSTRASIA</span>
          <span className="y">
            20<b>26</b>
          </span>
          <small>{t('hero.tagline')}</small>
        </h1>
        <p className="date">
          {dateLabel(EVENT_2026.date)}
          <span>
            {t('hero.place', {
              venue,
              fee,
              interpolation: { escapeValue: false },
            })}
          </span>
        </p>
        <JoinButton className="cta" />
        {EVENT_2026.entryRequired && (
          <p className="entry-note">
            {EVENT_2026.registrationUrl
              ? t('join.entryNoteOpen')
              : t('join.entryNote')}
          </p>
        )}
      </div>
      <div className={done ? 'stage done' : 'stage'} aria-hidden="true">
        {EVENT_2026.heroVideo && <HeroVideo source={EVENT_2026.heroVideo} />}
        <span className="hcap">{t('hero.caption')}</span>
        {SHAPES.map(({ k, c, ...v }, i) => (
          <i
            key={i}
            className={`s ${k}`}
            style={
              {
                '--i': i,
                '--c': c,
                '--w': v.w,
                '--h': v.h,
                '--fx': v.fx,
                '--fy': v.fy,
                '--fr': v.fr,
                '--sx': v.sx,
                '--sy': v.sy,
                '--sr': v.sr,
                '--ss': v.ss,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </section>
  )
}

/**
 * 図形の背面に重ねる生成動画。reduced-motion と通信量節約モードでは読み込まない。
 * 再生できたときだけ見えるようにする（読めなければ図形のヒーローがそのまま見える）。
 */
const HeroVideo = ({ source }: { source: HeroVideoSource }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData
    if (prefersReducedMotion() || saveData) return
    video.muted = true
    video.preload = 'auto'
    video.load()
    video.play()?.catch(() => {})
  }, [])

  return (
    <video
      ref={ref}
      className={playing ? 'hero-video ok' : 'hero-video'}
      muted
      loop
      playsInline
      preload="none"
      poster={source.poster}
      onPlaying={() => setPlaying(true)}
    >
      {source.webm && <source src={source.webm} type="video/webm" />}
      {source.mp4 && <source src={source.mp4} type="video/mp4" />}
    </video>
  )
}
