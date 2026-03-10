import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, TrendingUp, Users, ArrowRight, Flame, Compass } from 'lucide-react'

const stats = [
  { label: 'Destinasi', value: '45+', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Rating Rata-rata', value: '4.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Wisata Populer', value: '12', icon: TrendingUp, color: 'text-sky-500', bg: 'bg-sky-50' },
  { label: 'Pengguna Aktif', value: '1.2k', icon: Users, color: 'text-rose-500', bg: 'bg-rose-50' },
]

export default function Beranda() {
  return (
    <div className="space-y-10 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold tracking-tight text-slate-900"
          >
            Halo, <span className="text-emerald-600">Traveler!</span>
          </motion.h1>
          <p className="mt-2 text-lg text-slate-500 font-medium">
            Temukan destinasi tersembunyi di Kabupaten Kapuas hari ini.
          </p>
        </div>
      </header>

      <section className="relative h-[450px] rounded-[40px] overflow-hidden group shadow-2xl shadow-emerald-100/50">
        <img
          src="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Kapuas"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold mb-6">
              <Flame size={14} className="text-amber-400" />
              DESTINASI UNGGULAN MINGGU INI
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Keajaiban Sungai Kapuas: Eksplorasi Budaya & Alam</h2>
            <p className="text-slate-200 mb-8 text-lg font-medium opacity-90 leading-relaxed">
              Jelajahi keindahan sungai terpanjang di Indonesia dengan pengalaman yang belum pernah Anda rasakan sebelumnya.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all hover:gap-5 hover:bg-slate-50 shadow-xl shadow-black/20">
              Mulai Eksplorasi Sekarang <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-4 group hover:border-emerald-100 transition-colors"
          >
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:rotate-12`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl shadow-slate-200/30">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Cerdas Dalam Memilih Destinasi</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Sistem SRWK menggunakan teknologi <span className="text-emerald-600 font-bold underline decoration-emerald-200 decoration-4">Hybrid Recommendation</span> untuk memastikan setiap tempat yang kami sarankan benar-benar sesuai dengan preferensi unik Anda.
            </p>
            <div className="max-w-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-700">Akurasi Tinggi</p>
                <p className="text-xs text-slate-500 mt-1">98.5% Kesenangan Pengguna</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="relative">
              <div className="w-full aspect-square bg-emerald-50 rounded-full flex items-center justify-center p-8">
                <div className="w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <Compass className="text-emerald-600" size={80} strokeWidth={1} />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shadow-lg -rotate-12 animate-bounce">
                <Star className="text-amber-500" fill="currentColor" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
