'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShare2, FiCheck } from 'react-icons/fi'

interface ShareButtonProps {
  marketQuestion: string
  probability: number
}

export default function ShareButton({ marketQuestion, probability }: ShareButtonProps) {
  const [showCopied, setShowCopied] = useState(false)

  const handleShare = async () => {
    const shareText = `${marketQuestion}\n\nCurrent odds: ${probability}% YES\n\nSee more on Polymarket Feed`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Polymarket Prediction',
          text: shareText,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or share failed
        console.log('Share cancelled')
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  return (
    <motion.button
      onClick={handleShare}
      className="relative bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full p-3 border border-white/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {showCopied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <FiCheck className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
          >
            <FiShare2 className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {showCopied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
        >
          Copied to clipboard!
        </motion.div>
      )}
    </motion.button>
  )
}
