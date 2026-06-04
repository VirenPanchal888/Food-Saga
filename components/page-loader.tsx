"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const progressIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + Math.random() * 30
        return nextProgress > 90 ? 90 : nextProgress
      })
    }, 100)

    const timer = setTimeout(() => {
      setProgress(100)
      const completeTimer = setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 150)
      return () => clearTimeout(completeTimer)
    }, 300)

    return () => {
      clearInterval(progressIntervalRef.current)
      clearTimeout(timer)
    }
  }, [pathname])

  if (!isLoading && progress === 0) return null

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/20 z-50">
        <div
          className={`h-full bg-gradient-to-r from-white via-white to-white/70 transition-all duration-300 ${
            progress === 100 ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading overlay */}
      {isLoading && progress < 90 && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center pointer-events-none animate-fade-in-quick">
          <div className="flex flex-col items-center gap-4">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-white text-xs font-medium opacity-70">Loading page</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInQuick {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in-quick {
          animation: fadeInQuick 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
