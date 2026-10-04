import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026 } from '~/data/2026'

import { JoinButton } from './JoinButton'
import { OSTRICH_BASE_CLASS, Ostrich } from './Ostrich'
import { Arch } from './Seams'
import { formatDateLabel, localize } from './sections'

/** ヒーローを左右に分ける幅（2026.css と揃える）。これ未満は斜めで上下に分ける */
const PC_QUERY = '(min-width: 900px)'

const px = (v: number) => v.toFixed(1) + 'px'

/**
 * NOSTR / ASIA の 2 行を幅いっぱいに合わせ、境目の斜線を「ASIA の下端」と「ダチョウの首」を通るように引く。
 * スクロールとは無関係に、マウント時・フォント読み込み後・大きさが変わったときだけ計算する
 * （ヒーローの幅、PC ではヒーローの高さも。言語切替などで右下の文字の大きさが変わったときも）。
 * SSR と計算前は 2026.css の既定値（--yl / --yr / --xt / --xb と vw の文字サイズ）で表示する。
 * document.fonts.ready は Google Fonts の CSS が適用される前に解決することがあるので、
 * フォントの読み込みが終わるたび（loadingdone）にも計算し直す。
 */
const useHeroLayout = () => {
  const heroRef = useRef<HTMLElement>(null)
  const tailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const tail = tailRef.current
    if (!hero || !tail) return
    const top = hero.querySelector<HTMLElement>('.h-top')
    const lines = Array.from(hero.querySelectorAll<HTMLElement>('.h-name .ln'))
    const stage = hero.querySelector<HTMLElement>('.stage')
    const b0 = stage?.querySelector<HTMLElement>(`.${OSTRICH_BASE_CLASS}`)
    const txt = hero.querySelector<HTMLElement>('.h-txt')
    if (!top || lines.length !== 2 || !stage || !b0 || !txt) return
    const mq = matchMedia(PC_QUERY)

    /** ヒーロー左上からの位置と大きさ（transform の影響を受けない offset 系で測る） */
    const box = (el: HTMLElement) => {
      let x = 0
      let y = 0
      let e: HTMLElement | null = el
      while (e && e !== hero) {
        x += e.offsetLeft
        y += e.offsetTop
        e = e.offsetParent as HTMLElement | null
      }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight }
    }

    const layout = () => {
      const pc = mq.matches
      const W = hero.clientWidth
      const cs = getComputedStyle(top)
      const w = pc
        ? top.clientWidth
        : top.clientWidth -
          parseFloat(cs.paddingLeft) -
          parseFloat(cs.paddingRight)
      const sz = lines.map((l) => {
        l.style.fontSize = '100px'
        return ((100 * w) / (l.offsetWidth || 1)) * 0.985
      })
      const tot = (sz[0] + sz[1]) * 0.84
      const max = pc ? hero.clientHeight * 0.74 : (innerHeight - 56) * 0.44
      const k = tot > max ? max / tot : 1
      lines.forEach((l, i) => (l.style.fontSize = px(sz[i] * k)))

      const a = box(lines[1])
      stage.style.top = pc ? '' : px(a.y + a.h + 8)
      const H = hero.clientHeight
      const st = box(stage)
      const u = b0.offsetWidth / 32
      if (!u) return
      // 首のまん中
      let cx = st.w / 2 + (3.75 + 11.5) * u
      const cy = st.h - (50 + 17.5) * u
      if (pc) cx = st.w - cx
      const nx = st.x + cx
      const ny = st.y + cy
      const t = box(txt)

      if (!pc) {
        const yl = a.y + a.h * 0.74
        const s = (ny - yl) / Math.max(nx, 1)
        const lim = (t.y - 14 - yl) / Math.max(t.x + t.w, 1)
        const slope = Math.max(0.06, Math.min(s, lim, 1.1))
        hero.style.setProperty('--yl', px(yl))
        hero.style.setProperty('--yr', px(yl + slope * W))
        tail.style.removeProperty('--tx0')
        tail.style.removeProperty('--tx1')
      } else {
        const bx = a.x + a.w * 0.93
        const by = a.y + a.h * 0.55
        const kk = (bx - nx) / (by - ny || 1)
        let xt = nx - kk * ny
        let xb = nx + kk * (H - ny)
        const xat = xt + ((xb - xt) * t.y) / H
        if (xat > t.x - 24) {
          xt -= xat - (t.x - 24)
          xb -= xat - (t.x - 24)
        }
        hero.style.setProperty('--xt', px(xt))
        hero.style.setProperty('--xb', px(xb))
        let tx1 = Math.max(0, xb + ((xb - xt) / H) * tail.offsetHeight)
        const dl = (W - Math.min(W, 760)) / 2
        // 斜めの先をアーチの付け根に合わせる
        if (Math.abs(tx1 - dl) < 140) tx1 = dl + 6
        tail.style.setProperty('--tx0', px(xb))
        tail.style.setProperty('--tx1', px(tx1))
      }
    }

    let raf = 0
    let lastWidth = -1
    let lastHeight = -1
    let lastTxt = ''
    const relayout = (force: boolean) => {
      const width = hero.clientWidth
      const height = hero.clientHeight
      // PC はヒーローの高さが画面の高さで決まるので、高さの変化でも計算し直す。
      // スマホはアドレスバーの出入りで高さが変わるので、幅が変わったときだけ計算し直す
      const changed =
        width !== lastWidth || (mq.matches && height !== lastHeight)
      if (!force && !changed) return
      lastWidth = width
      lastHeight = height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(layout)
    }
    const onForce = () => relayout(true)
    let alive = true
    lastWidth = hero.clientWidth
    lastHeight = hero.clientHeight
    lastTxt = `${txt.offsetWidth}x${txt.offsetHeight}`
    layout()
    document.fonts?.ready.then(() => alive && relayout(true))
    document.fonts?.addEventListener('loadingdone', onForce)
    // ヒーローの大きさと、右下の文字（言語で高さが変わる）の大きさを見る
    const ro = new ResizeObserver(() => {
      const size = `${txt.offsetWidth}x${txt.offsetHeight}`
      const txtChanged = size !== lastTxt
      lastTxt = size
      relayout(txtChanged)
    })
    ro.observe(hero)
    ro.observe(txt)
    mq.addEventListener('change', onForce)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.fonts?.removeEventListener('loadingdone', onForce)
      mq.removeEventListener('change', onForce)
    }
  }, [])

  return { heroRef, tailRef }
}

/** 生成動画。読み込めて再生できたら GT 側に重ねる。reduced-motion / データセーバーでは読み込まない */
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
      v.preload = 'auto'
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
 * ヒーロー。スマホは斜めで上下に分け（上 GT / 下 BB）、PC は左右に分ける（左 GT / 右 BB）。
 * ダチョウの首と頭は境目を越えて橙側に入る。続く tail は最初の BB→GT のアーチ。
 */
export const Hero = () => {
  const { t, i18n } = useTranslation()
  const { heroRef, tailRef } = useHeroLayout()
  const { heroVideo, venue, entryRequired } = EVENT_2026

  return (
    <>
      <section className="hero" id="top" aria-labelledby="h1" ref={heroRef}>
        <div className="h-edge" aria-hidden="true" />
        <div className="h-or" aria-hidden="true" />
        {heroVideo && (
          <div className="h-vid" aria-hidden="true">
            <HeroVideo video={heroVideo} />
          </div>
        )}
        <div className="h-top">
          <p className="h-kick">
            <b>NOSTR CONFERENCE</b>
            {t('hero.kick')}
          </p>
          <h1 id="h1" className="h-name">
            <span className="sr">Nostrasia 2026</span>
            <span className="ln l1" aria-hidden="true">
              NOSTR
            </span>
            <span className="ln l2" aria-hidden="true">
              ASIA
            </span>
          </h1>
        </div>
        <div className="h-bb">
          <div className="h-txt">
            <p className="h-catch">{t('hero.catch')}</p>
            <p className="h-year" aria-hidden="true">
              20<b>26</b>
            </p>
            <p className="h-meta">
              <b>{formatDateLabel(EVENT_2026.date, i18n)}</b>
              {venue ? localize(venue.name, i18n) : t('tbd.venue')}
            </p>
            {/* PC では補足をボタンの横に置き、右下の文字がダチョウの足に届かないようにする */}
            <div className="h-join">
              <JoinButton variant="hero" />
              {entryRequired && <p className="h-note">{t('join.entryNote')}</p>}
            </div>
          </div>
        </div>
        <div className="stage" aria-hidden="true">
          <Ostrich />
        </div>
      </section>
      <div className="bb tail" ref={tailRef} aria-hidden="true">
        <div className="t-wedge" />
        <Arch side={1} rotate={12} />
      </div>
    </>
  )
}
