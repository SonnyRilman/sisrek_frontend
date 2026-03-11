import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-[#fcfdfe] overflow-hidden text-slate-900 font-outfit relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-sky-100/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/20 rounded-full blur-[100px] pointer-events-none animate-float"></div>
      
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto w-full p-4 lg:p-10 pt-8 z-10 scroll-smooth custom-scrollbar">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
