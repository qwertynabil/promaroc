import type { Attribute } from 'next-themes'

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export interface HeaderNavItem {
  label: string
  href: string
}

export interface MousePosition {
  x: number
  y: number
}

export interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  properties: string
  message: string
}

export type ContactMessageType = 'success' | 'error' | ''
