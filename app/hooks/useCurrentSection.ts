import { useEffect, useState } from 'react'

/**
 * 画面中央付近にある section の id を返す（ヘッダーの現在地表示用）。
 * IntersectionObserver で離散的に切り替えるだけで、スクロール量は読まない。
 */
export const useCurrentSection = (selector: string) => {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll(selector).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector])

  return current
}
