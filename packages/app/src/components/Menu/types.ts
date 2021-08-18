import { Colors } from '../../theme/types'
import { Login } from '../WalletModal/types'

export interface LangType {
  code: string
  language: string
}

export interface Language {
  code: string
  language: string
  locale: string
}

export interface Profile {
  username?: string
  image?: string
  profileLink: string
  noProfileLink: string
  showPip?: boolean
}

export interface PushedProps {
  isPushed: boolean
  pushNav: (isPushed: boolean) => void
}

export interface NavTheme {
  background: string
  hover: string
}

export interface LinkStatus {
  text: string
  color: keyof Colors
}

export interface MenuSubEntry {
  label: string
  icon?: string
  href: string
  calloutClass?: string
  status?: LinkStatus
}

export interface MenuEntry {
  label: string
  icon: string
  items?: MenuSubEntry[]
  href?: string
  calloutClass?: string
  initialOpenState?: boolean
  status?: LinkStatus
}

export interface PanelProps {
  isDark: boolean | null
  toggleTheme: (isDark: boolean) => void
  currentLang: string
  langs: Language[]
  setLang: (lang: Language) => void
  links: Array<MenuEntry>
}

export interface NavProps extends PanelProps {
  providerTitle?: string
  account?: string
  chainId?: number
  login: Login
  profile?: Profile
  logout: () => void
}
