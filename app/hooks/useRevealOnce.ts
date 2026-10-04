import { useEffect, useRef, useState } from 'react'

/**
 * 要素が画面に入ったら 1 回だけ true になる（登場演出用）。
 * reduced-motion / IntersectionObserver が無い環境では最初から true。
 * ハイドレーションが遅れて html に no-hydrate が付いた後なら、要素は既に見えているので最初から true
 * （演出をやり直して一度消えるのを防ぐ）。
 * IO は observe 直後に初回コールバックを返すので、通常は画面外でも fired が立つ。
 * 1.5 秒のタイマーは、IO 自体が動かない環境で要素が隠れたままになるのを防ぐ保険。
 */
export const useRevealOnce = <T extends Element>(threshold = 0.5) => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      document.documentElement.classList.contains('no-hydrate') ||
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
