import { useEffect, useState } from 'react'

/**
 * いま画面の中央付近にある section の id を返す（ナビの現在地表示用）。
 * IntersectionObserver で離散的に切り替えるだけで、スクロール量は読まない。
 *
 * @param selector 監視する section のセレクタ
 */
export const useCurrentSection = (selector: string) => {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll(selector).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector])

  return current
}
