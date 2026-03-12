import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { BarChart3, TrendingUp, Star, Users, MapPin, Compass } from 'lucide-react'
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
  LineElement,
  Filler,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

const trendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      fill: true,
      label: 'Pengunjung',
      data: [350, 420, 380, 500, 620, 580],
      borderColor: '#10b981',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        return gradient;
      },
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#10b981',
      pointBorderWidth: 2,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#64748b',
        usePointStyle: true,
        pointStyle: 'circle',
        font: { family: 'Outfit', size: 12, weight: '700' },
        padding: 30
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
      bodyFont: { family: 'Outfit', size: 12 },
      padding: 16,
      cornerRadius: 16,
      displayColors: true,
      usePointStyle: true,
      boxWidth: 8,
      boxHeight: 8,
    }
  },
  scales: {
    y: {
      grid: { color: 'rgba(241, 245, 249, 0.5)', drawBorder: false },
      ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 11, weight: '700' }, padding: 10 }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { family: 'Outfit', size: 11, weight: '700' }, padding: 10 }
    },
  }
}

export default function Statistik() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/statistik')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold">Menganalisis data wisata...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-widest uppercase">
            <BarChart3 size={12} />
            <span>Insight & Analitik</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Data Visual Wisata</h1>
          <p className="text-slate-500 text-sm font-medium">Laporan statistik performa destinasi secara real-time.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <button className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Monthly</button>
          <button className="px-4 py-1.5 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-slate-600">Yearly</button>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Wisatawan', value: '12,842', trend: '+12.5%', icon: Users, color: 'text-emerald-500' },
          { title: 'Destinasi Aktif', value: '48 Unit', trend: '+3 Unit', icon: MapPin, color: 'text-sky-500' },
          { title: 'Rating Global', value: '4.82', trend: 'Excellent', icon: Star, color: 'text-amber-500' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center gap-5 border-white/60"
          >
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner`}>
              <kpi.icon size={28} className={kpi.color} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{kpi.title}</p>
              <div className="flex items-end gap-2">
                <h4 className="text-2xl font-black text-slate-800 leading-none">{kpi.value}</h4>
                <span className="text-[10px] font-black text-emerald-600 mb-0.5">{kpi.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-8 border-white/60 h-full"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Tren Kunjungan</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Januari - Juni 2026</p>
              </div>
            </div>
          </div>
          <div className="h-72">
            <Line data={trendData} options={{ ...options, scales: { ...options.scales, x: { ...options.scales.x, grid: { display: true, color: 'rgba(0,0,0,0.02)' } } } }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 border-white/60"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
              <Star size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Kepuasan</h3>
          </div>
          <div className="h-64 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Rating Avg</p>
                <p className="text-3xl font-black text-slate-800 tracking-tighter leading-none">4.8</p>
              </div>
            </div>
            <Doughnut data={data?.pieData || { labels: [], datasets: [] }} options={{ ...options, plugins: { ...options.plugins, legend: { display: true, position: 'bottom', labels: { padding: 20, boxWidth: 6, usePointStyle: true } } } }} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-white/60">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Compass size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Populer Kategori</h3>
          </div>
          <div className="h-64">
            <Bar data={data?.barData || { labels: [], datasets: [] }} options={options} />
          </div>
        </div>

        <div className="glass-card p-8 border-white/60">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Kunjungan Teratas</h3>
            </div>
            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Full Report</button>
          </div>
          <div className="space-y-4">
            {(data?.topPerformers || []).map((item, i) => {
              // Convert "2.4k kunjungan" to a percentage for progress bar
              const val = Math.min(100, (parseInt(item.count.replace(/\D/g, '')) / 2500) * 100);
              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-slate-700">{item.name}</span>
                    <span className="text-xs font-bold text-slate-400">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
