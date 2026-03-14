import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ArrowRight, Loader2, MapPin, Compass, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DaftarWisata() {
  const [wisata, setWisata] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const navigate = useNavigate()

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = ['Semua', 'Alam', 'Budaya', 'Edukasi', 'Petualangan']

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/wisata')
        const data = await response.json()
        setWisata(data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWisata()
  }, [])

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCategory, sortBy])

  const filteredWisata = (wisata || [])
    .filter(w => {
      const matchSearch = (w.name || '').toLowerCase().includes((search || '').toLowerCase())
      const matchCategory = selectedCategory === 'Semua' || (w.kategori || '').includes(selectedCategory)
      return matchSearch && matchCategory
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return (a.name || '').localeCompare(b.name || '')
    })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredWisata.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWisata.length / itemsPerPage)

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6 text-emerald-500">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-outfit font-black text-[10px] uppercase tracking-[0.4em]">Sinkronisasi Data...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-outfit">
      
      {/* 1. Sleek Modern Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Sistem Rekomendasi</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                Jelajahi <span className="text-emerald-500 underline decoration-emerald-100 underline-offset-8">Kapuas</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm md:text-base max-w-lg leading-relaxed">
                Terdapat <span className="text-slate-900 font-black">{filteredWisata.length} destinasi</span> yang tersedia. Pilih satu untuk mendapatkan rekomendasi menggunakan metode <span className="text-slate-900 font-bold">Collaborative</span> & <span className="text-slate-900 font-bold">Content-Based Filtering</span>.
              </p>
            </div>

            {/* Sub-Filters: Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 shadow-xl' 
                    : 'bg-white text-slate-400 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        
        {/* 2. Concentrated Search Bar */}
        <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row gap-4 items-center mb-16">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Cari nama destinasi..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-0 font-bold text-slate-800 placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          
          <div className="flex items-center gap-3 w-full md:w-auto px-4">
             <Filter size={16} className="text-slate-400" />
             <select 
               className="bg-transparent border-none focus:ring-0 font-black text-[11px] uppercase tracking-widest text-slate-900 cursor-pointer pr-8"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
             >
               <option value="name">Urutan Alfabet</option>
               <option value="rating">Rating Tertinggi</option>
             </select>
          </div>
        </div>

        {/* 3. Refined Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {currentItems.map((item, i) => (
              <motion.div
                key={item.id || item.tempat_id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="group bg-white rounded-[3rem] p-4 border border-slate-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-[0_45px_100px_-30px_rgba(0,0,0,0.06)]"
              >
                {/* Image Plate */}
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden">
                  <img
                    src={item.image || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
                     <Star size={12} className="text-emerald-400 fill-emerald-400" />
                     <span className="text-white text-[10px] font-black">{item.rating || '0.0'}</span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="pt-6 pb-2 px-4 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2">
                     <MapPin size={10} className="text-emerald-500" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.kategori || 'Destinasi'}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight uppercase line-clamp-1 mb-6">
                    {item.name}
                  </h3>
                  
                  <button 
                    onClick={() => {
                       localStorage.setItem('selectedWisataId', item.id || item.tempat_id);
                       navigate('/rekomendasi');
                    }}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-emerald-500 shadow-xl shadow-slate-200 group/btn"
                  >
                    Dapatkan Rekomendasi
                    <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. Elegant Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-20">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-6 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Halaman</span>
               <span className="text-sm font-black text-slate-900">{currentPage}</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">dari {totalPages}</span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 disabled:opacity-20 transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
