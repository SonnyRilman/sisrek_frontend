import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass } from 'lucide-react'

const navItems = [
  { path: '/', name: 'Beranda' },
  { path: '/daftar-wisata', name: 'Daftar Wisata' },
  { path: '/rekomendasi', name: 'Rekomendasi' },
  { path: '/statistik', name: 'Statistik' },
  { path: '/tentang', name: 'Tentang Sistem' },
]

export default function Navbar() {
  const location = useLocation();
  const isBeranda = location.pathname === '/';

  return (
    <nav className={`
      ${isBeranda ? 'absolute' : 'sticky'} 
      top-0 z-50 w-full transition-all duration-500
      ${isBeranda ? 'bg-transparent border-none' : 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Compass size={24} />
            </div>
            <div>
              <h1 className={`text-xl font-extrabold tracking-tight leading-none ${isBeranda ? 'text-white' : 'text-slate-800'}`}>SI WISATA</h1>
              <p className={`text-[9px] uppercase tracking-[0.3em] font-bold mt-1.5 px-0.5 ${isBeranda ? 'text-emerald-400' : 'text-emerald-600'}`}>Kapuas Regency</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative py-2 text-sm font-bold transition-all
                  ${isActive 
                    ? (isBeranda ? 'text-emerald-400' : 'text-emerald-600') 
                    : (isBeranda ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-800')}
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className={`absolute bottom-0 left-0 w-full h-1 rounded-full ${isBeranda ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center">
            <div className={`flex items-center gap-3 p-2 rounded-2xl border transition-all ${isBeranda ? 'bg-white/10 border-white/20' : 'bg-slate-50/50 border-slate-100/50 shadow-sm'}`}>
              <div className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/lorelei/svg?seed=Fera" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <p className={`text-xs font-black pr-2 hidden sm:block ${isBeranda ? 'text-white' : 'text-slate-800'}`}>Fera</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
