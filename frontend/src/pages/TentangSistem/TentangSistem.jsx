import React from 'react'
import { motion } from 'framer-motion'
import { Database, Cpu, ShieldCheck, Github, ExternalLink, Info, Award, Globe } from 'lucide-react'

export default function TentangSistem() {
  const sections = [
    {
      title: 'Data Berbasis Fakta',
      icon: Database,
      content: 'Dataset dioptimasi dari data Dinas Pariwisata Kapuas 2024-2025, mencakup meta-data destinasi, ulasan pengunjung, dan matriks popularitas real-time.',
      color: 'emerald'
    },
    {
      title: 'Algoritma Hybrid',
      icon: Cpu,
      content: 'Mengkombinasikan Collaborative Filtering (kesamaan antar pengguna) dan Content-Based Filtering (kesamaan atribut wisata) menggunakan Cosine Similarity.',
      color: 'sky'
    },
    {
      title: 'Infrastruktur Canggih',
      icon: ShieldCheck,
      content: 'Dibangun di atas stack modern React 19 + Vite 7 dengan arsitektur yang ringan, cepat, dan aman untuk pengolahan data besar secara efisien.',
      color: 'indigo'
    }
  ]

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-1">
        <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-widest uppercase">
          <Info size={12} />
          <span>Eksplorasi Teknologi</span>
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Dibalik Layar SRWK</h1>
        <p className="text-slate-500 text-sm font-medium">Transparansi sistem dan komitmen kami untuk kemajuan daerah.</p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-12 border-white/60 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-sky-100/30 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000"></div>

        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-1.5 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 shadow-sm flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
              <Award size={14} className="text-amber-500" />
              Inovasi Digital
            </div>
            <div className="px-4 py-1.5 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 shadow-sm flex items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-widest">
              <Globe size={14} className="text-sky-500" />
              Kapuas Global
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-800 leading-tight">Misi SRWK: Digitalisasi <span className="gradient-text">Pariwisata Daerah</span> Melalui Inteligensi Buatan.</h2>
          <p className="text-base text-slate-500 font-medium leading-[1.7] opacity-90">
            Sistem Rekomendasi Wisata Kapuas (SRWK) adalah solusi cerdas untuk memajukan potensi wisata lokal melalui pendekatan sains data, memudahkan wisatawan menemukan kebahagiaan mereka di Kalimantan Tengah.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center gap-2 hover:bg-black transition-all shadow-xl active:scale-95">
              <Github size={18} /> Repository
            </button>
            <button className="bg-white/50 backdrop-blur-md text-slate-700 border border-white/80 px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center gap-2 hover:bg-white transition-all shadow-lg active:scale-95">
              <ExternalLink size={18} /> API Docs
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, i) => {
          const colors = {
            emerald: 'bg-emerald-50 text-emerald-600',
            sky: 'bg-sky-50 text-sky-500',
            indigo: 'bg-indigo-50 text-indigo-500'
          }
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass-card glass-card-hover p-10 border-white/60 flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${colors[section.color]} flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform`}>
                <section.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-4 tracking-tight">{section.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed opacity-80">{section.content}</p>
            </motion.div>
          )
        })}
      </div>

      <footer className="pt-20 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent to-emerald-200 rounded-full"></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
          <div className="w-12 h-1 bg-gradient-to-l from-transparent to-emerald-200 rounded-full"></div>
        </div>
        <div className="space-y-1">
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[8px]">Versi Produksi 2.1.0-Stable</p>
          <p className="text-slate-600 font-bold text-base italic opacity-80">© 2026 Tim Pengembang SRWK. Build with ❤️ for Kapuas.</p>
        </div>
      </footer>
    </div>
  )
}
