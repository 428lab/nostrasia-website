import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

/**
 * ハイドレーションが遅れて <html> に no-hydrate が付いたか（app/root.tsx）。
 * 付いている間は CSS が全部を表示済みにしているので、一回きりの演出は再生せず最終状態にする。
 */
export const hydratedLate = () =>
  document.documentElement.classList.contains('no-hydrate')

/**
 * 画面に入ったときに 1 回だけ true になる（登場演出用）。
 * 一度 true になったら unobserve し、以降は変わらない。
 * reduced-motion・IntersectionObserver 非対応・no-hydrate ではマウント時に true。
 * IO は observe 直後に初回コールバックを返すので、普段は 1.5 秒のタイマーは効かない。
 * IO 自体が動かず初回コールバックが 1.5 秒来ないときだけ true にする保険。
 */
export const useRevealOnce = <T extends Element>(threshold = 0.3) => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      hydratedLate() ||
      prefersReducedMotion() ||
      !('IntersectionObserver' in window)
    ) {
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
