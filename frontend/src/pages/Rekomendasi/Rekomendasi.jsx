import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2, Info, MapPin, Compass, Award, Sparkles, Hash, Zap, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Rekomendasi() {
  const [targetId, setTargetId] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState(0)
  const navigate = useNavigate()

  const loadingMessages = [
    "Menginisialisasi Discovery Engine...",
    "Memindai Atribut Wisata (Content-Based)...",
    "Menganalisis Pola Minat User (Collaborative)...",
    "Sinkronisasi Skor Hybrid Terpadu..."
  ]

  useEffect(() => {
    const savedId = localStorage.getItem('selectedWisataId')
    if (savedId) setTargetId(parseInt(savedId))
  }, [])

  useEffect(() => {
    if (!targetId) return
    const fetchRekomendasi = async () => {
      setLoading(true)
      setLoadingStep(0)
      
      // Timer untuk simulasi pesan loading
      const msgInterval = setInterval(() => {
        setLoadingStep(prev => (prev < 3 ? prev + 1 : prev))
      }, 600)

      try {
        const response = await fetch(`http://localhost:5000/api/rekomendasi?id=${targetId}&k=3`)
        const result = await response.json()
        
        // Tambahkan artificial delay minimal 2.5 detik agar user merasa sistem "berpikir"
        setTimeout(() => {
          setData(result)
          setLoading(false)
          clearInterval(msgInterval)
        }, 2500)

      } catch (error) {
        console.error("Error fetching recommendation:", error)
        setLoading(false)
        clearInterval(msgInterval)
      }
    }
    fetchRekomendasi()
  }, [targetId])

  if (!targetId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 bg-[#fcfdfe]">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-pulse">
          <Compass size={48} />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Belum Ada Acuan</h3>
          <p className="text-slate-400 font-medium max-w-sm">Pilih destinasi di daftar wisata terlebih dahulu untuk memulai analisis rekomendasi kami.</p>
        </div>
        <button 
          onClick={() => navigate('/daftar-wisata')}
          className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all hover:bg-emerald-600"
        >
          Lihat Daftar Wisata
        </button>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#fcfdfe] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-100 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-sky-100 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12 text-center">
          {/* Main Loader Core */}
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-[10px] border-slate-50 border-t-emerald-500 border-r-emerald-500/20"
            />
            {/* Icon removed as per user request */}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] animate-pulse">Sistem Rekomendasi Terpadu</span>
              <div className="h-0.5 w-12 bg-emerald-100 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(loadingStep + 1) * 25}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-slate-800 font-bold text-lg tracking-tight h-8"
              >
                {loadingMessages[loadingStep]}
              </motion.p>
            </AnimatePresence>
            
            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest pt-2">
               Mohon Tunggu • Kapuas Hulu Intelligence
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-outfit">
      
      {/* 1. Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <button 
          onClick={() => navigate('/daftar-wisata')}
          className="group flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all font-black text-[10px] uppercase tracking-widest"
        >
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:border-emerald-200">
            <ArrowLeft size={16} />
          </div>
          Kembali ke Galeri
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Main Reference Card (7 Columns) */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-12">
          
          {/* Cinematic Hero */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[500px] md:h-[600px] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group"
          >
            <img
              src={data.acuan.image || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200`}
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] transition-transform duration-[3000ms] group-hover:scale-105"
              alt={data.acuan.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-12 md:p-16 space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-500/90 backdrop-blur-xl rounded-2xl border border-white/20">
                <Hash size={14} className="text-white" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Wisata Acuan Utama</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                {data.acuan.name}
              </h2>
              <div className="flex items-center gap-4 text-emerald-400">
                <MapPin size={16} />
                <span className="font-bold tracking-tight text-lg text-white/80">Kapuas Hulu, Kalimantan Barat</span>
              </div>
            </div>
          </motion.section>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {[
              { label: 'Kategori Wisata', value: data.acuan.kategori || 'Alam & Petualangan', icon: Compass, color: 'text-sky-500' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/10 flex items-start gap-6 max-w-2xl"
              >
                <div className={`p-4 rounded-2.5xl bg-emerald-50 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-lg font-black text-slate-800 tracking-tight leading-tight">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Hybrid Analysis (5 Columns) */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-8">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase flex items-center gap-3">
               Destinasi Terkait
            </h3>
            <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest">K=3 Top Match</span>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {(data.results || []).map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                  className="relative group bg-white p-6 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 hover:border-emerald-300 transition-all duration-500 overflow-hidden"
                >
                  <div className="flex items-center gap-6 relative z-10">
                    {/* Small Visual */}
                    <div className="shrink-0 w-24 h-24 rounded-[2rem] overflow-hidden shadow-lg border-4 border-slate-50">
                      <img 
                        src={rec.image || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300`} 
                        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700" 
                        alt={rec.name} 
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Rekomendasi #{i+1}</span>
                         <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest border-r border-emerald-200 pr-2">Hybrid Score</span>
                            <span className="text-[10px] font-black text-emerald-700">{rec.score}</span>
                         </div>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase group-hover:text-emerald-600 transition-colors">
                         {rec.name}
                      </h4>
                      {/* Hybrid Breakdown Visualization */}
                      <div className="pt-4 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                             <span>Kesamaan Atribut</span>
                             <span className="text-emerald-500">{rec.breakdown?.content || '0%'}</span>
                          </div>
                          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: rec.breakdown?.content || '0%' }}
                               className="h-full bg-emerald-400"
                             />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                             <span>Pola Minat User</span>
                             <span className="text-sky-500">{rec.breakdown?.collaborative || '0%'}</span>
                          </div>
                          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: rec.breakdown?.collaborative || '0%' }}
                               className="h-full bg-sky-400"
                             />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        {/* Button removed as per user request */}
                      </div>
                    </div>
                  </div>

                  {/* AI Insight Snippet */}
                  <div className="mt-6 pt-6 border-t border-slate-50">
                     <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic pl-2 border-l-2 border-emerald-500/20">
                        "{rec.reason || 'Memiliki karakteristik geografis dan aktivitas yang sangat serupa dengan pilihan utama Anda.'}"
                     </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Evaluation System Card (Fase Evaluasi Skripsi) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 space-y-8"
          >
             <div className="space-y-2">
                <div className="flex items-center gap-3 text-emerald-600">
                   <Target size={20} className="animate-pulse" />
                   <h4 className="font-black text-sm tracking-widest uppercase">Evaluasi Akurasi</h4>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                   Metrik Performa <span className="text-slate-900">Top-{data.metrics?.k || 3}</span> Recommendation
                </p>
             </div>

             <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'P', value: data.metrics?.precision || '0.00', sub: 'Precision' },
                  { label: 'R', value: data.metrics?.recall || '0.00', sub: 'Recall' },
                  { label: 'F1', value: data.metrics?.f1 || '0.00', sub: 'F1-Score' }
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-300 uppercase mb-1">{m.sub}</span>
                    <span className="text-lg font-black text-slate-900 tracking-tighter">{m.value}</span>
                  </div>
                ))}
             </div>

             <div className="pt-2 border-t border-slate-50 font-medium text-[9px] text-slate-400 italic leading-relaxed text-center">
                *Metrik dievaluasi berdasarkan kesesuaian hasil terhadap ground truth per user.
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ArrowRight({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  )
}
