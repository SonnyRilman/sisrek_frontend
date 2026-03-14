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
      className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-slate-950 font-outfit select-none"
    >
      
      {/* 1. Cinematic Background Layer with Parallax */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ x: bgX, y: bgY, scale: 1.1 }}
          className="w-full h-full"
        >
          <img
            src="/kapuas_hulu_4k_hero_1773503911703.png"
            className="w-full h-full object-cover"
            alt="Kapuas Hulu"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=100&w=2560"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95"></div>
        </motion.div>
      </div>

      {/* 2. Content Layer Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pb-12">
        
        {/* Main Hero Group */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl w-full py-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Subtitle */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-emerald-500/50"></div>
              <p className="text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-[0.8em] pl-3">
                The Heart of Borneo
              </p>
              <div className="h-px w-8 bg-emerald-500/50"></div>
            </div>

            {/* Typography with Sweep Effect */}
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none flex flex-col items-center">
                <span>KAPUAS</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-800">
                  HULU
                  {/* Light Sweep Animation */}
                  <motion.div 
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  ></motion.div>
                </span>
              </h1>
              
              <div className="pt-8">
                <p className="text-emerald-300 font-bold italic text-sm md:text-xl tracking-tight inline-block border-y border-white/10 py-3 px-8 backdrop-blur-sm bg-black/5">
                  "Bukan sekadar daftar wisata — ini rekomendasimu."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Tidy Action Pane */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-full max-w-6xl mt-auto"
        >
          <div className="bg-slate-900/60 backdrop-blur-[40px] border border-white/10 p-6 md:p-8 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Hybrid Recommender System</h4>
               <p className="text-white/70 font-medium leading-relaxed text-xs md:text-sm lg:text-[16px] max-w-xl">
                  Temukan destinasi yang benar-benar cocok melalui analisis metode <span className="text-emerald-400 font-bold">Content-Based</span> dan <span className="text-emerald-400 font-bold">Collaborative Filtering</span> untuk pengalaman tak terlupakan.
               </p>
            </div>
            
            <motion.button 
              onMouseMove={handleButtonMove}
              onMouseLeave={handleButtonLeave}
              style={{ x: buttonX, y: buttonY }}
              onClick={() => navigate('/daftar-wisata')}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] py-6 px-12 rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
            >
              Mulai Petualangan
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
      </motion.div>

    </div>
  )
}
