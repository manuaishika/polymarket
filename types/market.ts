export interface Market {
  id: string
  question: string
  description?: string
  outcomes: string[]
  outcomePrices: string[]
  volume: string
  liquidity: string
  endDate: string
  image?: string
  category?: string
  tags?: string[]
  active: boolean
  closed: boolean
  new?: boolean
  featured?: boolean
  volume24hr?: string
}

export interface MarketStats {
  yes: number
  no: number
  volume: string
  liquidity: string
}
