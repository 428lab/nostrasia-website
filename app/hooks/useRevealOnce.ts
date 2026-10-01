import { useEffect, useRef, useState } from 'react'

/**
 * 要素が画面に入ったら 1 回だけ true になる（登場演出用）。
 * reduced-motion / IntersectionObserver が無い環境では最初から true。
 * IO が 1.5 秒たっても一度も呼ばれなければ true にする（フォールバック）。
 */
export const useRevealOnce = <T extends Element>(threshold = 0.5) => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setShown(true)
      return
    }
    let fired = false
    const io = new IntersectionObserver(
      (entries) => {
        fired = true
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    const timer = setTimeout(() => {
      if (!fired) setShown(true)
    }, 1500)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [threshold])

  return [ref, shown] as const
}
