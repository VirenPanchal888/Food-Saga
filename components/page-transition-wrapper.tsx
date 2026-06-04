"use client"

import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface PageTransitionWrapperProps {
  children: ReactNode
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChild, setDisplayChild] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!isTransitioning) {
      setDisplayChild(children)
    }
  }, [children, isTransitioning])

  return (
    <div
      className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
    >
      {displayChild}
    </div>
  )
}
