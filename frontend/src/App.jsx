import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Beranda from './pages/Beranda/Beranda'
import DaftarWisata from './pages/DaftarWisata/DaftarWisata'
import Rekomendasi from './pages/Rekomendasi/Rekomendasi'
import Statistik from './pages/Statistik/Statistik'
import TentangSistem from './pages/TentangSistem/TentangSistem'
import Pengujian from './pages/Pengujian/Pengujian'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Beranda />} />
          <Route path="daftar-wisata" element={<DaftarWisata />} />
          <Route path="rekomendasi" element={<Rekomendasi />} />
          <Route path="statistik" element={<Statistik />} />
          <Route path="pengujian" element={<Pengujian />} />
          <Route path="tentang" element={<TentangSistem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
