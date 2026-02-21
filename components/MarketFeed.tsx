'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MarketCard from './MarketCard'
import type { Market } from '@/types/market'

interface MarketFeedProps {
  markets: Market[]
}

export default function MarketFeed({ markets }: MarketFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        goToPrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  // Handle wheel scroll
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      goToNext()
    } else if (e.deltaY < 0) {
      goToPrevious()
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [currentIndex])

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current
    const threshold = 50

    if (diff > threshold) {
      goToNext()
    } else if (diff < -threshold) {
      goToPrevious()
    }
  }

  const goToNext = () => {
    if (currentIndex < markets.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-black relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <MarketCard market={markets[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation hints */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-10">
        {currentIndex < markets.length - 1 && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/50 text-sm"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        )}
        <div className="text-white/30 text-xs">
          {currentIndex + 1} / {markets.length}
        </div>
      </div>

      {/* Top branding */}
      <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none z-10">
        <div className="text-white font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Polymarket Feed
          </span>
        </div>
      </div>
    </div>
  )
}
