import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrentSection } from '~/hooks/useCurrentSection'

import { JoinButton } from './JoinButton'
import { LanguageSwitch } from './LanguageSwitch'
import { NAV_IDS } from './sections'

/**
 * ヘッダーと、900px 未満で開く全面メニュー。
 * 900px 以上はヘッダーに英語ラベルを並べ、ハンバーガーは CSS で隠す。
 */
export const Header = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  // 閉じたあとハンバーガーにフォーカスを戻すか（リンクを選んで閉じたときは戻さない）
  const focusBack = useRef(false)
  const current = useCurrentSection('.n26 main section[id]')

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
    const wide = matchMedia('(min-width: 900px)')
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
        <a className="logo" href="#top">
          Nostrasia 2026
        </a>
        <nav className="gnav" aria-label={t('a11y.mainNav')}>
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={current === id ? 'true' : undefined}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
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
          {NAV_IDS.map((id) => (
            <li key={id}>
              <a href={`#${id}`}>
                <span className="mq">{t(`q.${id}.q`)}</span>
                <span className="me">{t(`nav.${id}`)}</span>
              </a>
            </li>
          ))}
        </ul>
        <JoinButton variant="menu" />
      </nav>
    </>
  )
}
