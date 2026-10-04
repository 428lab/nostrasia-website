import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { JoinButton } from './JoinButton'

import '~/2026.css'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="n26">
      <Header />
      {/* モバイル下部の参加登録帯（メニューを開いている間は CSS で隠す） */}
      <JoinButton variant="bar" />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
