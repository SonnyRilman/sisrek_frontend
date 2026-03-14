import React from 'react'
import { motion } from 'framer-motion'
import { 
  Info, 
  Cpu, 
  Database, 
  Target, 
  Zap, 
  Layers, 
  ChevronRight,
  Globe,
  Share2,
  ShieldCheck,
  Star,
  Map
} from 'lucide-react'

export default function TentangSistem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-6 py-20 space-y-24"
    >
      {/* CINEMATIC HEADER */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-600 mb-2"
        >
          <Zap size={14} className="fill-emerald-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Intelligence V2.0</span>
        </motion.div>
        
        <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">
          Arsitektur <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 italic">Sistem</span> Cerdas
        </h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed pt-2">
          Mengenal lebih dalam teknologi di balik sistem rekomendasi pariwisata Kapuas Hulu yang menggabungkan analisis data matematis dan perilaku pengguna.
        </p>
      </div>

      {/* SECTION 1: VISI & TUJUAN */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">
              Visi Eksplorasi <br/>Digital
            </h2>
            <div className="h-1.5 w-20 bg-emerald-500 rounded-full" />
          </div>
          
          <div className="space-y-6">
            {[
              { 
                title: "Latar Belakang", 
                desc: "Kebutuhan akan akses informasi wisata yang relevan di Jantung Kalimantan menjadi inspirasi utama pengembangan sistem ini.",
                icon: Globe
              },
              { 
                title: "Tujuan Sistem", 
                desc: "Menciptakan pengalaman personal bagi setiap wisatawan melalui kurasi destinasi yang akurat dan berbasis data.",
                icon: Target
              }
            ].map((item) => (
              <div key={item.title} className="flex gap-6 group">
                <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <item.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-100/50 rounded-[4rem] blur-3xl" />
          <div className="relative bg-white p-2 rounded-[3.5rem] shadow-2xl border border-slate-100 rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800"
              className="w-full h-[400px] object-cover rounded-[3rem]"
              alt="Nature Explorer"
            />
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: THE HYBRID LOGIC (COLORED SECTION) */}
      <motion.div 
        variants={itemVariants}
        className="bg-slate-950 p-12 md:p-20 rounded-[4rem] text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Cpu size={300} strokeWidth={1} />
        </div>

        <div className="relative z-10 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Engine Methodology</span>
              <h2 className="text-4xl font-black tracking-tight uppercase leading-none">Logika Perhitungan <br/> <span className="text-emerald-500">Hybrid Optimization</span></h2>
            </div>
            <p className="max-w-md text-slate-400 font-medium text-sm leading-relaxed">
              Sistem ini tidak hanya bekerja secara statis, melainkan melakukan kalkulasi perpaduan (Hybrid) antara karakteristik tempat dan perilaku sosial pengguna lain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                tag: "Content-Based", 
                title: "Analisis Atribut", 
                desc: "Ekstraksi data tekstual (Kategori & Fasilitas) menggunakan metode TF-IDF untuk mencari kemiripan geografis.",
                color: "emerald" 
              },
              { 
                tag: "Collaborative", 
                title: "Analisis Sosial", 
                desc: "Mempelajari pola rating antar pengguna untuk menemukan destinasi 'tersembunyi' yang sesuai selera Anda.",
                color: "sky" 
              },
              { 
                tag: "Combined Result", 
                title: "Hybrid Score", 
                desc: "Penggabungan kedua skor (0.5 CBF + 0.5 CF) untuk meminimalisir kelemahan dari masing-masing metode.",
                color: "rose" 
              }
            ].map((box) => (
              <div key={box.tag} className="group p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all duration-500 space-y-4">
                <span className={`text-[9px] font-black uppercase tracking-widest text-${box.color}-400`}>{box.tag}</span>
                <h4 className="text-xl font-black tracking-tight uppercase">{box.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{box.desc}</p>
                <div className="pt-4 flex items-center gap-2 text-white/40 text-[9px] font-black uppercase tracking-widest">
                   Learn More <ChevronRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: DATA ARCHITECTURE */}
      <motion.div variants={itemVariants} className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Variabel Data Input</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">Setiap baris data dalam kuesioner dan database diolah melalui parameter-parameter berikut untuk hasil yang presisi.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Identitas", val: "Nama Wisata", icon: Map },
            { label: "Kategori", val: "Atribut Wisata", icon: Layers },
            { label: "Lokasi", val: "Kabupaten", icon: Globe },
            { label: "Visual", val: "Media Gallery", icon: Share2 },
            { label: "Preferensi", val: "Rating User", icon: Star },
            { label: "Infrastruktur", val: "Fasilitas", icon: ShieldCheck },
            { label: "Koordinat", val: "GPS Mapping", icon: Target },
            { label: "Komputasi", val: "Skor Kemiripan", icon: Cpu }
          ].map((dataItem, i) => (
            <motion.div
              key={dataItem.val}
              whileHover={{ y: -5 }}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/10 flex flex-col items-center text-center gap-4 group"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 rounded-2xl flex items-center justify-center transition-colors">
                <dataItem.icon size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{dataItem.label}</p>
                <p className="font-bold text-slate-800 text-xs uppercase tracking-tight">{dataItem.val}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER CALLOUT */}
      <motion.div 
        variants={itemVariants}
        className="text-center py-10 bg-emerald-50 rounded-[4rem] border border-emerald-100/50"
      >
        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.5em] mb-4 text-center">Final Technical Overview</p>
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight text-center">Sistem Siap Untuk Evaluasi Akademik</h3>
      </motion.div>

    </motion.div>
  )
}
