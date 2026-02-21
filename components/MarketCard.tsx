'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatVolume, formatProbability } from '@/lib/polymarket'
import type { Market } from '@/types/market'
import { FiTrendingUp, FiClock, FiDollarSign } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'
import ShareButton from './ShareButton'

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
    <div className="h-full w-full relative flex items-center justify-center p-6">
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} animate-gradient opacity-20`}
      />

      {/* Blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Main card content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        {/* Tags & Category */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {market.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
              🔥 TRENDING
            </span>
          )}
          {market.new && (
            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
              ✨ NEW
            </span>
          )}
          {market.category && (
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold rounded-full border border-white/20">
              {market.category}
            </span>
          )}
          {isHotMarket && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
              🚀 HOT
            </span>
          )}
        </div>

        {/* Main Question */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {market.question}
        </motion.h1>

        {/* Probability Display */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <div className="text-white/70 text-sm mb-2">YES</div>
                <motion.div
                  className={`text-6xl font-black ${
                    isAnimating ? 'text-green-400' : 'text-white'
                  }`}
                  animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {yesPercentage}%
                </motion.div>
              </div>
              <div className="w-px h-20 bg-white/20 mx-8" />
              <div className="flex-1 text-right">
                <div className="text-white/70 text-sm mb-2">NO</div>
                <div className="text-6xl font-black text-white/50">
                  {noPercentage}%
                </div>
              </div>
            </div>

            {/* Probability bar */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${yesPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
              <FiDollarSign className="w-4 h-4" />
              <span>VOLUME</span>
            </div>
            <div className="text-white text-xl font-bold">
              {formatVolume(market.volume)}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
              <FiTrendingUp className="w-4 h-4" />
              <span>24H VOL</span>
            </div>
            <div className="text-white text-xl font-bold">
              {formatVolume(market.volume24hr || '0')}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
              <FiClock className="w-4 h-4" />
              <span>ENDS</span>
            </div>
            <div className="text-white text-sm font-bold">
              {format(endDate, 'MMM d, yyyy')}
            </div>
          </div>
        </motion.div>

        {/* Description (if available) */}
        {market.description && (
          <motion.p
            className="mt-6 text-white/70 text-base leading-relaxed bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
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
      <div className="absolute top-6 right-6 z-10">
        <ShareButton marketQuestion={market.question} probability={yesPercentage} />
      </div>
    </div>
  )
}
