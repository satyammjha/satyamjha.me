'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect } from 'react'

const lines = [
  '$ bun dev',
  '> Starting server on port 3000...',
  '✔ Compiled successfully in 412ms',
  '',
  '🌐 Local: http://localhost:3000',
  '📡 API: http://localhost:3000/api',
  '',
  '🚀 Building production bundle...',
  '✔ Compiled successfully in 2.1s',
  '📦 Size: 1.2MB (gzipped)',
  '',
  '✅ Ready for deployment!'
]

export default function TerminalBackground() {
  const [isPlaying, setIsPlaying] = useState(true)
  const controls = useAnimationControls()
  const cursorControls = useAnimationControls()

  const startTyping = async () => {
    await controls.start({ opacity: 1 })
    cursorControls.start({
      opacity: [0, 1, 0],
      transition: { repeat: Infinity, duration: 0.8 }
    })
  }

  const restartAnimation = async () => {
    setIsPlaying(false)
    await controls.set({ opacity: 0 })
    setIsPlaying(true)
  }

  useEffect(() => {
    if (isPlaying) startTyping()
  }, [isPlaying])

  return (
    <motion.div
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-primary/20 bg-black/30 shadow-2xl backdrop-blur-xl"
      onClick={restartAnimation}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full p-4 font-mono text-sm text-green-400/80">
        <pre className="whitespace-pre-wrap">
          {lines.map((line, lineIndex) => (
            <motion.div 
              key={lineIndex}
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={controls}
            >

              {[...line].map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    delay: lineIndex * 0.3 + charIndex * 0.03,
                    type: 'spring'
                  }}
                >
                  {char}
                </motion.span>
              ))}
              
              {lineIndex === lines.length - 1 && (
                <motion.span
                  className="ml-1 h-4 w-[2px] bg-green-400"
                  animate={cursorControls}
                />
              )}
            </motion.div>
          ))}
        </pre>

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0"
          whileHover={{ opacity: 1 }}
        >
          <span className="rounded-lg bg-primary/10 px-4 py-2 text-sm backdrop-blur-sm">
            Click to restart animation
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}