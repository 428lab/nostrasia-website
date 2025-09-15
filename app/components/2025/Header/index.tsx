import { ShareNostrasia2025 } from '~/icons/2025/ShareNostrasia2025'

import { LanguageSwitch } from './LanguageSwitch'
import { Menu } from './Menu'

export const Header = () => {
  return (
    <div className="w-full flex items-center justify-end gap-6">
      <a href="#">
        <ShareNostrasia2025 />
      </a>
      <LanguageSwitch />
      <Menu />
    </div>
  )
}
