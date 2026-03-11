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
    <div className="space-y-8 pb-16">
      <header className="flex flex-col gap-1">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-emerald-600 font-bold text-[10px] tracking-widest uppercase"
        >
          <span>Selamat Datang</span>
        </motion.div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-slate-800 leading-tight"
          >
            Eksplorasi <span className="gradient-text">Kapuas</span><br />
            Lebih Cerdas.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:max-w-[280px] text-sm text-slate-500 font-medium leading-relaxed"
          >
            Sistem rekomendasi wisata berbasis <span className="text-slate-900 font-bold italic">Hybrid Intelligence</span> untuk Anda.
          </motion.p>
        </div>
      </header>

      <section className="relative h-[400px] rounded-[2.5rem] overflow-hidden group shadow-xl shadow-emerald-200/15 border border-white/40">
        <img
          src="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="Kapuas"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-emerald-300 text-[9px] font-black tracking-[0.15em] mb-6 border border-emerald-500/20">
              <Flame size={12} className="text-amber-400" />
              DESTINASI UNGGULAN
            </div>
            <h2 className="text-3xl font-black text-white mb-4 leading-tight">Pesona Sungai Kapuas: Antara Tradisi & Alam</h2>
            <p className="text-white/80 mb-8 text-base font-medium opacity-90 leading-relaxed max-w-lg">
              Temukan harmoni kehidupan masyarakat bantaran sungai dengan keasrian hutan Kalimantan.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary flex items-center gap-2 !py-2.5 !px-6 !text-sm">
                Mulai Eksplorasi <ArrowRight size={16} />
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all">
                Lihat Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card glass-card-hover p-6 flex flex-col gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mb-0.5">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black tracking-widest uppercase">Teknologi Cerdas</div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Rekomendasi Personal</h3>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              Sistem <span className="text-slate-800 font-bold underline decoration-emerald-400/30 decoration-4 underline-offset-[-2px]">SRWK Kapuas</span> memberikan saran destinasi yang paling relevan dengan minat Anda.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white shadow-sm border border-slate-50 rounded-2xl">
                <p className="font-black text-slate-800 text-xl tracking-tighter">98.5%</p>
                <p className="text-[9px] text-slate-400 font-black uppercase mt-0.5">Akurasi</p>
              </div>
              <div className="p-4 bg-white shadow-sm border border-slate-50 rounded-2xl">
                <p className="font-black text-slate-800 text-xl tracking-tighter">Instant</p>
                <p className="text-[9px] text-slate-400 font-black uppercase mt-0.5">Cepat</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="w-60 h-60 bg-gradient-to-tr from-emerald-50 to-sky-50 rounded-full flex items-center justify-center p-10 border border-emerald-100/50 shadow-inner"
              >
                <div className="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-50">
                  <Compass className="text-emerald-500" size={60} strokeWidth={0.5} />
                </div>
              </motion.div>
              <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/50 animate-float">
                <Star className="text-amber-500 fill-amber-500" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
