import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Star, MapPin, Info, Flame, Sparkles, Target, Cpu, Activity, ShieldCheck, Compass, Users, Loader2 } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartTooltip,
  Legend
)

export default function Rekomendasi() {
  const [recommendations, setRecommendations] = useState([])
  const [acuan, setAcuan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      const selectedId = localStorage.getItem('selectedWisataId') || 1
      try {
        const response = await fetch(`http://localhost:5000/api/rekomendasi?id=${selectedId}`)
        const data = await response.json()
        if (data.results) {
          setRecommendations(data.results)
          setAcuan(data.acuan)
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-200 animate-float"
          >
            <Zap size={32} className="fill-white" />
          </motion.div>
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-widest uppercase mb-0.5">
              <span>AI Recommender</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Rekomendasi Cerdas</h1>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic">Optimasi algoritma untuk perjalanan Anda.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 glass-card p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group border-white/80"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative">
            <div className="w-36 h-36 rounded-3xl overflow-hidden border-[6px] border-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 bg-slate-100">
              <img 
                src={recommendations[0]?.image || "/images/taman.png"} 
                className="w-full h-full object-cover" 
                alt="acuan" 
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-xl border-4 border-white">
              <Target size={22} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10 space-y-4">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 px-1">Wisata Acuan Utama</p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tight">{acuan?.name || 'Memuat...'}</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs bg-white/50 px-3 py-1.5 rounded-xl border border-white/60">
                <MapPin size={16} className="text-emerald-500" />
                <span>Kuala Kapuas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs bg-white/50 px-3 py-1.5 rounded-xl border border-white/60">
                <Compass size={16} className="text-emerald-500" />
                <span>Kategori Terkait</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/40 p-1.5 rounded-2xl border border-white/60">
            <button className="px-6 py-3 bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase rounded-xl hover:bg-black transition-all">AI Active</button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="px-4 py-1 text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Inference</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-black text-slate-800 uppercase">0.4s</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="glass-card p-8 border-white/80 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
            <Cpu size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hybrid Status</p>
            <h4 className="text-2xl font-black text-slate-800">SYNCED</h4>
          </div>
          <div className="w-full flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
              <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} className="h-full w-full bg-emerald-500"></motion.div>
            </div>)}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Top 3 Pilihan Teratas</h3>
          <button className="text-emerald-600 font-black text-sm flex items-center gap-2 hover:gap-3 transition-all px-6 py-2 rounded-full hover:bg-emerald-50">
            Lihat Semua <ArrowRight size={18} />
          </button>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-bold">Menghitung rekomendasi...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recommendations.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card glass-card-hover group overflow-hidden border-white/60 p-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/50 flex items-center gap-1.5 shadow-lg">
                    <Zap size={12} className="text-white fill-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">Hybrid Result</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center border border-white/20">
                    <p className="text-[8px] font-black text-white/70 tracking-tighter uppercase">Kecocokan</p>
                    <p className="text-lg font-black text-white leading-none">{item.score}</p>
                  </div>

                  <div className="absolute bottom-4 left-6 pr-4">
                    <p className="text-white text-lg font-bold drop-shadow-md leading-tight">{item.name}</p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Content Similarity</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{item.breakdown?.content || '0%'}</span>
                        <div className="w-8 h-1 bg-emerald-200 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: item.breakdown?.content }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">User Interests</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{item.breakdown?.collaborative || '0%'}</span>
                        <div className="w-8 h-1 bg-sky-200 rounded-full overflow-hidden">
                           <div className="h-full bg-sky-500" style={{ width: item.breakdown?.collaborative }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-3 min-h-[60px]">
                    <Info size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-emerald-800 font-medium leading-relaxed italic">
                      {item.reason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 py-2 px-4 bg-slate-50 rounded-xl text-slate-500 font-bold text-xs border border-slate-100">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      {item.rating}
                    </div>
                    <button className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 hover:scale-110 active:scale-95 transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <section className="glass-card p-12 relative overflow-hidden border-white/60 shadow-premium">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-8">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Sebaran Geografis</h3>
            <div className="space-y-3">
              {recommendations.map(r => (
                <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse"></div>
                  <span className="text-sm font-black text-slate-700">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 h-[450px] relative">
            <div className="absolute inset-0 flex items-center justify-center -z-0 opacity-10">
              <Compass size={400} strokeWidth={0.5} className="text-slate-900 rotate-12" />
            </div>
            <div className="relative h-full bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 shadow-inner group">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/114.3822,-3.0123,9,0/800x600?access_token=pk.eyJ1IjoicGxhY2Vob2xkZXIiLCJhIjoiY2p4eHg0eHh4eHh4eHh4eHh4eHh4In0')] bg-cover bg-center grayscale transition-all group-hover:grayscale-0 duration-1000 scale-105 group-hover:scale-100 opacity-60"></div>
              <div className="absolute inset-0 bg-emerald-500/5"></div>
              
              <div className="absolute top-1/3 left-1/2 w-8 h-8 -translate-x-full bg-emerald-500 rounded-full border-[4px] border-white shadow-2xl animate-bounce">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
              </div>
              <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-emerald-500 rounded-full border-[4px] border-white shadow-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
              </div>
              <div className="absolute top-2/3 right-1/4 w-10 h-10 bg-white rounded-2xl border-[4px] border-emerald-500 shadow-2xl animate-float flex items-center justify-center" style={{ animationDelay: '1s' }}>
                <MapPin className="text-emerald-500" size={20} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[40px] p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-tighter mb-4">
                 Sistem Kecerdasan Hybrid (SHB v1.4)
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Transparansi Algoritma</h3>
            </div>

            <div className="space-y-6">
               <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">1. Analisis Konten (CBF)</h4>
                    <p className="text-sm text-slate-500 mt-1">Sistem memetakan kecocokan Atribut (tema, fasilitas, lokasi) antara wisata acuan dengan database melalui Jaccard Scoring.</p>
                  </div>
               </div>

               <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">2. Analisis Kolaboratif (CF)</h4>
                    <p className="text-sm text-slate-500 mt-1">Menganalisis riwayat rating dari pengguna serupa untuk menemukan pola destinasi favorit.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:w-1/3 bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={120} />
             </div>
             <h4 className="text-xl font-bold mb-6">Metrics Report</h4>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">Accuracy</span>
                      <span className="text-emerald-400">92%</span>
                   </div>
                   <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                   </div>
                </div>
                <div className="pt-4 border-t border-white/10 mt-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-sm font-bold">Algoritma Aktif</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
