'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PriceChartProps {
  percentage: number
}

export default function PriceChart({ percentage }: PriceChartProps) {
  // Initialize with simulated historical data
  const [history, setHistory] = useState<number[]>(() => {
    const points = []
    for (let i = 0; i < 20; i++) {
      // Create realistic price movement around current percentage
      const variance = (Math.random() - 0.5) * 10
      points.push(Math.max(5, Math.min(95, percentage + variance)))
    }
    return points
  })

  // Simulate price history updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prev) => {
        const lastPrice = prev[prev.length - 1]
        // Gradual movement toward current percentage
        const drift = (percentage - lastPrice) * 0.3
        const noise = (Math.random() - 0.5) * 3
        const newPrice = Math.max(5, Math.min(95, lastPrice + drift + noise))
        
        const newHistory = [...prev, newPrice]
        // Keep last 25 data points
        return newHistory.slice(-25)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [percentage])

  // Calculate path for sparkline
  const width = 200
  const height = 40
  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * width
    const y = height - (val / 100) * height
    return `${x},${y}`
  })

  const pathD = history.length > 1 ? `M ${points.join(' L ')}` : ''

  return (
    <div className="w-full h-10 relative">
      <svg width={width} height={height} className="w-full h-full">
        {pathD && (
          <motion.path
            d={pathD}
            stroke="white"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>
    </div>
  )
}
