'use client'

import { useEffect, useState } from 'react'
import MarketFeed from '@/components/MarketFeed'
import LoadingScreen from '@/components/LoadingScreen'
import { fetchMarkets } from '@/lib/polymarket'
import type { Market } from '@/types/market'

export default function Home() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMarkets()
  }, [])

  const loadMarkets = async () => {
    try {
      const data = await fetchMarkets()
      setMarkets(data)
    } catch (error) {
      console.error('Failed to load markets:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return <MarketFeed markets={markets} />
}
