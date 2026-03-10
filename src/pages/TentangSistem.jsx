import React from 'react'
import { motion } from 'framer-motion'
import { Database, Cpu, ShieldCheck, Github, ExternalLink } from 'lucide-react'

export default function TentangSistem() {
  const sections = [
    {
      title: 'Data Berbasis Fakta',
      icon: Database,
      content: 'dataset dioptimasi dari data Dinas Pariwisata Kapuas 2024-2025, mencakup meta-data destinasi, ulasan pengunjung, dan matriks popularitas real-time.',
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
      content: 'Dibangun di atas stack modern React + Vite dengan arsitektur yang ringan, cepat, dan aman untuk pengolahan data besar.',
      color: 'rose'
    }
  ]

  return (
    <div className="space-y-12 pb-20">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Eksplorasi Teknologi</h1>
        <p className="text-slate-500 mt-2 font-medium italic">Transparansi sistem dan metodologi pengembangan SRWK.</p>
      </header>

      <div className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-1000"></div>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-black text-slate-800 mb-6 leading-tight">Misi SRWK: Digitalisasi <span className="text-emerald-600 underline">Pariwisata Daerah</span></h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
            Sistem Rekomendasi Wisata Kapuas (SRWK) bukan sekadar katalog digital. Ini adalah solusi cerdas untuk memajukan potensi wisata lokal melalui pendekatan sains data, memudahkan wisatawan menemukan kebahagiaan mereka di Kalimantan Tengah.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-300">
              <Github size={20} /> Repository Proyek
            </button>
            <button className="bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-50 transition-all">
              <ExternalLink size={20} /> Dokumentasi API
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, i) => {
          const colors = {
            emerald: 'bg-emerald-50 text-emerald-600',
            sky: 'bg-sky-50 text-sky-500',
            rose: 'bg-rose-50 text-rose-500'
          }
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-emerald-100 transition-colors"
            >
              <div className={`w-16 h-16 rounded-2xl ${colors[section.color]} flex items-center justify-center mb-8 shadow-lg`}>
                <section.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{section.content}</p>
            </motion.div>
          )
        })}
      </div>

      <footer className="pt-20 text-center space-y-4">
        <div className="w-12 h-1 gap-1 flex mx-auto">
          <div className="flex-1 bg-emerald-200 rounded-full"></div>
          <div className="flex-1 bg-sky-200 rounded-full"></div>
          <div className="flex-1 bg-rose-200 rounded-full"></div>
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-tighter text-xs">Versi Produksi 2.1.0-Stable</p>
        <p className="text-slate-500 font-medium">© 2026 Tim Pengembang SRWK. Build with ❤️ for Kapuas.</p>
      </footer>
    </div>
  )
}
