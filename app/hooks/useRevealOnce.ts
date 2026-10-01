import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

/**
 * 画面に入ったときに 1 回だけ true になる（登場演出用）。
 * 一度 true になったら unobserve し、以降は変わらない。
 * reduced-motion・IntersectionObserver 非対応では最初から true。
 * IO のコールバックが 1.5 秒来なければ true にする（表示し損ねないためのフォールバック）。
 */
export const useRevealOnce = <T extends Element>(threshold = 0.3) => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    let fired = false
    const io = new IntersectionObserver(
      (entries) => {
        fired = true
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setShown(true)
          io.unobserve(entry.target)
        })
      },
      { threshold },
    )
    io.observe(el)
    const timer = window.setTimeout(() => {
      if (fired) return
      setShown(true)
      io.disconnect()
    }, 1500)
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
    }
  }, [threshold])

  return [ref, shown] as const
}
