import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, Search, CheckCircle2, SlidersHorizontal, Grid, List, Map as MapIcon } from 'lucide-react'

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
  const [sortBy, setSortBy] = useState('Default')

  const categories = ['Semua', 'Alam', 'Budaya', 'Religi', 'Kuliner', 'Taman']

  const filteredDestinations = tourismData
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'Semua' || item.type === activeCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'Rating') return b.rating - a.rating
      if (sortBy === 'Nama') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-widest uppercase">
            <MapIcon size={12} />
            <span>Destinasi Kapuas • {filteredDestinations.length} Lokasi</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Katalog Wisata</h1>
          <p className="text-slate-500 text-sm font-medium">Temukan inspirasi perjalanan Anda.</p>
        </div>
        <div className="flex p-1 bg-white shadow-sm border border-slate-100 rounded-xl">
          <button className="p-2 rounded-lg bg-slate-50 text-emerald-600 shadow-inner">
            <Grid size={18} />
          </button>
          <button className="p-2 rounded-lg text-slate-300 hover:text-slate-400">
            <List size={18} />
          </button>
        </div>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            </div>
            <input
              type="text"
              placeholder="Cari destinasi..."
              className="w-full bg-white pl-12 pr-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-semibold text-slate-700 placeholder:text-slate-300 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm font-black text-slate-600 text-[10px] uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-emerald-50 appearance-none min-w-[140px] text-center"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Default">URUTKAN</option>
              <option value="Rating">RATING TERTINGGI</option>
              <option value="Nama">NAMA (A-Z)</option>
            </select>
            <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center gap-2 font-black text-slate-600 text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all ${activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100'
                : 'bg-white text-slate-400 border border-slate-50 hover:border-emerald-100 hover:text-emerald-600 hover:shadow-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedId(item.id)}
              className={`group relative bg-white rounded-[2.5rem] overflow-hidden border-2 cursor-pointer transition-all duration-500
                ${selectedId === item.id
                  ? 'border-emerald-500 shadow-2xl shadow-emerald-200/40 ring-8 ring-emerald-50'
                  : 'border-transparent shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-emerald-100/50 hover:border-emerald-200'
                }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-emerald-600 border border-white/50 shadow-xl self-start">
                    {item.type}
                  </span>
                  {item.rating >= 4.8 && (
                    <span className="bg-amber-500/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest text-white border border-amber-400/50 shadow-lg flex items-center gap-1.5">
                      <Star size={10} fill="currentColor" /> Top Choice
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {selectedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-600/20 backdrop-blur-[2px] flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-white p-5 rounded-full shadow-2xl border-4 border-emerald-50"
                      >
                        <CheckCircle2 size={40} className="text-emerald-600" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-7">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-black text-slate-800 leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-1.5 bg-amber-50 text-amber-500 px-2.5 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] mb-6 uppercase tracking-widest">
                  <MapPin size={14} className="text-emerald-500" />
                  <span>Kuala Kapuas</span>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                  <div>
                    <p className="text-[8px] uppercase font-black text-slate-300 tracking-widest mb-0.5">Tiket</p>
                    <p className="text-lg font-black text-slate-700">{item.price}</p>
                  </div>
                  <button
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                      ${selectedId === item.id
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-600 hover:text-white hover:shadow-md'
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center space-y-6 glass-card border-dashed border-2"
        >
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200 border-2 border-slate-100">
            <Search size={48} />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black text-slate-400 tracking-tight">Oops! Destinasi tidak ditemukan.</p>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">Coba gunakan kata kunci lain atau ubah filter kategori Anda.</p>
          </div>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }}
            className="text-emerald-600 font-black hover:text-emerald-700 transition-colors bg-emerald-50 px-8 py-3 rounded-xl border border-emerald-100"
          >
            Reset Semua Filter
          </button>
        </motion.div>
      )}
    </div>
  )
}
