'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatVolume, formatProbability } from '@/lib/polymarket'
import type { Market } from '@/types/market'
import { format, parseISO } from 'date-fns'
import ShareButton from './ShareButton'
import PriceChart from './PriceChart'

interface MarketCardProps {
  market: Market
}

export default function MarketCard({ market }: MarketCardProps) {
  const [yesPercentage, setYesPercentage] = useState(
    formatProbability(market.outcomePrices[0])
  )
  const [isAnimating, setIsAnimating] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const currentProb = formatProbability(market.outcomePrices[0])
      const variation = Math.random() * 4 - 2 // -2 to +2
      const newProb = Math.max(1, Math.min(99, currentProb + variation))
      
      if (Math.abs(newProb - yesPercentage) > 0.5) {
        setIsAnimating(true)
        setYesPercentage(Math.round(newProb))
        setTimeout(() => setIsAnimating(false), 300)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [yesPercentage, market.outcomePrices])

  const noPercentage = 100 - yesPercentage
  const endDate = market.endDate ? parseISO(market.endDate) : new Date()
  const isHotMarket = parseFloat(market.volume24hr || '0') > 1000000

  // Determine gradient colors based on probability
  const getGradientColors = () => {
    if (yesPercentage >= 70) return 'from-emerald-500 via-green-600 to-teal-700'
    if (yesPercentage >= 50) return 'from-blue-500 via-cyan-600 to-blue-700'
    if (yesPercentage >= 30) return 'from-orange-500 via-amber-600 to-yellow-700'
    return 'from-red-500 via-rose-600 to-pink-700'
  }

  return (
    <div className="h-full w-full relative flex items-center justify-center p-8">
      {/* Simple black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main card content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl"
      >
        {/* Tags & Category */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {market.category && (
            <span className="px-2 py-1 bg-white text-black text-[10px] font-medium uppercase tracking-wider">
              {market.category}
            </span>
          )}
        </div>

        {/* Main Question */}
        <motion.h1
          className="text-2xl font-normal text-white mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {market.question}
        </motion.h1>

        {/* Probability Display */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">YES</div>
                <motion.div
                  className="text-4xl font-light text-white"
                  animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {yesPercentage}%
                </motion.div>
              </div>
              <div className="w-px h-16 bg-white/10 mx-6" />
              <div className="flex-1 text-right">
                <div className="text-white/50 text-xs uppercase tracking-wider mb-2">NO</div>
                <div className="text-4xl font-light text-white/40">
                  {noPercentage}%
                </div>
              </div>
            </div>

            {/* Probability bar */}
            <div className="relative h-px bg-white/10 mb-4">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${yesPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {/* Real-time price chart */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-white/30 text-[10px] uppercase tracking-wider mb-2">
                PROBABILITY TREND
              </div>
              <PriceChart percentage={yesPercentage} />
            </div>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="border border-white/10 p-3">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
              VOLUME
            </div>
            <div className="text-white text-sm font-light">
              {formatVolume(market.volume)}
            </div>
          </div>

          <div className="border border-white/10 p-3">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
              24H VOL
            </div>
            <div className="text-white text-sm font-light">
              {formatVolume(market.volume24hr || '0')}
            </div>
          </div>

          <div className="border border-white/10 p-3">
            <div className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
              ENDS
            </div>
            <div className="text-white text-xs font-light">
              {format(endDate, 'MMM d, yyyy')}
            </div>
          </div>
        </motion.div>

        {/* Vote buttons */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => window.open(`https://polymarket.com/`, '_blank')}
            className="border border-white/20 hover:bg-white hover:text-black text-white text-sm uppercase tracking-wider py-3 transition-colors"
          >
            Vote YES
          </button>
          <button
            onClick={() => window.open(`https://polymarket.com/`, '_blank')}
            className="border border-white/20 hover:bg-white hover:text-black text-white text-sm uppercase tracking-wider py-3 transition-colors"
          >
            Vote NO
          </button>
        </motion.div>

        {/* Description (if available) */}
        {market.description && (
          <motion.p
            className="mt-6 text-white/50 text-sm leading-relaxed border border-white/10 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {market.description}
          </motion.p>
        )}
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Share button */}
      <div className="absolute top-8 right-8 z-10">
        <ShareButton marketQuestion={market.question} probability={yesPercentage} />
      </div>
    </div>
  )
}
