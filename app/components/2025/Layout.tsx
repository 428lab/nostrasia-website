import { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

// FIXME: should be shared
import '~/2025.css'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="background" />
      <div className="px-4 sm:px-8 py-4 mx-auto">
        <div className="mb-8">
          <Header />
        </div>
        {children}
        <div className="mt-20 sm:mt-40">
          <Footer />
        </div>
      </div>
    </>
  )
}
