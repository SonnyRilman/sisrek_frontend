import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { 
  Loader2, 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Info, 
  Map, 
  Star, 
  Layers 
} from 'lucide-react'

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend
)

export default function Statistik() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/statistik')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching statistics:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStatistik()
  }, [])

  if (loading || !data) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-emerald-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BarChart3 className="text-emerald-500 animate-pulse" size={24} />
          </div>
        </div>
        <p className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400">Menyusun Laporan...</p>
      </div>
    )
  }

  const ratingBarData = {
    labels: data.chart_rating.labels,
    datasets: [{
      label: 'Jumlah Destinasi',
      data: data.chart_rating.values,
      backgroundColor: '#10b981',
      borderRadius: 12,
      hoverBackgroundColor: '#059669',
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 12,
        displayColors: false
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: '#f1f5f9', drawBorder: false },
        ticks: { font: { size: 10, weight: '600' }, color: '#94a3b8' }
      },
      x: { 
        grid: { display: false },
        ticks: { font: { size: 10, weight: '600' }, color: '#94a3b8' }
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="space-y-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-emerald-600 mb-1"
        >
          <div className="w-10 h-1 bg-emerald-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Data Intelligence</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Statistik <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">Wisata</span>
        </motion.h1>
      </div>

      {/* SUMMARY CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Destinasi', value: data.summary.total_destinasi, icon: Map, color: 'emerald' },
          { label: 'Rating Rata-rata', value: `${data.summary.avg_rating} / 5.0`, icon: Star, color: 'amber' },
          { label: 'Kategori Unik', value: data.chart_kategori?.labels?.length || 0, icon: Layers, color: 'sky' }
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500`}>
              <item.icon size={80} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* MAIN DATA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: RATING DISTRIBUTION (7 COLUMNS) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/30 flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Analisis Distribusi Rating</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Sebaran skor kepuasan pengunjung</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
          </div>

          <div className="flex-1 min-h-[350px]">
            <Bar data={ratingBarData} options={chartOptions} />
          </div>
        </motion.div>

        {/* RIGHT: TOP PERFORMERS (4 COLUMNS) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-10">
              <h3 className="text-xl font-black tracking-tight uppercase">Top Performers</h3>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Destinasi dengan respon terbaik</p>
            </div>

            <div className="space-y-6 flex-1">
              {(data.top_performers || []).map((item, i) => (
                <motion.div 
                  key={item.name} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center justify-between p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black opacity-30">0{i+1}</span>
                    <p className="font-bold text-xs uppercase tracking-tight text-slate-200 truncate max-w-[150px]">{item.name}</p>
                  </div>
                  <span className="text-emerald-400 font-black text-sm">{item.score}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white/5 rounded-[2rem] border border-white/5">
               <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">
                 *Berdasarkan akumulasi rating rata-rata dari seluruh ulasan pengguna terverifikasi.
               </p>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: CATEGORY BREAKDOWN (FULL WIDTH) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-12 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/20"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center">
              <Layers size={24} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Kategorisasi Sektor Wisata</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Persentase distribusi per kelompok atribut</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(data.chart_kategori?.labels || []).map((label, i) => {
              const val = data.chart_kategori.values[i];
              const percentage = Math.round((val / data.summary.total_destinasi) * 100);
              return (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{label}</span>
                    <span className="text-[10px] font-black text-emerald-500">{val} Unit</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
