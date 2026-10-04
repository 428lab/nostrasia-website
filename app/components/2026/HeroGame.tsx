import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { FOOT_Y, LEG_LEN, SHAPES } from './ostrich'

/**
 * ヒーローのダチョウを 5 回タップすると始まるジャンプゲーム（恐竜ゲーム相当）。
 * 座標は高さ 100 の論理単位で持ち、幅はステージの縦横比から決める（390 幅でも同じ難しさ）。
 */

const BEST_KEY = 'n26-ostrich-best'
const VIEW_H = 100
const GROUND = 84
/** SHAPES の 1 単位を論理座標に直す倍率 */
const K = 0.42
const BIRD_X = 24
const GRAVITY = 420
const JUMP_V = 150
const START_SPEED = 48
const ACCEL = 1.6
const MAX_SPEED = 110
/** 開始前にヒントを出す時間 */
const READY_MS = 1000
/** ゲームオーバー直後の誤タップで再開しないよう、少し待つ */
const RETRY_LOCK_MS = 400
/** zap（低く飛ぶ稲妻）を出し始めるまでの時間 */
const ZAP_AFTER_S = 12

const INK = '#161616'
const TEAL = '#0E7C7B'
const YELLOW = '#F6C324'
const PAPER = '#f8f9fa'
const FONT_EN = "'Unbounded', 'Zen Kaku Gothic New', sans-serif"
const FONT_JA = "'Zen Kaku Gothic New', sans-serif"

type Obstacle = { zap: boolean; x: number; w: number; h: number; top: number }

type State = {
  mode: 'ready' | 'run' | 'over'
  /** mode に入った時刻（ms） */
  since: number
  t: number
  dist: number
  speed: number
  y: number
  vy: number
  obstacles: Obstacle[]
  gap: number
  best: number
}

const readBest = () => {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

const writeBest = (best: number) => {
  try {
    window.localStorage.setItem(BEST_KEY, String(best))
  } catch {
    // 保存できない環境ではベストを覚えないだけ
  }
}

const score = (s: State) => Math.floor(s.dist / 10)

const newGap = (speed: number) => 22 + speed * (0.8 + Math.random() * 0.9)

const spawn = (s: State, viewW: number): Obstacle => {
  if (s.t > ZAP_AFTER_S && Math.random() < 0.25) {
    return { zap: true, x: viewW + 4, w: 8, h: 8, top: GROUND - 16 }
  }
  const tall = Math.random() < 0.4
  const h = tall ? 15 : 10
  return { zap: false, x: viewW + 4, w: tall ? 8 : 6, h, top: GROUND - h }
}

/** SHAPES の 1 個を描く。cx・cy は中心、rot は度 */
const drawShape = (
  ctx: CanvasRenderingContext2D,
  shape: (typeof SHAPES)[number],
  cx: number,
  cy: number,
  rot: number,
) => {
  const w = shape.w * K
  const h = shape.h * K
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((rot * Math.PI) / 180)
  ctx.fillStyle = shape.c
  ctx.beginPath()
  if (shape.k === 'c') ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2)
  else if (shape.k === 't') {
    ctx.moveTo(0, -h / 2)
    ctx.lineTo(w / 2, h / 2)
    ctx.lineTo(-w / 2, h / 2)
  } else if (shape.k === 'h') {
    // CSS の border-radius: 999px 999px 0 0 と同じ、上が丸い半円
    ctx.ellipse(0, h / 2, w / 2, h, 0, Math.PI, Math.PI * 2)
  } else ctx.rect(-w / 2, -h / 2, w, h)
  ctx.fill()
  ctx.restore()
}

/** ダチョウを足の裏（x, baseY）基準で描く。swing は脚の振り角（度） */
const drawBird = (
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  swing: number,
) => {
  SHAPES.forEach((shape, i) => {
    let cx = x + shape.fx * K
    let cy = baseY + (shape.fy - FOOT_Y) * K
    const a = i === 8 || i === 10 ? swing : -swing
    if (i === 8 || i === 9) {
      // 脚は付け根を軸に振る
      const half = (shape.h * K) / 2
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate((shape.fr * Math.PI) / 180)
      ctx.translate(0, -half)
      ctx.rotate((a * Math.PI) / 180)
      ctx.translate(0, half)
      drawShape(ctx, shape, 0, 0, 0)
      ctx.restore()
      return
    }
    if (i === 10 || i === 11) {
      // 足は脚の先に付いていく
      const r = (a * Math.PI) / 180
      cx += -LEG_LEN * K * Math.sin(r)
      cy += -LEG_LEN * K * (1 - Math.cos(r))
    }
    drawShape(ctx, shape, cx, cy, shape.fr)
  })
}

const drawObstacle = (ctx: CanvasRenderingContext2D, o: Obstacle) => {
  if (o.zap) {
    // 稲妻を、ずらして傾けた 2 つの四角で表す
    ctx.fillStyle = YELLOW
    ctx.save()
    ctx.translate(o.x + o.w * 0.6, o.top + o.h * 0.28)
    ctx.rotate(0.45)
    ctx.fillRect(-o.w * 0.25, -o.h * 0.32, o.w * 0.5, o.h * 0.64)
    ctx.restore()
    ctx.save()
    ctx.translate(o.x + o.w * 0.4, o.top + o.h * 0.72)
    ctx.rotate(0.45)
    ctx.fillRect(-o.w * 0.25, -o.h * 0.32, o.w * 0.5, o.h * 0.64)
    ctx.restore()
    return
  }
  // サボテン: 幹＋左右の腕（縦の短い四角と、幹へつなぐ横棒）
  const trunk = o.w * 0.4
  const arm = o.w * 0.18
  const mid = o.x + o.w / 2
  ctx.fillStyle = TEAL
  ctx.fillRect(mid - trunk / 2, o.top, trunk, o.h)
  ctx.fillRect(o.x, o.top + o.h * 0.25, arm, o.h * 0.35)
  ctx.fillRect(o.x, o.top + o.h * 0.55, mid - o.x, arm)
  ctx.fillRect(o.x + o.w - arm, o.top + o.h * 0.15, arm, o.h * 0.35)
  ctx.fillRect(mid, o.top + o.h * 0.45, o.w / 2, arm)
}

/** 当たり判定は胴と脚のあたりだけ（首と頭、尾は含めない）。少し甘めにする */
const hits = (s: State, o: Obstacle) => {
  const left = BIRD_X - 12 * K
  const right = BIRD_X + 9 * K
  const bottom = GROUND - s.y
  const top = bottom - 44 * K
  return (
    left < o.x + o.w - 1 &&
    right > o.x + 1 &&
    top < o.top + o.h - 1 &&
    bottom > o.top + 1
  )
}

export const HeroGame = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const text = {
      hint: t('hero.game.hint'),
      over: t('hero.game.over'),
      score: t('hero.game.score'),
      best: t('hero.game.best'),
      retry: t('hero.game.retry'),
    }

    let viewW = 100
    let scale = 1
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      scale = rect.height / VIEW_H
      viewW = rect.width / scale
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const fresh = (mode: State['mode'], best: number): State => ({
      mode,
      since: performance.now(),
      t: 0,
      dist: 0,
      speed: START_SPEED,
      y: 0,
      vy: 0,
      obstacles: [],
      gap: newGap(START_SPEED),
      best,
    })
    let s = fresh('ready', readBest())

    const jump = () => {
      if (s.mode === 'over') {
        if (performance.now() - s.since > RETRY_LOCK_MS)
          s = fresh('run', s.best)
        return
      }
      if (s.mode === 'run' && s.y === 0) s.vy = JUMP_V
    }

    const step = (dt: number, now: number) => {
      if (s.mode === 'ready' && now - s.since >= READY_MS) {
        s.mode = 'run'
        s.since = now
      }
      if (s.mode !== 'run') return
      s.t += dt
      s.speed = Math.min(MAX_SPEED, START_SPEED + s.t * ACCEL)
      s.dist += s.speed * dt
      if (s.vy !== 0 || s.y > 0) {
        s.vy -= GRAVITY * dt
        s.y += s.vy * dt
        if (s.y <= 0) {
          s.y = 0
          s.vy = 0
        }
      }
      s.obstacles.forEach((o) => (o.x -= s.speed * dt))
      s.obstacles = s.obstacles.filter((o) => o.x + o.w > -4)
      const last = s.obstacles[s.obstacles.length - 1]
      if (!last || last.x < viewW - s.gap) {
        s.obstacles.push(spawn(s, viewW))
        s.gap = newGap(s.speed)
      }
      if (s.obstacles.some((o) => hits(s, o))) {
        s.mode = 'over'
        s.since = now
        if (score(s) > s.best) {
          s.best = score(s)
          writeBest(s.best)
        }
      }
    }

    const draw = (now: number) => {
      ctx.fillStyle = PAPER
      ctx.fillRect(0, 0, viewW, VIEW_H)
      ctx.fillStyle = INK
      ctx.fillRect(0, GROUND, viewW, 0.5)
      s.obstacles.forEach((o) => drawObstacle(ctx, o))
      const swing =
        s.mode !== 'run'
          ? 0
          : s.y > 0
            ? 12
            : Math.sin((now / 360) * Math.PI * 2) * 22
      drawBird(ctx, BIRD_X, GROUND - s.y, swing)

      ctx.fillStyle = INK
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'
      ctx.font = `700 4.5px ${FONT_EN}`
      ctx.fillText(String(score(s)).padStart(5, '0'), 4, 4)

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (s.mode === 'ready') {
        ctx.font = `700 6px ${FONT_JA}`
        ctx.fillText(text.hint, viewW / 2, 32)
      }
      if (s.mode === 'over') {
        ctx.fillStyle = 'rgba(248, 249, 250, 0.82)'
        ctx.fillRect(0, 0, viewW, VIEW_H)
        ctx.fillStyle = INK
        ctx.font = `900 8px ${FONT_EN}`
        ctx.fillText(text.over, viewW / 2, 26)
        ctx.font = `700 5px ${FONT_JA}`
        ctx.fillText(
          `${text.score} ${score(s)}   ${text.best} ${s.best}`,
          viewW / 2,
          38,
        )
        const bw = 40
        ctx.fillRect(viewW / 2 - bw / 2, 46, bw, 11)
        ctx.fillStyle = PAPER
        ctx.fillText(text.retry, viewW / 2, 51.5)
      }
    }

    // タブが隠れている間は止め、戻ったら続きから
    let raf = 0
    let last = 0
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      step(dt, now)
      draw(now)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) start()
    }
    if (!document.hidden) start()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    const onPointer = (e: PointerEvent) => {
      e.preventDefault()
      jump()
    }
    // ゲーム中はタップでページがスクロールしたり拡大したりしないようにする
    const onTouch = (e: TouchEvent) => e.preventDefault()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('pointerdown', onPointer)
    canvas.addEventListener('touchstart', onTouch, { passive: false })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onPointer)
      canvas.removeEventListener('touchstart', onTouch)
    }
  }, [t])

  return (
    <div className="jump-game">
      <canvas ref={canvasRef} role="img" aria-label={t('hero.game.label')} />
      <button
        type="button"
        aria-label={t('hero.game.close')}
        onClick={() => onClose()}
      >
        ✕
      </button>
    </div>
  )
}
