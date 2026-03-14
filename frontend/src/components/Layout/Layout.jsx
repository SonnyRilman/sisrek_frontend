import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full bg-[#fcfdfe] text-slate-900 font-outfit">
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <Navbar />
      
      <main className="relative z-10 w-full">
        <Outlet />
      </main>
    </div>
  )
}
