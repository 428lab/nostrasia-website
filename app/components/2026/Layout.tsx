import { ReactNode, useState } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { JoinButton } from './JoinButton'

import '~/2026.css'

export const Layout = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={menuOpen ? 'n26 menu-open' : 'n26'}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{children}</main>
      <Footer />
      <JoinButton className="regbar" />
    </div>
  )
}
