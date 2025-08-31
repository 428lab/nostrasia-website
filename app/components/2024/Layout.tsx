import { ReactNode } from 'react'

import { Footer } from './Footer'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[832px] px-4 min-h-screen mx-auto relative">
      <div className="pb-40">{children}</div>
      <Footer />
    </div>
  )
}
