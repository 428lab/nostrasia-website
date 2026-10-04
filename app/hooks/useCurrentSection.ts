import { useEffect, useState } from 'react'

/**
 * いま画面の中央付近にあるセクションの id を返す（ナビの現在地表示用）。
 * IntersectionObserver で離散的に切り替えるだけで、スクロール量は読まない。
 *
 * @param sections 監視するセクションの id → ナビ上の項目 id
 */
export const useCurrentSection = (sections: Record<string, string>) => {
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const key = sections[entry.target.id]
          if (key) setCurrent(key)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    Object.keys(sections).forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sections])

  return current
}
