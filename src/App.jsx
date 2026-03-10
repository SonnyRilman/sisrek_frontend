import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Beranda from './pages/Beranda'
import DaftarWisata from './pages/DaftarWisata'
import Rekomendasi from './pages/Rekomendasi'
import Statistik from './pages/Statistik'
import TentangSistem from './pages/TentangSistem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Beranda />} />
          <Route path="daftar-wisata" element={<DaftarWisata />} />
          <Route path="rekomendasi" element={<Rekomendasi />} />
          <Route path="statistik" element={<Statistik />} />
          <Route path="tentang" element={<TentangSistem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
