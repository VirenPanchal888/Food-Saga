"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  prefetch?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  onClick,
  ...props
}: OptimizedLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.defaultPrevented || e.metaKey || e.ctrlKey) {
      return
    }

    e.preventDefault()
    // Prefetch on click for instant navigation
    if (prefetch) {
      router.prefetch(href)
    }
    router.push(href)
  }

  return (
    <Link href={href} onClick={handleClick} className={className} prefetch={prefetch} {...props}>
      {children}
    </Link>
  )
}
