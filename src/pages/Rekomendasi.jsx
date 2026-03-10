import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Star, MapPin, Info, Flame } from 'lucide-react'

const recommendations = [
  { id: 10, name: 'Air Terjun Kalangan', score: '98%', rating: 4.9, type: 'Alam', reason: 'Kategori alam serupa dengan acuan', image: 'https://images.unsplash.com/photo-1433086566608-5732f1ea4e0d?auto=format&fit=crop&q=80&w=800' },
  { id: 11, name: 'Situs Budaya Betang', score: '94%', rating: 4.8, type: 'Budaya', reason: 'Populer di kalangan traveler serupa', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800' },
  { id: 12, name: 'Danau Kapuas Biru', score: '89%', rating: 4.7, type: 'Alam', reason: 'Lokasi berdekatan dengan acuan', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800' },
]

export default function Rekomendasi() {
  return (
    <div className="space-y-10 pb-16">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[24px] bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-200">
            <Zap size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Rekomendasi Cerdas</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Hasil optimasi algoritma Hybrid Recommender.</p>
          </div>
        </div>
      </header>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150 duration-700"></div>

        <div className="relative w-32 h-32 rounded-[24px] overflow-hidden border-4 border-slate-50 shadow-lg">
          <img src="/images/taman.png" className="w-full h-full object-cover" alt="acuan" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Wisata Acuan</p>
          <h3 className="text-3xl font-bold text-slate-800">Taman Raja Bunis</h3>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-slate-400">
            <MapPin size={16} />
            <span className="font-medium">Kuala Kapuas, Kalimantan Tengah</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-[24px] border border-slate-100">
          <Zap className="text-amber-500 fill-amber-500" size={24} />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter text-center">Analisis Selesai</p>
          <p className="text-sm font-bold text-slate-700">0.42 Detik</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-800">Top 3 Destinasi Untuk Anda</h3>
          <button className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline">
            Lihat Semua (12+) <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                  <p className="text-[8px] font-black text-white/70 tracking-tighter uppercase">Kecocokan</p>
                  <p className="text-lg font-black text-white leading-none">{item.score}</p>
                </div>
                <div className="absolute bottom-4 left-6 pr-4">
                  <p className="text-white text-lg font-bold drop-shadow-md leading-tight">{item.name}</p>
                  <div className="group/why relative inline-block mt-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-[10px] text-white font-bold cursor-help">
                      <Info size={12} /> Kenapa ini?
                    </div>
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] rounded-xl opacity-0 invisible group-hover/why:opacity-100 group-hover/why:visible transition-all shadow-xl z-50 border border-white/10">
                      {item.reason}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 py-2 px-4 bg-slate-50 rounded-xl text-slate-500 font-bold text-xs">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  {item.rating}
                </div>
                <button className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 hover:scale-110 transition-transform">
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Peta Sebaran</h3>
            <p className="text-slate-500 font-medium mb-6">Lokasi destinasi rekomendasi yang tersebar di wilayah Kapuas.</p>
            <div className="space-y-4">
              {recommendations.map(r => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-700">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 h-[350px] bg-slate-100 rounded-[32px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/114.3822,-3.0123,9,0/800x600?access_token=pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2p4eHg0eHh4eHh4eHh4eHh4eHh4In0')] bg-cover bg-center grayscale transition-all group-hover:grayscale-0 duration-700"></div>
            <div className="absolute inset-0 bg-emerald-500/5"></div>

            {/* Animated Pins */}
            <div className="absolute top-1/3 left-1/2 w-4 h-4 -translate-x-full bg-emerald-500 rounded-full border-2 border-white shadow-xl animate-float">
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            </div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            </div>
            <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[40px] p-12 shadow-2xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/30 px-4 py-1.5 rounded-full text-white text-xs font-bold mb-6">
              <Info size={14} />
              TEKNOLOGI HYBRID
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Bagaimana Kami Memilihnya?</h3>
            <p className="text-emerald-100 font-medium opacity-90 leading-relaxed text-lg">
              Sistem kami menggabungkan kesukaan pengguna lain (Collaborative) dengan kemiripan destinasi yang Anda pilih (Content-Based) untuk menghitung skor kecocokan yang sangat akurat.
            </p>
          </div>
          <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center p-6 backdrop-blur-sm border border-white/20">
            <div className="w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center p-4">
              <Zap className="text-emerald-600" size={48} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </div>
  )
}
