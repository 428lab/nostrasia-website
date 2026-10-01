import { CSSProperties, useEffect, useRef, useState } from 'react'

import { useRevealOnce } from '~/hooks/useRevealOnce'

/** 1 桁ごとに回す数字の数 */
const N = 18

/**
 * 日付を 1 文字ずつスロットのリールにして、画面に入ったとき 1 回だけ回して止める。
 * 「2026.??.??」でも「2026.11.22」でも同じ部品で動く（? は黄色地）。
 * SSR と JS なしでは最後の文字だけを出す。回転用の数字は JS が動いてから足す。
 */
export const DateReel = ({
  value,
  label,
}: {
  value: string
  label: string
}) => {
  const [ref, shown] = useRevealOnce<HTMLDivElement>()
  const [armed, setArmed] = useState(false)
  const spun = useRef(false)

  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed || !shown || spun.current || !ref.current) return
    spun.current = true
    ref.current.querySelectorAll<HTMLElement>('.reel i').forEach((r, i) => {
      r.style.transition = 'none'
      r.style.transform = 'translateY(0)'
      void r.offsetHeight
      r.style.transition = `transform ${(0.9 + i * 0.16).toFixed(2)}s cubic-bezier(.2,.7,.15,1.02)`
      r.style.transform = `translateY(-${N}em)`
    })
  }, [armed, shown, ref])

  return (
    <div
      ref={ref}
      className={armed ? 'date armed' : 'date'}
      style={{ '--reel-n': N } as CSSProperties}
      role="img"
      aria-label={label}
    >
      {Array.from(value).map((ch, i) =>
        /\d|\?/.test(ch) ? (
          <span
            key={i}
            className={ch === '?' ? 'reel qm' : 'reel'}
            aria-hidden="true"
          >
            <i>
              {armed &&
                Array.from({ length: N }, (_, k) => (
                  <span key={k}>{(k * 7 + 3) % 10}</span>
                ))}
              <span>{ch}</span>
            </i>
          </span>
        ) : (
          <span key={i} className="sep" aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </div>
  )
}
