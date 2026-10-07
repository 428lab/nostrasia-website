import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EVENT_2026, timeRange2026 } from '~/data/2026'
import { useDateLabel, useLocalized } from '~/hooks/useLocalized'
import { hydratedLate } from '~/hooks/useRevealOnce'

import { HeroGame } from './HeroGame'
import { JoinButton } from './JoinButton'
import { ROLES, SHAPES } from './ostrich'

type HeroVideoSource = NonNullable<(typeof EVENT_2026)['heroVideo']>

/** 飛来アニメーション（CSS）が終わるころ。以降は左下へ寄せる */
const ASSEMBLED_MS = 2000
/** 左下へ寄せて景色を出すあいだ。以降は歩く */
const SETTLE_MS = 700
/** コナミコマンドで四散してから、組み上げ直しを始めるまで */
const SCATTER_MS = 1200
/** この時間内に TAP_COUNT 回タップするとジャンプゲームを始める */
const TAP_WINDOW_MS = 3000
const TAP_COUNT = 5

// prettier-ignore
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

/**
 * build: 飛来中 / settle: 左下へ寄せて景色を出す / walk: 組み上がった（動ける環境では歩く）
 * boom: 四散中 / game: ジャンプゲーム中
 */
type Phase = 'build' | 'settle' | 'walk' | 'boom' | 'game'

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export const Hero = () => {
  const { t } = useTranslation()
  const localized = useLocalized()
  const dateLabel = useDateLabel()
  const timeRange = timeRange2026()
  const [phase, setPhase] = useState<Phase>('build')
  // reduced-motion・no-hydrate: 歩かせず、四散もさせない（ゲームは本人が始めるので遊べる）
  const [still, setStill] = useState(false)
  // 四散で飛ばす向き（ステージの幅・高さに対する比）と回転。クライアントでだけ作る
  const [scatter, setScatter] = useState<number[][] | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const stillRef = useRef(still)
  stillRef.current = still

  // reduced-motion・no-hydrate では飛来させず、組み上がった状態にする
  useEffect(() => {
    const skip = prefersReducedMotion() || hydratedLate()
    setStill(skip)
    const timers = skip
      ? [window.setTimeout(() => setPhase('walk'), 0)]
      : [
          window.setTimeout(() => setPhase('settle'), ASSEMBLED_MS),
          window.setTimeout(() => setPhase('walk'), ASSEMBLED_MS + SETTLE_MS),
        ]
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  // コナミコマンド（↑↑↓↓←→←→BA）で四散 → 組み上げ直し → 左下へ寄せる → 歩行に戻る
  useEffect(() => {
    const timers: number[] = []
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return
      const key = e.key.toLowerCase()
      if (key === KONAMI[pos]) pos += 1
      // ↑↑↑ と押しすぎたときは、↑↑ まで来ていることにする
      else if (key === KONAMI[0]) pos = pos === 2 ? 2 : 1
      else pos = 0
      if (pos < KONAMI.length) return
      pos = 0
      if (phaseRef.current !== 'walk' || stillRef.current) return
      setScatter(
        SHAPES.map(() => {
          const a = Math.random() * Math.PI * 2
          const d = 0.9 + Math.random() * 0.6
          return [
            Math.cos(a) * d,
            Math.sin(a) * d,
            (Math.random() - 0.5) * 1440,
          ]
        }),
      )
      setPhase('boom')
      timers.push(
        window.setTimeout(() => setPhase('build'), SCATTER_MS),
        window.setTimeout(() => setPhase('settle'), SCATTER_MS + ASSEMBLED_MS),
        window.setTimeout(
          () => setPhase('walk'),
          SCATTER_MS + ASSEMBLED_MS + SETTLE_MS,
        ),
      )
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  // ダチョウを 3 秒以内に 5 回タップするとジャンプゲーム
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let taps: number[] = []
    const onClick = () => {
      if (phaseRef.current !== 'walk') return
      const now = performance.now()
      taps = [...taps.filter((at) => now - at < TAP_WINDOW_MS), now]
      if (taps.length < TAP_COUNT) return
      taps = []
      setPhase('game')
    }
    stage.addEventListener('click', onClick)
    return () => stage.removeEventListener('click', onClick)
  }, [])

  // placed: 左下へ寄せて景色を出している（settle 以降。still では中央・大のまま）
  const stageClass = [
    'stage',
    phase !== 'build' && 'done',
    phase !== 'build' && !still && 'placed',
    phase === 'walk' ? !still && 'walk' : phase !== 'build' && phase,
  ]
    .filter(Boolean)
    .join(' ')

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
          {timeRange && <b className="time">{timeRange}</b>}
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
      {/* ゲーム中だけ閉じるボタンを読ませるため、aria-hidden を外す（飾りは個別に隠す） */}
      <div
        ref={stageRef}
        className={stageClass}
        aria-hidden={phase === 'game' ? undefined : true}
      >
        {EVENT_2026.heroVideo && <HeroVideo source={EVENT_2026.heroVideo} />}
        <span className="hcap" aria-hidden="true">
          {t('hero.caption')}
        </span>
        <div className="scene" aria-hidden="true">
          <i className="mt" />
          <i className="mt" />
          <i className="mt" />
          <span className="cactus mid">
            <i />
          </span>
          <span className="cactus mid">
            <i />
          </span>
          <span className="cactus mid">
            <i />
          </span>
          <span className="cactus">
            <i />
          </span>
          <i className="pebble" />
          <i className="pebble" />
          <i className="pebble" />
          <i className="pebble" />
        </div>
        {/* rig: 置き場所と大きさ（左下へ寄せる）/ bird: ひとっ跳び */}
        <div className="rig">
          <div className="bird" aria-hidden="true">
            {SHAPES.map(({ k, c, ...v }, i) => (
              <i
                key={i}
                className={`s ${k} ${ROLES[i]}`}
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
                    '--bx': scatter?.[i][0] ?? 0,
                    '--by': scatter?.[i][1] ?? 0,
                    '--br': scatter?.[i][2] ?? 0,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
        {phase === 'game' && <HeroGame onClose={() => setPhase('walk')} />}
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
