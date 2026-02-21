import axios from 'axios'
import type { Market } from '@/types/market'

const GAMMA_API = 'https://gamma-api.polymarket.com'
const STRAPI_API = 'https://strapi-matic.poly.market'

// Fetch trending/popular markets
export async function fetchMarkets(limit: number = 50): Promise<Market[]> {
  try {
    // Use the Gamma API to fetch markets
    const response = await axios.get(`${GAMMA_API}/markets`, {
      params: {
        limit,
        active: true,
        closed: false,
      },
    })

    const markets = response.data
    
    // Transform the data to our Market type
    return markets.map((market: any) => ({
      id: market.condition_id || market.id,
      question: market.question,
      description: market.description,
      outcomes: market.outcomes || ['Yes', 'No'],
      outcomePrices: market.outcomePrices || ['0.5', '0.5'],
      volume: market.volume || '0',
      liquidity: market.liquidity || '0',
      endDate: market.end_date_iso || market.endDate,
      image: market.image,
      category: market.category || market.market_slug,
      tags: market.tags || [],
      active: market.active !== false,
      closed: market.closed || false,
      new: market.new || false,
      featured: market.featured || false,
      volume24hr: market.volume24hr || '0',
    }))
  } catch (error) {
    console.error('Error fetching markets:', error)
    // Return mock data as fallback
    return getMockMarkets()
  }
}

// Mock data for development/fallback
function getMockMarkets(): Market[] {
  return [
    {
      id: '1',
      question: 'Will Donald Trump win the 2024 US Presidential Election?',
      description: 'This market will resolve to "Yes" if Donald Trump wins the 2024 US Presidential Election.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.52', '0.48'],
      volume: '125000000',
      liquidity: '5000000',
      endDate: '2024-11-05T23:59:59Z',
      category: 'Politics',
      tags: ['politics', 'us', 'election'],
      active: true,
      closed: false,
      featured: true,
      volume24hr: '2500000',
    },
    {
      id: '2',
      question: 'Will AI achieve AGI by end of 2026?',
      description: 'Resolves to Yes if artificial general intelligence is achieved by December 31, 2026.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.23', '0.77'],
      volume: '45000000',
      liquidity: '2000000',
      endDate: '2026-12-31T23:59:59Z',
      category: 'Technology',
      tags: ['ai', 'tech', 'agi'],
      active: true,
      closed: false,
      new: true,
      volume24hr: '850000',
    },
    {
      id: '3',
      question: 'Bitcoin above $100,000 by July 2026?',
      description: 'This market resolves to Yes if Bitcoin trades above $100,000 at any point before July 1, 2026.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.68', '0.32'],
      volume: '89000000',
      liquidity: '3500000',
      endDate: '2026-07-01T23:59:59Z',
      category: 'Crypto',
      tags: ['crypto', 'bitcoin', 'finance'],
      active: true,
      closed: false,
      volume24hr: '1200000',
    },
    {
      id: '4',
      question: 'Will there be a major AI safety incident in 2026?',
      description: 'Resolves Yes if a significant AI safety incident occurs causing harm or disruption.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.31', '0.69'],
      volume: '23000000',
      liquidity: '1200000',
      endDate: '2026-12-31T23:59:59Z',
      category: 'Technology',
      tags: ['ai', 'safety', 'risk'],
      active: true,
      closed: false,
      volume24hr: '450000',
    },
    {
      id: '5',
      question: 'Apple releases AR glasses in 2026?',
      description: 'This market resolves to Yes if Apple releases consumer AR glasses in 2026.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.42', '0.58'],
      volume: '34000000',
      liquidity: '1800000',
      endDate: '2026-12-31T23:59:59Z',
      category: 'Technology',
      tags: ['apple', 'ar', 'tech'],
      active: true,
      closed: false,
      volume24hr: '680000',
    },
    {
      id: '6',
      question: 'Will SpaceX land humans on Mars by 2030?',
      description: 'Resolves Yes if SpaceX successfully lands humans on Mars before January 1, 2031.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.18', '0.82'],
      volume: '67000000',
      liquidity: '2800000',
      endDate: '2030-12-31T23:59:59Z',
      category: 'Space',
      tags: ['space', 'spacex', 'mars'],
      active: true,
      closed: false,
      volume24hr: '920000',
    },
    {
      id: '7',
      question: 'Global recession in 2026?',
      description: 'Resolves Yes if two consecutive quarters of negative global GDP growth occur in 2026.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.37', '0.63'],
      volume: '78000000',
      liquidity: '3200000',
      endDate: '2026-12-31T23:59:59Z',
      category: 'Economics',
      tags: ['economy', 'recession', 'finance'],
      active: true,
      closed: false,
      featured: true,
      volume24hr: '1500000',
    },
    {
      id: '8',
      question: 'Will lab-grown meat be widely available in US supermarkets by 2027?',
      description: 'Resolves Yes if lab-grown meat is available in at least 25% of major US supermarket chains.',
      outcomes: ['Yes', 'No'],
      outcomePrices: ['0.29', '0.71'],
      volume: '19000000',
      liquidity: '950000',
      endDate: '2027-12-31T23:59:59Z',
      category: 'Food & Agriculture',
      tags: ['food', 'tech', 'environment'],
      active: true,
      closed: false,
      volume24hr: '320000',
    },
  ]
}

// Format large numbers for display
export function formatVolume(volume: string | number): string {
  const num = typeof volume === 'string' ? parseFloat(volume) : volume
  
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`
  }
  return `$${num.toFixed(0)}`
}

// Format probability percentage
export function formatProbability(price: string | number): number {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return Math.round(num * 100)
}
