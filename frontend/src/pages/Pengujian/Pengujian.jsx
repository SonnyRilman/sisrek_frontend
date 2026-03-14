import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Target, Activity, Zap, RefreshCw, BarChart, CheckCircle2 } from 'lucide-react'

export default function Pengujian() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  const fetchMetrics = async () => {
    setTesting(true)
    try {
      const response = await fetch('http://localhost:5000/api/metrics')
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Error fetching metrics:", error)
    } finally {
      setLoading(false)
      setTesting(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-xl shadow-indigo-200">
            <ShieldCheck size={32} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 font-bold text-[10px] tracking-widest uppercase mb-0.5">
              <span>Quality Assurance</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Pengujian Sistem</h1>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic">Validasi performa algoritma secara real-time.</p>
          </div>
        </div>
        <button 
          onClick={fetchMetrics}
          disabled={testing}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm font-black text-slate-600 text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={16} className={testing ? 'animate-spin' : ''} />
          Jalankan Uji Ulang
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Precision @3', value: metrics?.precision || '0%', icon: Target, color: 'emerald', desc: 'Akurasi item yang relevan dari rekomendasi.' },
          { title: 'Recall @3', value: metrics?.recall || '0%', icon: Activity, color: 'sky', desc: 'Cakupan item relevan yang berhasil ditemukan.' },
          { title: 'F1-Score', value: metrics?.f1_score || '0%', icon: Zap, color: 'indigo', desc: 'Keseimbangan antara Precision dan Recall.' },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 border-white/60 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
            <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 shadow-inner`}>
              <item.icon size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
            <div className="flex items-end gap-2 mb-4">
               <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">{loading ? '---' : item.value}</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-10 border-white/60"
        >
          <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
             <BarChart size={24} className="text-indigo-500" />
             Metode Pengujian
          </h3>
          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs shrink-0">1</div>
                <div>
                   <h4 className="font-bold text-slate-800">Leave-One-Out (Top-3)</h4>
                   <p className="text-sm text-slate-500 mt-1">Setiap destinasi (total {metrics?.total_data}) diuji secara bergantian sebagai acuan untuk mengamati kualitas 3 hasil teratas.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-800">Ground Truth Relevansi</h4>
                   <p className="text-sm text-slate-500 mt-1">Item dianggap relevan jika memiliki irisan minimal satu Atribut Wisata yang sama dengan item acuan.</p>
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-10 border-white/60 bg-slate-900 text-white"
        >
           <h3 className="text-2xl font-black mb-8">Interpretasi Laporan</h3>
           <div className="space-y-6 opacity-90">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                 <p className="text-sm italic leading-relaxed">
                   "Precision sebesar <strong>{metrics?.precision}</strong> menunjukkan bahwa mayoritas rekomendasi yang diberikan oleh sistem sudah sesuai dengan minat kategori wisata yang dicari oleh pengguna."
                 </p>
              </div>
              <div className="space-y-4 pt-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Confidence Level</span>
                    <span className="text-emerald-400 font-black">HIGH</span>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: metrics?.precision || 0 }}
                      className="h-full bg-emerald-500"
                    />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  )
}
