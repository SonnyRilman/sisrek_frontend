import React from 'react'
import { motion } from 'framer-motion'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const barData = {
  labels: ['Taman', 'Budaya', 'Alam', 'Religi', 'Kuliner'],
  datasets: [
    {
      label: 'Jumlah Wisata',
      data: [12, 19, 15, 8, 10],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      hoverBackgroundColor: '#10b981',
      borderRadius: 12,
      borderSkipped: false,
    },
  ],
}

const pieData = {
  labels: ['Bintang 5', 'Bintang 4', 'Bintang 3', 'Bintang 2', 'Bintang 1'],
  datasets: [
    {
      data: [45, 30, 15, 7, 3],
      backgroundColor: [
        '#10b981',
        '#8b5cf6',
        '#0ea5e9',
        '#10b981',
        '#f43f5e',
      ],
      borderWidth: 8,
      borderColor: '#ffffff',
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
        font: { family: 'Outfit', size: 12, weight: 'bold' },
        padding: 20
      }
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleFont: { family: 'Outfit', size: 14 },
      bodyFont: { family: 'Outfit', size: 12 },
      padding: 12,
      cornerRadius: 12,
      displayColors: false
    }
  },
  scales: {
    y: {
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 11, weight: 'bold' } }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { family: 'Outfit', size: 11, weight: 'bold' } }
    },
  }
}

export default function Statistik() {
  return (
    <div className="space-y-10 pb-16">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Data Visual Wisata</h1>
        <p className="text-slate-500 mt-2 font-medium">Analisis sebaran dan popularitas destinasi di Kapuas.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Kategori Terpopuler</h3>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-black">2026</div>
          </div>
          <div className="h-80">
            <Bar data={barData} options={options} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Rating Destinasi</h3>
            <div className="bg-amber-50 text-amber-500 px-3 py-1 rounded-full text-xs font-black">Average 4.8</div>
          </div>
          <div className="h-80 relative flex items-center justify-center">
            <Pie data={pieData} options={{ ...options, scales: undefined }} />
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
        <h3 className="text-2xl font-bold text-slate-800 mb-8">Top Performa Bulan Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Taman Raja Bunis', count: '2,4k kunjungan', trend: '+12%', color: 'from-emerald-500 to-emerald-600' },
            { name: 'Huma Betang', count: '1,9k kunjungan', trend: '+8%', color: 'from-sky-400 to-sky-500' },
            { name: 'Sungai Kapuas', count: '1,5k kunjungan', trend: '+15%', color: 'from-amber-400 to-amber-500' },
          ].map((item, i) => (
            <div key={item.name} className="group p-8 rounded-[32px] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-emerald-50 duration-500">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                {i + 1}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h4>
              <p className="text-slate-400 font-medium mb-4">{item.count}</p>
              <div className="inline-flex items-center gap-1.5 py-1 px-3 bg-green-50 text-green-600 rounded-full text-xs font-black italic">
                {item.trend} Growth
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
