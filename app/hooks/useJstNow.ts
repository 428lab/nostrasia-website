import { useEffect, useState } from 'react'

/** 日本時間の「いま」。date は 'YYYY-MM-DD'、min は 0:00 からの分 */
export type JstNow = { date: string; min: number }

const JST_OFFSET_MS = 9 * 60 * 60 * 1000

const toJst = (ms: number): JstNow => {
  const d = new Date(ms + JST_OFFSET_MS)
  return {
    date: d.toISOString().slice(0, 10),
    min: d.getUTCHours() * 60 + d.getUTCMinutes(),
  }
}

/**
 * ?now=2026-11-29T14:30 のように日本時間を渡すと、その時刻として扱う（Preview で当日の見え方を確かめる用）。
 * 形式が違えば無視する。
 */
const overrideFromQuery = (): number | null => {
  const raw = new URLSearchParams(window.location.search).get('now')
  if (!raw || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(raw)) return null
  const ms = Date.parse(`${raw}:00+09:00`)
  return Number.isNaN(ms) ? null : ms
}

/**
 * 日本時間の現在時刻を 30 秒ごとに返す。
 * サーバと水和の食い違いを避けるため、最初の描画では null（時刻に関わる表示を出さない）。
 */
export const useJstNow = () => {
  const [now, setNow] = useState<JstNow | null>(null)

  useEffect(() => {
    const fixed = overrideFromQuery()
    if (fixed !== null) {
      setNow(toJst(fixed))
      return
    }
    const tick = () => setNow(toJst(Date.now()))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return now
}

/** 'HH:MM' → 0:00 からの分 */
export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
