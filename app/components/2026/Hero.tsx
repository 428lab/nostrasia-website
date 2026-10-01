import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { localize } from './sections'

/**
 * NOS / TR / ASIA の各行を画面幅いっぱいにフィットさせる。
 * スクロールとは無関係に、マウント時・フォント読み込み後・リサイズ時だけ計算する。
 * document.fonts.ready は Google Fonts の CSS が適用される前に解決することがあるので、
 * フォントの読み込みが終わるたび（loadingdone）にも計算し直す。
 * モバイルではスクロールでアドレスバーが出入りして resize が来るので、幅が変わったときだけ計算し直す。
 */
const useFitLines = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = ref.current
    if (!hero) return
    const lines = Array.from(hero.querySelectorAll<HTMLElement>('.fit'))
    let lastWidth = -1
    const fit = (force: boolean) => {
      const cs = getComputedStyle(hero)
      const w =
        hero.clientWidth -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight)
      if (!force && w === lastWidth) return
      lastWidth = w
      lines.forEach((el) => {
        el.style.fontSize = '100px'
        const s = el.offsetWidth || 1
        el.style.fontSize =
          Math.min(((100 * w) / s) * 0.99, innerHeight * 0.38).toFixed(1) + 'px'
      })
    }
    const onResize = () => fit(false)
    const onFontsLoaded = () => fit(true)
    let alive = true
    fit(true)
    document.fonts?.ready.then(() => alive && fit(true))
    document.fonts?.addEventListener('loadingdone', onFontsLoaded)
    window.addEventListener('resize', onResize)
    return () => {
      alive = false
      document.fonts?.removeEventListener('loadingdone', onFontsLoaded)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return ref
}

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

export const Hero = () => {
  const { t, i18n } = useTranslation()
  const ref = useFitLines()
  const { heroVideo, venue } = EVENT_2026

  return (
    <section className="hero o" aria-labelledby="hero-title" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        {heroVideo && <HeroVideo video={heroVideo} />}
      </div>
      <h1 id="hero-title">
        <span className="sr">Nostrasia 2026</span>
        <span className="ln l1 fit" aria-hidden="true">
          NOS
        </span>
        <span className="ln l2 fit" aria-hidden="true">
          TR
        </span>
        <span className="ln l3 fit" aria-hidden="true">
          ASIA
        </span>
      </h1>
      <div>
        <p className="catch">{t('hero.catch')}</p>
        <div className="hero-foot">
          <p className="meta">
            <small>NOSTRASIA</small>
            <span className="d">{t('hero.year')}</span>
            {t('hero.when', {
              date: formatDate2026(EVENT_2026.date),
              venue: venue ? localize(venue.name, i18n) : t('tbd.venue'),
              interpolation: { escapeValue: false },
            })}
          </p>
          <JoinButton variant="hero" />
        </div>
      </div>
    </section>
  )
}
