import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Search, CheckCircle2, SlidersHorizontal, Grid, List } from 'lucide-react'

const tourismData = [
  { id: 1, name: 'Taman Raja Bunis', rating: 4.8, type: 'Alam', price: 'Gratis', image: '/images/taman.png' },
  { id: 2, name: 'Huma Betang', rating: 4.9, type: 'Budaya', price: 'Rp 10k', image: '/images/huma.png' },
  { id: 3, name: 'Sungai Kapuas Keramat', rating: 4.7, type: 'Religi', price: 'Rp 5k', image: '/images/hero.png' },
  { id: 4, name: 'Pasar Terapung Kapuas', rating: 4.6, type: 'Kuliner', price: 'Gratis', image: '/images/taman.png' },
  { id: 5, name: 'Monumen Sejarah', rating: 4.5, type: 'Sejarah', price: 'Gratis', image: '/images/huma.png' },
  { id: 6, name: 'Hutan Pinus Kapuas', rating: 4.8, type: 'Alam', price: 'Rp 15k', image: '/images/hero.png' },
]

export default function DaftarWisata() {
  const [selectedId, setSelectedId] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  const categories = ['Semua', 'Alam', 'Budaya', 'Religi', 'Kuliner', 'Taman']

  const filteredDestinations = tourismData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'Semua' || item.type === activeCategory)
  )

  return (
    <div className="space-y-10 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Katalog Destinasi</h1>
          <p className="text-slate-500 mt-2 font-medium">Temukan dan pilih destinasi sebagai acuan rekomendasi Anda.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-emerald-600 transition-colors">
            <Grid size={20} />
          </button>
          <button className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-300">
            <List size={20} />
          </button>
        </div>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Cari destinasi wisata (mis: Taman Raja)..."
              className="w-full bg-white pl-14 pr-6 py-5 rounded-[24px] border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-medium text-slate-700 placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-8 py-5 bg-white border border-slate-200 rounded-[24px] shadow-sm flex items-center justify-center gap-2 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal size={20} />
            Filter
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 translate-y-[-2px]'
                : 'bg-white text-slate-500 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredDestinations.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedId(item.id)}
              className={`group relative bg-white rounded-[32px] overflow-hidden border cursor-pointer transition-all duration-500 transform
                ${selectedId === item.id
                  ? 'border-emerald-500 ring-4 ring-emerald-50 shadow-2xl shadow-emerald-100'
                  : 'border-slate-100 hover:border-emerald-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-50'
                }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-white/50 shadow-lg shadow-black/5">
                    {item.type}
                  </span>
                </div>

                {selectedId === item.id && (
                  <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-[2px] flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white p-4 rounded-full shadow-2xl"
                    >
                      <CheckCircle2 size={32} className="text-emerald-600" />
                    </motion.div>
                  </div>
                )}
              </div>

              <div className="p-7">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-500 px-2.5 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm mb-6">
                  <MapPin size={16} />
                  <span>Kabupaten Kapuas</span>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-300 tracking-tighter">Tiket Mulai</p>
                    <p className="font-bold text-slate-600">{item.price}</p>
                  </div>
                  <button
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all
                      ${selectedId === item.id
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                        : 'bg-slate-50 text-slate-600 hover:bg-emerald-600 hover:text-white'
                      }`}
                  >
                    {selectedId === item.id ? 'Terpilih' : 'Pilih Acuan'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDestinations.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <Search size={40} />
          </div>
          <p className="text-xl font-bold text-slate-400">Oops! Destinasi tidak ditemukan.</p>
          <button onClick={() => setSearchTerm('')} className="text-emerald-600 font-bold hover:underline">Reset Pencarian</button>
        </div>
      )}
    </div>
  )
}
