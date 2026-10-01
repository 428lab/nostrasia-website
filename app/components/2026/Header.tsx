import { CSSProperties, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useCurrentSection } from '~/hooks/useCurrentSection'
import { Mark } from '~/icons/2026/Mark'
import { ShapeIcon } from '~/icons/2026/ShapeIcon'

import { JoinButton } from './JoinButton'
import { LanguageSwitch } from './LanguageSwitch'
import { NAV_ITEMS, SECTION_TO_NAV } from './nav'

const PC_QUERY = '(min-width: 1100px)'

/**
 * ヘッダー。1100px 未満はハンバーガー → 全画面メニュー、1100px 以上は横並びのナビ。
 * メニューの開閉状態は Layout が持つ（下部の参加登録帯を隠すため）。
 */
export const Header = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) => {
  const { t } = useTranslation()
  const current = useCurrentSection(SECTION_TO_NAV)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  // 閉じたあとにハンバーガーへフォーカスを戻すか（リンク選択で閉じたときは戻さない）
  const focusBack = useRef(false)

  const setMenu = (open: boolean, back: boolean) => {
    focusBack.current = back
    setMenuOpen(open)
  }

  // 開いたら最初のリンクへ、閉じたらボタンへフォーカスを移す
  useEffect(() => {
    if (menuOpen) {
      navRef.current?.querySelector('a')?.focus()
    } else if (focusBack.current) {
      focusBack.current = false
      buttonRef.current?.focus()
    }
  }, [menuOpen])

  // Esc で閉じる
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      focusBack.current = true
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, setMenuOpen])

  // リンク選択・背景タップで閉じる。PC 幅になったら閉じる
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const mq = window.matchMedia(PC_QUERY)
    const onClick = (e: MouseEvent) => {
      if (mq.matches) return
      const target = e.target as Element
      if (target.closest('a')) {
        focusBack.current = false
        setMenuOpen(false)
      } else if (target === nav || target.tagName === 'UL') {
        focusBack.current = true
        setMenuOpen(false)
      }
    }
    const onChange = () => {
      if (!mq.matches) return
      focusBack.current = false
      setMenuOpen(false)
    }
    nav.addEventListener('click', onClick)
    mq.addEventListener('change', onChange)
    return () => {
      nav.removeEventListener('click', onClick)
      mq.removeEventListener('change', onChange)
    }
  }, [setMenuOpen])

  return (
    <header className="top">
      <a className="mark" href="#top">
        <Mark />
        NOSTRASIA
      </a>
      <LanguageSwitch />
      <button
        ref={buttonRef}
        className="burger"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="gnav"
        aria-label={menuOpen ? t('menu.close') : t('menu.open')}
        onClick={() => setMenu(!menuOpen, true)}
      >
        <span className="bs" aria-hidden="true">
          <i className="b1" />
          <i className="b2" />
          <i className="b3" />
        </span>
        <span className="bl" aria-hidden="true">
          {menuOpen ? t('menu.closeShort') : t('menu.openShort')}
        </span>
      </button>
      <nav className="gnav" id="gnav" ref={navRef} aria-label={t('menu.label')}>
        <ul>
          {NAV_ITEMS.map(({ id, label }, i) => (
            <li key={id} style={{ '--n': i } as CSSProperties}>
              <a
                href={`#${id}`}
                className={current === id ? 'on' : undefined}
                aria-current={current === id ? 'true' : undefined}
              >
                <ShapeIcon name={id} className="mi" />
                {t(label)}
              </a>
            </li>
          ))}
        </ul>
        <JoinButton className="ncta" />
      </nav>
    </header>
  )
}
