'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="relative text-center">
          {/* Spinner */}
          <motion.div
            className="w-20 h-20 border-4 border-poly-blue border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Loading text */}
          <motion.p
            className="text-white text-2xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading the future...
          </motion.p>

          <motion.p
            className="text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Fetching prediction markets
          </motion.p>

          {/* Animated dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
