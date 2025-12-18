const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_30d: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface HistoricalPrice {
  timestamp: number;
  price: number;
}

export async function getTopCoins(limit: number = 100): Promise<CoinData[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=30d`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching top coins:', error);
    throw error;
  }
}

export async function getCoinHistory(coinId: string, days: number = 30): Promise<HistoricalPrice[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coin history');
    }
    
    const data = await response.json();
    return data.prices.map(([timestamp, price]: [number, number]) => ({
      timestamp,
      price
    }));
  } catch (error) {
    console.error('Error fetching coin history:', error);
    throw error;
  }
}

export function calculateMetrics(prices: HistoricalPrice[]) {
  if (prices.length < 2) return null;

  const currentPrice = prices[prices.length - 1].price;
  const oldPrice = prices[0].price;
  const priceChange = ((currentPrice - oldPrice) / oldPrice) * 100;

  const priceValues = prices.map(p => p.price);
  const avgPrice = priceValues.reduce((a, b) => a + b, 0) / priceValues.length;
  const variance = priceValues.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / priceValues.length;
  const volatility = Math.sqrt(variance);

  return {
    priceChange,
    volatility,
    avgPrice,
    trend: priceChange > 0 ? 'bullish' : 'bearish'
  };
}