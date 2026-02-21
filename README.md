# Polymarket Feed 🔮

> **Doomscroll through the odds of everything happening in the world. See the future in real time.**

A TikTok-style infinite scroll interface for browsing Polymarket prediction markets. Swipe through the probabilities of world events with beautiful, animated cards.

## ✨ Features

- 📱 **TikTok-Style Interface** - Vertical swipe navigation through prediction markets
- 🎨 **Beautiful Animations** - Smooth transitions with Framer Motion
- 📊 **Real-Time Odds** - Live probability updates that pulse and animate
- 🎯 **Trending Markets** - Hot, featured, and new market indicators
- 💫 **Immersive Design** - Dynamic gradients and particle effects
- ⌨️ **Multiple Navigation** - Swipe, scroll, or use arrow keys

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Navigation

- **Touch/Trackpad**: Swipe up/down to navigate between markets
- **Mouse**: Scroll wheel to move through markets
- **Keyboard**: Use arrow keys (↑/↓) to navigate

## 🎨 Design Features

### Market Cards Include:
- **Live Probability Display** - Large, animated YES/NO percentages
- **Market Stats** - Volume, 24h volume, and end date
- **Category Tags** - Politics, Tech, Crypto, etc.
- **Status Indicators** - Trending 🔥, New ✨, Hot 🚀
- **Detailed Descriptions** - Full market resolution criteria
- **Dynamic Backgrounds** - Color gradients that match probability

### Visual Effects:
- Gradient animations based on probability
- Floating particle effects
- Smooth page transitions
- Real-time probability updates with scale animations
- Glassmorphism UI elements

## 🔧 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and gestures
- **Polymarket API** - Real market data (with mock fallback)
- **React Icons** - Beautiful icon set
- **date-fns** - Date formatting

## 📁 Project Structure

```
polymarket/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page with market feed
├── components/
│   ├── MarketFeed.tsx        # TikTok-style scroll container
│   └── MarketCard.tsx        # Individual market card display
├── lib/
│   └── polymarket.ts         # API integration and utilities
├── types/
│   └── market.ts             # TypeScript type definitions
└── package.json
```

## 🎯 Future Enhancements

- Share market cards on social media
- Save favorite markets
- Filter by category
- Search functionality
- User authentication for predictions
- Portfolio tracking
- Push notifications for market updates
- Dark/light mode toggle
- Custom color themes

## 📱 Mobile Optimized

This app is fully responsive and optimized for mobile devices with:
- Touch gestures for natural swiping
- Smooth scroll snap
- Optimized animations for mobile performance
- Full-screen immersive experience

## 🌐 API Integration

The app connects to Polymarket's Gamma API for real market data. If the API is unavailable, it falls back to mock data for demonstration.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project however you'd like!

---

**Built with 💜 for the Polymarket community**

*Predict the future, one swipe at a time* ✨
