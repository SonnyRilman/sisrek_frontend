import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, LayoutList, Zap, BarChart3, Info, Compass, CloudSun, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const navigationGroup = [
  {
    title: 'Utama',
    items: [
      { path: '/', name: 'Beranda', icon: Home },
      { path: '/daftar-wisata', name: 'Daftar Wisata', icon: LayoutList },
    ]
  },
  {
    title: 'Analitik & Sistem',
    items: [
      { path: '/rekomendasi', name: 'Rekomendasi', icon: Zap },
      { path: '/statistik', name: 'Statistik', icon: BarChart3 },
    ]
  },
  {
    title: 'Lainnya',
    items: [
      { path: '/tentang', name: 'Tentang Sistem', icon: Info },
    ]
  }
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="w-64 h-[calc(100vh-2rem)] m-4 flex flex-col glass-card border-white/50 shadow-2xl shadow-slate-200/50 sticky top-4 left-4 z-50 text-sm overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-400 to-indigo-500"></div>

      <div className="p-6 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-200 animate-float">
          <Compass className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">SI WISATA</h1>
          <p className="text-[8px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1.5 px-0.5">Kapuas Regency</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white transition-all cursor-pointer group shadow-sm">
            <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/lorelei/svg?seed=Fera" alt="avatar" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-black text-slate-800 truncate">Fera</p>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tighter">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="px-3 py-2 space-y-8">
          {navigationGroup.map((group, groupIdx) => (
            <div key={group.title} className="space-y-2">
              <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (groupIdx * 2 + idx) * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                        ${isActive ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'}
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                          <span className="tracking-wide text-xs">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="active-pill"
                              className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-full"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 mt-4 mb-4">
          <div className="bg-gradient-to-br from-white/80 to-slate-50/50 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Cuaca
            </p>
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-1">
                <span className="text-2xl font-black text-slate-800">31°</span>
                <span className="text-[10px] font-bold text-slate-500 mb-1">C</span>
              </div>
              <CloudSun size={24} className="text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100/50 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 group">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
            <ShieldCheck size={20} className="text-emerald-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">Status Sistem</p>
            <p className="text-[11px] font-bold text-slate-700 leading-none">Terlindungi & Aktif</p>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
