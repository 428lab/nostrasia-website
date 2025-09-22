import { Link, LinkProps } from '@remix-run/react'
import { useState, useEffect, useRef } from 'react'

import { About } from '~/icons/2025/About'
import { Access } from '~/icons/2025/Access'
import { Contact } from '~/icons/2025/Contact'
import { Contents } from '~/icons/2025/Contents'
import { Hamburger } from '~/icons/2025/Hamburger'
import { Overview } from '~/icons/2025/Overview'
import { Sponsors } from '~/icons/2025/Sponsors'

import { JoinButton } from '../JoinButton'
import { ShareSNS } from '../ShareSNS'

const HoverableLink = (props: LinkProps) => {
  return (
    <Link {...props} className="hover:opacity-60 transition">
      {props.children}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 transition-transform group-hover:scale-x-100" />
    </Link>
  )
}

export const Menu = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      } else if ((event.target as Element).closest('a')) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative w-10 h-10" ref={menuRef}>
      <button className="cursor-pointer" onClick={() => setOpen(!open)}>
        <Hamburger className="w-10 h-10 hover:scale-x-[1.2] transition-all duration-300" />
      </button>
      <div
        className={`absolute right-0 top-[calc(40px+8px)] border border-white p-10 bg-white/30 backdrop-blur-[30px] min-w-fit w-full sm:w-[300px] flex flex-col gap-10 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all`}
      >
        <AboutLink />
        <OverviewLink />
        <ContentsLink />
        <SponsorsLink />
        <AccessLink />
        <ContactLink />
        <JoinButton />
        <ShareSNS />
      </div>
    </div>
  )
}

const AboutLink = () => (
  <HoverableLink to="#about">
    <About className="h-5" />
  </HoverableLink>
)

const OverviewLink = () => (
  <HoverableLink to="#overview">
    <Overview className="h-5" />
  </HoverableLink>
)

const ContentsLink = () => (
  <HoverableLink to="#contents">
    <Contents className="h-[19px]" />
  </HoverableLink>
)

const SponsorsLink = () => (
  <HoverableLink to="#sponsors">
    <Sponsors className="h-[26px]" />
  </HoverableLink>
)

const AccessLink = () => (
  <HoverableLink to="#access">
    <Access className="h-[19px]" />
  </HoverableLink>
)

const ContactLink = () => (
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSfOPMX1EwMlH5J9BsPft2yylspYeNoBScf0kAzN8ETUX-CBcg/viewform"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Contact className="h-5 hover:opacity-60 transition" />
  </a>
)
