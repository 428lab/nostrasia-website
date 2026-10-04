import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrentSection } from '~/hooks/useCurrentSection'
import { ShapeIcon, ShapeName } from '~/icons/2026/ShapeIcon'

import { JoinButton } from './JoinButton'
import { LanguageSwitch } from './LanguageSwitch'
import { NAV_IDS, SECTIONS } from './sections'

/** 横並びナビにする幅（2026.css と揃える）。これ未満はハンバーガー → 全画面メニュー */
const WIDE_QUERY = '(min-width: 1180px)'

/**
 * ヘッダーと、1180px 未満で開く全画面メニュー。
 * 横並びのナビは現在地の下線を陣営の色にする（GT は橙、BB は 4 色）。
 * 全画面メニューは行ごとに陣営の色（GT は橙地に問い、BB は方眼に図形と英字）。
 */
export const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  // 閉じたあとハンバーガーにフォーカスを戻すか（リンクを選んで閉じたときは戻さない）
  const focusBack = useRef(false)
  // ヒーロー（#top）も見て、先頭に戻ったら現在地を消す
  const currentId = useCurrentSection('.n26 main section[id]')
  const current = SECTIONS.find((s) => s.id === currentId)

  const close = useCallback((restoreFocus: boolean) => {
    focusBack.current = restoreFocus
    // ページ内リンクの移動より先にスクロールの固定を外す
    document.body.classList.remove('menu-open')
    setOpen(false)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) {
      if (focusBack.current) {
        focusBack.current = false
        burgerRef.current?.focus()
      }
      return
    }
    menuRef.current?.querySelector('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true)
    }
    const wide = matchMedia(WIDE_QUERY)
    const onWide = (e: MediaQueryListEvent) => {
      if (e.matches) close(false)
    }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open, close])

  // リンクを選ぶ・背景をタップすると閉じる
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a')) close(false)
      else if (target === menu || target.tagName === 'UL') close(true)
    }
    menu.addEventListener('click', onClick)
    return () => menu.removeEventListener('click', onClick)
  }, [close])

  useEffect(() => () => document.body.classList.remove('menu-open'), [])

  return (
    <>
      <header className="hd">
        <a className="logo" href="#top" aria-label={t('a11y.toTop')}>
          <span className="lg">NOSTRASIA</span>
          <span className="lb">2026</span>
        </a>
        <nav className="gnav" aria-label={t('a11y.mainNav')}>
          {NAV_IDS.map((id) => {
            const on = current?.nav === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={on ? `cur-${current.camp}` : undefined}
                aria-current={on ? 'true' : undefined}
              >
                {t(`nav.${id}`)}
              </a>
            )
          })}
        </nav>
        <LanguageSwitch />
        <JoinButton variant="header" />
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
          onClick={() => (open ? close(true) : setOpen(true))}
        >
          <i />
        </button>
      </header>

      <nav
        ref={menuRef}
        className={open ? 'menu open' : 'menu'}
        id="menu"
        aria-label={t('a11y.menu')}
      >
        <ul>
          {SECTIONS.map(({ id, camp }, i) => (
            <li
              key={id}
              className={`m-${camp}`}
              style={{ '--n': i } as CSSProperties}
            >
              {camp === 'gt' ? (
                <a href={`#${id}`}>
                  <span className="mq">{t(`q.${id}.q`)}</span>
                  <span className="me">{t(`q.${id}.band`)}</span>
                </a>
              ) : (
                <a href={`#${id}`}>
                  <ShapeIcon name={id as ShapeName} />
                  <span className="mb">
                    {t(`menu.${id}.en`)}
                    <small>{t(`menu.${id}.sub`)}</small>
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
        <JoinButton variant="menu" />
      </nav>
    </>
  )
}
