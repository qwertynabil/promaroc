'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { HeaderNavItem, MousePosition } from '@/types'

export function useHeaderLogic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const headerRef = useRef<HTMLElement | null>(null)

  const navItems: HeaderNavItem[] = [
    { label: 'Platform', href: '/' },
    { label: 'Analytics', href: '/about' },
    { label: 'Connect', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!headerRef.current) return
    const rect = headerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return {
    headerRef,
    isMenuOpen,
    setIsMenuOpen,
    isScrolled,
    mousePosition,
    navItems,
    handleMouseMove,
  }
}
