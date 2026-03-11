import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Star, MapPin, Info, Flame, Sparkles, Target, Cpu, Activity, ShieldCheck, Compass } from 'lucide-react'
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

const recommendations = [
  {
    id: 10,
    name: 'Air Terjun Kalangan',
    score: '98%',
    rating: 4.9,
    type: 'Alam',
    reason: 'Kategori alam serupa dengan acuan',
    image: 'https://images.unsplash.com/photo-1433086566608-5732f1ea4e0d?auto=format&fit=crop&q=80&w=800',
    factors: { distance: 95, interest: 98, budget: 100, trend: 90 }
  },
  {
    id: 11,
    name: 'Situs Budaya Betang',
    score: '94%',
    rating: 4.8,
    type: 'Budaya',
    reason: 'Populer di kalangan traveler serupa',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=800',
    factors: { distance: 80, interest: 95, budget: 90, trend: 98 }
  },
  {
    id: 12,
    name: 'Danau Kapuas Biru',
    score: '89%',
    rating: 4.7,
    type: 'Alam',
    reason: 'Lokasi berdekatan dengan acuan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    factors: { distance: 100, interest: 85, budget: 80, trend: 85 }
  },
]

export default function Rekomendasi() {
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
            <div className="w-36 h-36 rounded-3xl overflow-hidden border-[6px] border-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <img src="/images/taman.png" className="w-full h-full object-cover" alt="acuan" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-xl border-4 border-white">
              <Target size={22} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10 space-y-4">
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 px-1">Wisata Acuan Utama</p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tight">Taman Raja Bunis</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs bg-white/50 px-3 py-1.5 rounded-xl border border-white/60">
                <MapPin size={16} className="text-emerald-500" />
                <span>Kuala Kapuas</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs bg-white/50 px-3 py-1.5 rounded-xl border border-white/60">
                <Compass size={16} className="text-emerald-500" />
                <span>Wisata Alam</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/40 p-1.5 rounded-2xl border border-white/60">
            <button className="px-6 py-3 bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase rounded-xl hover:bg-black transition-all">Ganti Acuan</button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="px-4 py-1 text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">AI Health</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-black text-slate-800 uppercase">Optimal</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="glass-card p-8 border-white/80 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
            <Cpu size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Inference Time</p>
            <h4 className="text-2xl font-black text-slate-800">0.42<span className="text-xs text-slate-400 ml-0.5">sec</span></h4>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recommendations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card glass-card-hover group overflow-hidden border-white/60"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                  <div className="bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl flex flex-col items-center border border-white/20 shadow-2xl">
                    <p className="text-[9px] font-black text-white/60 tracking-widest uppercase mb-1 leading-none">Match Score</p>
                    <p className="text-2xl font-black text-white leading-none tracking-tighter">{item.score}</p>
                  </div>
                  <span className="bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white border border-white/20 shadow-lg">
                    {i === 0 ? 'Hybrid Intelligence' : i === 1 ? 'Content-Based Match' : 'Collaborative Insight'}
                  </span>
                </div>

                <div className="absolute bottom-6 left-8 right-8 space-y-5">
                  <h4 className="text-2xl font-black text-white drop-shadow-lg leading-tight">{item.name}</h4>

                  <div className="space-y-2">
                    <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">Similarity Matrix</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(item.factors).map(([k, v]) => (
                        <div key={k} className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} className="h-full bg-emerald-400" />
                          </div>
                          <span className="text-[8px] font-black text-white tracking-widest uppercase">{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="group/why relative inline-block pt-2">
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-[10px] text-white font-black tracking-widest uppercase hover:bg-white/20 transition-colors border border-white/10">
                      <Activity size={12} className="text-emerald-400" /> Intelligence
                    </button>
                    <div className="absolute bottom-full left-0 mb-3 w-56 p-4 bg-slate-900/95 backdrop-blur-xl text-white text-[11px] font-medium leading-relaxed rounded-2xl opacity-0 invisible group-hover/why:opacity-100 group-hover/why:visible transition-all shadow-2xl z-50 border border-white/10 -translate-y-2 group-hover/why:translate-y-0 text-left">
                      <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-6"></div>
                      <p className="text-emerald-400 font-black mb-1 text-[9px] uppercase tracking-widest">Reasoning</p>
                      {item.reason}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-1.5 py-2.5 px-5 bg-amber-50 rounded-2xl text-amber-500 font-extrabold text-sm border border-amber-100 shadow-sm">
                  <Star size={16} className="fill-amber-500" />
                  {item.rating}
                </div>
                <button className="btn-primary !p-3 !rounded-2xl">
                  <ArrowRight size={22} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="glass-card p-12 relative overflow-hidden border-white/60 shadow-premium">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-8">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Sebaran Geografis</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Lokasi destinasi pilihan yang tersebar secara strategis untuk efisiensi perjalanan Anda.</p>
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

              {/* Visual Map Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>

              <div className="absolute top-1/3 left-1/2 w-8 h-8 -translate-x-full bg-emerald-500 rounded-full border-[4px] border-white shadow-2xl animate-bounce">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
              </div>
              <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-emerald-500 rounded-full border-[4px] border-white shadow-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30"></div>
              </div>
              <div className="absolute top-2/3 right-1/4 w-10 h-10 bg-white rounded-2xl border-[4px] border-emerald-500 shadow-2xl animate-float flex items-center justify-center" style={{ animationDelay: '1s' }}>
                <MapPin className="text-emerald-500" size={20} fill="currentColor" />
              </div>

              <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white shadow-xl max-w-[200px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Coordinates</p>
                <p className="text-xs font-bold text-slate-800 tracking-tight">3.0123 S, 114.3822 E</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="h-64 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10">
              <Radar
                data={{
                  labels: ['Distance', 'Interest', 'Budget', 'Popularity', 'Safety', 'Accessibility'],
                  datasets: [
                    {
                      label: 'Target',
                      data: [90, 85, 95, 80, 100, 90],
                      backgroundColor: 'rgba(16, 185, 129, 0.4)',
                      borderColor: '#10b981',
                      borderWidth: 2,
                    },
                    {
                      label: 'Recommended',
                      data: [85, 95, 80, 90, 95, 85],
                      backgroundColor: 'rgba(14, 165, 233, 0.4)',
                      borderColor: '#0ea5e9',
                      borderWidth: 2,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      grid: { color: 'rgba(255,255,255,0.1)' },
                      angleLines: { color: 'rgba(255,255,255,0.1)' },
                      ticks: { display: false },
                      suggestedMin: 0,
                      suggestedMax: 100
                    }
                  },
                  plugins: {
                    legend: { labels: { color: '#fff', font: { family: 'Outfit', size: 10, weight: '900' } } }
                  }
                }}
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-[10px] font-black tracking-widest uppercase border border-emerald-500/20">
              <ShieldCheck size={14} /> Hybrid Engine V4
            </div>
            <h3 className="text-4xl font-black text-white leading-tight tracking-tight">Algoritma <span className="text-emerald-400">Similarity Matrix</span>.</h3>
            <p className="text-white/60 font-medium leading-relaxed text-base">
              Kami memetakan kesamaan antara destinasi acuan dengan katalog untuk memberikan rekomendasi dengan tingkat presisi yang tak tertandingi.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <Cpu size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase opacity-50">Inference</p>
                  <p className="text-sm font-black text-white tracking-widest">Real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
