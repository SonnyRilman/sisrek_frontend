import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Beranda() {
  const navigate = useNavigate()

  // --- Mouse Parallax Effect ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the parallax
  const bgX = useSpring(useTransform(mouseX, [-500, 500], [20, -20]), { stiffness: 50, damping: 30 })
  const bgY = useSpring(useTransform(mouseY, [-500, 500], [20, -20]), { stiffness: 50, damping: 30 })
  
  // Magnetic Button Effect
  const buttonX = useSpring(0, { stiffness: 200, damping: 20 })
  const buttonY = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const moveX = clientX - window.innerWidth / 2
    const moveY = clientY - window.innerHeight / 2
    mouseX.set(moveX)
    mouseY.set(moveY)
  }

  const handleButtonMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    buttonX.set(distanceX * 0.3)
    buttonY.set(distanceY * 0.3)
  }

  const handleButtonLeave = () => {
    buttonX.set(0)
    buttonY.set(0)
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-slate-800 font-outfit select-none"
    >
      
      {/* 1. Cinematic Background Layer with Parallax */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ x: bgX, y: bgY, scale: 1.05 }}
          className="w-full h-full"
        >
          <img
            src="/images/bg_4k.png"
            className="w-full h-full object-cover"
            alt="Kapuas Hulu"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=100&w=2560"; }}
          />
          {/* Enhanced Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay"></div>
        </motion.div>

        {/* Floating Particles System (Fireflies/Mist) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px]"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Content Layer Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-36 pb-12">
        
        {/* Main Hero Group */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl w-full py-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-emerald-500/50"></div>
              <span className="text-emerald-400 font-bold uppercase tracking-[0.5em] text-[10px] sm:text-xs">
                The Heart of Borneo
              </span>
              <div className="h-[1px] w-12 bg-emerald-500/50"></div>
            </div>

            <h1 className="flex flex-col">
              <span className="text-white font-black text-6xl sm:text-8xl md:text-9xl leading-none tracking-tighter drop-shadow-2xl">
                KAPUAS
              </span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent font-black text-6xl sm:text-8xl md:text-9xl leading-none tracking-tighter drop-shadow-2xl">
                HULU
              </span>
            </h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 backdrop-blur-md bg-white/5 border border-white/10 px-8 py-4 rounded-2xl inline-block"
            >
              <p className="text-white/80 font-medium italic text-sm sm:text-base tracking-wide">
                "Bukan sekadar daftar wisata — ini rekomendasi untuk petualanganmu."
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Action Pane - Enhanced Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-6xl mb-8"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-4 sm:p-6 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Hybrid Recommender System</span>
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                  Temukan destinasi yang benar-benar cocok melalui analisis cerdas.
                </h3>
                <p className="text-white/60 text-sm md:text-base max-w-xl">
                  Memadukan metode <span className="text-emerald-400 font-semibold italic">Content-Based</span> dan <span className="text-teal-400 font-semibold italic">Collaborative Filtering</span> untuk memberikan rekomendasi wisata Kapuas Hulu yang paling personal dan akurat.
                </p>
              </div>

              <motion.button
                onClick={() => navigate('/daftar-wisata')}
                onMouseMove={handleButtonMove}
                onMouseLeave={handleButtonLeave}
                style={{ x: buttonX, y: buttonY }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn relative px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center gap-4 shadow-[0_20px_40px_-5px_rgba(16,185,129,0.3)] transition-all hover:shadow-emerald-500/50"
              >
                <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Mulai Petualangan</span>
                <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-2 transition-transform" />
                
                {/* Button Shine Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 opacity-40"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </div>
    </div>
  )
}
