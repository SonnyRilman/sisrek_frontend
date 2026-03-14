import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowRight, Star, MapPin, Info, Target, Compass, Users, Loader2, ShieldCheck, Activity, RefreshCw, ChevronDown } from 'lucide-react'

export default function Rekomendasi() {
  const [recommendations, setRecommendations] = useState([])
  const [acuan, setAcuan] = useState(null)
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [health, setHealth] = useState(null)
  const [k, setK] = useState(3)
  const [allWisata, setAllWisata] = useState([])
  const [showAcuanPicker, setShowAcuanPicker] = useState(false)

  const fetchRecommendations = useCallback(async (targetId, topK) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/rekomendasi?id=${targetId}&k=${topK}`)
      const data = await response.json()
      if (data.results) {
        setRecommendations(data.results)
        setAcuan(data.acuan)
        setMetrics(data.metrics)
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const initialLoad = useCallback(async () => {
    // Fetch all wisata for the picker
    try {
      const res = await fetch('http://localhost:5000/api/wisata')
      const data = await res.json()
      setAllWisata(data)
    } catch (e) {}

    const selectedId = localStorage.getItem('selectedWisataId') || 1
    fetchRecommendations(selectedId, k)

    try {
      const resH = await fetch(`http://localhost:5000/api/health`)
      const dataH = await resH.json()
      setHealth(dataH)
    } catch (e) {}
  }, [k, fetchRecommendations])

  useEffect(() => {
    initialLoad()
  }, []) // Mount only

  const handleKChange = (newK) => {
    setK(newK)
    const selectedId = localStorage.getItem('selectedWisataId') || 1
    fetchRecommendations(selectedId, newK)
  }

  const handleSelectAcuan = (id) => {
    localStorage.setItem('selectedWisataId', id)
    setShowAcuanPicker(false)
    fetchRecommendations(id, k)
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-200"
          >
            <Zap size={32} className="fill-white" />
          </motion.div>
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-widest uppercase mb-0.5">
              <span>Hybrid Recommender</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Rekomendasi Cerdas</h1>
            <p className="text-slate-500 text-sm font-medium opacity-80 italic">Optimasi algoritma untuk perjalanan Anda.</p>
          </div>
        </div>
      </header>

      {/* Main Reference & Controls */}
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
                src={acuan?.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"} 
                className="w-full h-full object-cover" 
                alt="acuan" 
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white p-2.5 rounded-2xl shadow-xl border-4 border-white">
              <Target size={22} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10 space-y-4">
            <div className="relative inline-block text-left">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 px-1">Wisata Acuan Utama</p>
              <button 
                onClick={() => setShowAcuanPicker(!showAcuanPicker)}
                className="flex items-center gap-3 text-4xl font-black text-slate-800 tracking-tight hover:text-emerald-700 transition-colors"
                title="Klik untuk ganti acuan"
              >
                {acuan?.name || 'Memuat...'}
                <ChevronDown size={28} className="mt-2 text-slate-300" />
              </button>
              
              <AnimatePresence>
                {showAcuanPicker && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 mt-4 w-80 max-h-96 overflow-y-auto bg-white rounded-[32px] shadow-2xl border border-slate-100 p-4 custom-scrollbar"
                  >
                    <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-2">Pilih Destinasi Acuan</p>
                    {allWisata.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => handleSelectAcuan(w.id)}
                        className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${acuan?.id === w.id ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                         <div className={`w-2 h-2 rounded-full ${acuan?.id === w.id ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                         {w.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase bg-white/50 px-3 py-1.5 rounded-xl border border-white/60">
                <MapPin size={14} className="text-emerald-500" />
                <span>Kuala Kapuas</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                <Zap size={14} />
                <span>Hybrid Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-1.5 bg-slate-100 rounded-[28px] border border-slate-200 shadow-inner">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center py-1">Set Top Results</p>
            <div className="flex gap-1.5">
              {[3, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleKChange(val)}
                  className={`px-5 py-3 rounded-[20px] text-sm font-black transition-all transform active:scale-90 ${k === val ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800 hover:bg-white'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`glass-card p-8 border-white/80 flex flex-col justify-center gap-4 ${health?.healthy === false ? 'bg-rose-50/50' : ''}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Integrity</p>
            <div className={`w-3 h-3 rounded-full ${health?.healthy === false ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <div>
                   <h4 className="text-2xl font-black text-slate-800">{health ? (health.healthy ? 'HEALTHY' : 'ISSUE') : '---'}</h4>
                   <p className="text-[9px] text-slate-500 font-bold uppercase">Files Status</p>
                </div>
                <div className="text-right">
                   <p className="text-lg font-black text-slate-800">{health?.total_wisata || 0}</p>
                   <p className="text-[9px] text-slate-500 font-bold uppercase">Database</p>
                </div>
             </div>
             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '100%' }} 
                  className={`h-full ${health?.healthy === false ? 'bg-rose-400' : 'bg-emerald-400'}`}
                ></motion.div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 glass-card p-6 border-white/80 flex flex-wrap items-center justify-between gap-8 bg-slate-900 text-white"
        >
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white/10 rounded-xl">
               <ShieldCheck className="text-emerald-400" size={24} />
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Auto-Evaluation Results</p>
                <h4 className="text-lg font-bold">Real-time Performance Metrics</h4>
             </div>
          </div>

          <div className="flex gap-10">
            {[
              { label: 'Precision', val: metrics?.precision, icon: Target, color: 'text-emerald-400' },
              { label: 'Recall', val: metrics?.recall, icon: Activity, color: 'text-sky-400' },
              { label: 'F1-Score', val: metrics?.f1, icon: Zap, color: 'text-amber-400' },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-3">
                <m.icon size={18} className={m.color} />
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase">{m.label}</p>
                  <p className="text-xl font-black text-white leading-none">{loading ? '...' : m.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block h-10 w-px bg-white/10"></div>

          <div className="flex items-center gap-3 text-right">
             <p className="text-[9px] font-bold text-slate-400 uppercase">Method:<br/>Leave-One-Out (Top-{k})</p>
             <button onClick={() => fetchRecommendations(acuan?.id || 1, k)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
               <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
             </button>
          </div>
        </motion.div>
      </div>

      {/* Results Rendering */}
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Pilihan Teratas untuk Anda (Top {k})</h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Algoritma Optimal</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="animate-spin" size={48} />
            <p className="font-bold">Menghitung rekomendasi...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {recommendations.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card glass-card-hover group overflow-hidden border-white/60 p-0"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/50 flex items-center gap-1.5 shadow-lg">
                      <Zap size={12} className="text-white fill-white" />
                      <span className="text-[11px] font-black text-white uppercase tracking-tighter">Hybrid {item.score}</span>
                    </div>

                    <div className="absolute bottom-4 left-6 pr-4">
                      <p className="text-white text-lg font-bold drop-shadow-md leading-tight">{item.name}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Content</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">{item.breakdown?.content || '0%'}</span>
                          <div className="w-12 h-1 bg-emerald-200 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500" style={{ width: item.breakdown?.content }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Collaborative</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-700">{item.breakdown?.collaborative || '0%'}</span>
                          <div className="w-12 h-1 bg-sky-200 rounded-full overflow-hidden">
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

                    <div className="flex items-center justify-between pt-2 text-right">
                       <div className="flex flex-wrap gap-1">
                          {item.type.split(',').slice(0, 2).map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-[8px] font-black uppercase text-slate-500 rounded-md">
                              {t.trim()}
                            </span>
                          ))}
                       </div>
                      <button className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 hover:scale-110 active:scale-95 transition-all">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
