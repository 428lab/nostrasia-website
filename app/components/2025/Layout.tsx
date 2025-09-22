import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

// FIXME: should be shared
import '~/2025.css'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 sm:px-8 pb-4 mx-auto">
      <div className="pt-4 mb-8 sticky top-0">
        <Header />
      </div>
      {children}
      <div className="mt-20 sm:mt-40">
        <Footer />
      </div>
    </div>
  )
}
