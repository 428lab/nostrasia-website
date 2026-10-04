import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { EVENT_2026, formatDate2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { localize } from './sections'

/**
 * NOSTR を幅いっぱいにフィットし、ASIA も同じ大きさにそろえる。
 * スクロールとは無関係に、マウント時・フォント読み込み後・リサイズ時だけ計算する。
 * document.fonts.ready は Google Fonts の CSS が適用される前に解決することがあるので、
 * フォントの読み込みが終わるたび（loadingdone）にも計算し直す。
 * モバイルではスクロールでアドレスバーが出入りして resize が来るので、幅が変わったときだけ計算し直す。
 */
const useFitName = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = ref.current
    if (!hero) return
    const box = hero.querySelector<HTMLElement>('.lw-n')
    const lines = Array.from(hero.querySelectorAll<HTMLElement>('.ln'))
    if (!box || lines.length === 0) return
    const wide = matchMedia('(min-width: 900px)')
    let lastWidth = -1
    const fit = (force: boolean) => {
      const w = box.clientWidth
      if (!w || (!force && w === lastWidth)) return
      lastWidth = w
      lines[0].style.fontSize = '100px'
      const s = lines[0].offsetWidth || 1
      const fs = Math.min(
        ((100 * w) / s) * 0.985,
        innerHeight * (wide.matches ? 0.27 : 0.23),
      )
      lines.forEach((el) => (el.style.fontSize = fs.toFixed(1) + 'px'))
      hero.style.setProperty('--lh', (fs * 0.84).toFixed(1) + 'px')
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

/** 生成動画。読み込めて再生できたら重ねる。reduced-motion / データセーバーでは読み込まない */
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
    v.preload = 'auto'
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
 * 12 ピースのダチョウ。「？」の丸みに胴、縦の棒に脚、点に足、首と頭だけが「？」の上に突き出る。
 * i: 組み上がる順、sx / sy / sr / ss: 飛んでくる前の位置・回転・大きさ
 */
const PIECES: {
  i: number
  sx: number
  sy: number
  sr: number
  ss: number
  shape: ReactNode
}[] = [
  {
    i: 8,
    sx: -120,
    sy: 160,
    sr: 140,
    ss: 1,
    shape: <rect className="k fw" x="86.5" y="152" width="5" height="114" />,
  },
  {
    i: 9,
    sx: 130,
    sy: 150,
    sr: -120,
    ss: 1,
    shape: <rect className="k fw" x="102.5" y="152" width="5" height="114" />,
  },
  {
    i: 10,
    sx: -140,
    sy: 60,
    sr: 200,
    ss: 2,
    shape: <path className="k ft" d="M76 276A10 10 0 0 1 96 276Z" />,
  },
  {
    i: 11,
    sx: 150,
    sy: 40,
    sr: -200,
    ss: 2,
    shape: <path className="k ft" d="M100 276A10 10 0 0 1 120 276Z" />,
  },
  {
    i: 2,
    sx: -170,
    sy: -90,
    sr: -220,
    ss: 1.6,
    shape: <path className="k fw" d="M72 118L38 98L50 134Z" />,
  },
  {
    i: 3,
    sx: -160,
    sy: 120,
    sr: 160,
    ss: 1.8,
    shape: <path className="k fy" d="M70 128L44 130L58 146Z" />,
  },
  {
    i: 0,
    sx: 150,
    sy: -150,
    sr: -180,
    ss: 1.4,
    shape: <circle className="k fp" cx="96" cy="130" r="25" />,
  },
  {
    i: 1,
    sx: 170,
    sy: 80,
    sr: 200,
    ss: 1.5,
    shape: <path className="k ft" d="M76 136A20 20 0 0 1 116 136Z" />,
  },
  {
    i: 4,
    sx: 120,
    sy: -60,
    sr: 90,
    ss: 1.1,
    shape: (
      <path
        className="k fy"
        d="M104.1 109.1L111.9 110.9L129.9 35.9L122.1 34.1Z"
      />
    ),
  },
  {
    i: 5,
    sx: -130,
    sy: -30,
    sr: 0,
    ss: 2,
    shape: <circle className="k fp" cx="128" cy="30" r="11" />,
  },
  {
    i: 6,
    sx: -60,
    sy: -80,
    sr: -260,
    ss: 2.4,
    shape: <path className="k fy" d="M136 25L136 36L153 31Z" />,
  },
  {
    i: 7,
    sx: 60,
    sy: -110,
    sr: 0,
    ss: 3,
    shape: <circle className="fw" cx="131" cy="27" r="2.6" />,
  },
]

export const Hero = () => {
  const { t, i18n } = useTranslation()
  const ref = useFitName()
  const { heroVideo, venue } = EVENT_2026

  return (
    <section className="hero" aria-labelledby="hero-title" ref={ref}>
      <h1 id="hero-title" className="sr">
        Nostrasia 2026
      </h1>
      <div className="lw lw-n" aria-hidden="true">
        <span className="ln">NOSTR</span>
      </div>
      <div className="hq-w" aria-hidden="true">
        {/* 「？」は SVG で固定（字形がフォントに左右されないように）。ダチョウを同じ座標系で重ねる */}
        <svg className="hq" viewBox="0 0 190 300" focusable="false">
          <g className="qm">
            <path
              className="qh"
              d="M50 128A48 48 0 1 1 114 173Q98 181 98 202V226"
            />
            <rect className="qd" x="81" y="242" width="34" height="34" />
          </g>
          {PIECES.map((p) => (
            <g
              key={p.i}
              className="hp"
              style={
                {
                  '--i': p.i,
                  '--sx': `${p.sx}px`,
                  '--sy': `${p.sy}px`,
                  '--sr': `${p.sr}deg`,
                  '--ss': p.ss,
                } as CSSProperties
              }
            >
              {p.shape}
            </g>
          ))}
        </svg>
        {heroVideo && <HeroVideo video={heroVideo} />}
        <span className="hcap">{t('hero.cap')}</span>
      </div>
      <div className="lw lw-a" aria-hidden="true">
        <span className="ln">ASIA</span>
      </div>
      <div className="side">
        <p className="yr" aria-hidden="true">
          2026
        </p>
        <p className="catch">
          <Trans t={t} i18nKey="hero.catch" />
        </p>
        <p className="meta">
          {formatDate2026(EVENT_2026.date)}
          <span>{venue ? localize(venue.name, i18n) : t('tbd.venue')}</span>
        </p>
        <JoinButton variant="hero" />
      </div>
    </section>
  )
}
