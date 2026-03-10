import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, LayoutList, Zap, BarChart3, Info, Compass, CloudSun } from 'lucide-react'
import { motion } from 'framer-motion'

const menuItems = [
  { path: '/', name: 'Beranda', icon: Home },
  { path: '/daftar-wisata', name: 'Daftar Wisata', icon: LayoutList },
  { path: '/rekomendasi', name: 'Rekomendasi', icon: Zap },
  { path: '/statistik', name: 'Statistik', icon: BarChart3 },
  { path: '/tentang', name: 'Tentang Sistem', icon: Info },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-[calc(100vh-2rem)] m-4 p-4 flex flex-col bg-white/50 backdrop-blur-xl border border-slate-200/50 rounded-3xl shadow-xl shadow-slate-200/50 sticky top-4 left-4 z-50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-100"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-200">
          <Compass className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">SI Wisata</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Kapuas Regency</p>
        </div>
      </div>

      <nav className="flex-1 px-2 py-8 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group
              ${isActive
                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200'
                : 'text-slate-500 hover:bg-white hover:text-emerald-600'
              }
            `}
          >
            <item.icon size={20} className={`transition-transform duration-500 group-hover:scale-110`} />
            <span className="font-semibold tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-2 mb-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:scale-125 transition-transform duration-500">
            <CloudSun size={40} className="text-emerald-600" />
          </div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Cuaca Kapuas</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-800">31°</span>
            <span className="text-sm font-bold text-slate-500 mb-1">Cerah Berawan</span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-2">
        <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">System Health</p>
          <p className="text-xs font-bold text-slate-700">Online & Optimized</p>
        </div>
      </div>
    </motion.aside>
  )
}
