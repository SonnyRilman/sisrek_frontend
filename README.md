# SRWK - Sistem Rekomendasi Wisata Kapuas

Sistem Rekomendasi Wisata Kapuas (SRWK) adalah platform inovatif yang dirancang untuk memajukan potensi pariwisata di Kabupaten Kapuas, Kalimantan Tengah. Aplikasi ini menggunakan teknologi **Hybrid Recommendation** (Content-Based & Collaborative Filtering) untuk memberikan saran destinasi yang akurat dan personal.

## Struktur Folder

Project ini dibagi menjadi dua bagian utama agar pengelolaan kode lebih rapi:

### **1. Backend (Python/Flask)**
Terletak di folder `/backend`, mengelola logika data dan algoritma:
- `app.py`: Titik masuk utama server API.
- `data_manager.py`: Mengelola pembacaan data dari Excel.
- `recommender_engine.py`: Inti algoritma rekomendasi.
- `metrics_engine.py`: Sistem pengujian performa.
- `data/`: Database Excel.

### **2. Frontend (React/Vite)**
Terletak di folder `/frontend`, mengelola antarmuka pengguna:
- `src/`: Berisi kode sumber aplikasi (Halaman, Komponen, Gaya).
- `public/`: Aset publik seperti gambar dan ikon.
- `vite.config.js`: Konfigurasi build sistem.

---

## Cara Menjalankan Sistem

### **1. Menjalankan Backend (Server API)**

Buka terminal di folder `backend`, lalu jalankan:
```bash
python app.py
```
*Server backend akan berjalan di: http://127.0.0.1:5000*

---

### **2. Menjalankan Frontend (Antarmuka)**

Buka terminal di folder `frontend`, lalu jalankan:
```bash
# Jalankan server pengembangan
npm run dev
```
*Akses aplikasi di: http://localhost:5173*

---

## Teknologi yang Digunakan

- **Backend**: Python, Flask, Pandas.
- **Frontend**: React.js, Vite, Tailwind CSS v4.
- **Library**: Framer Motion, Lucide React, Chart.js.

## Catatan Pengembang
- Data destinasi dan rating dikelola melalui file Excel di folder `backend/data/`.
- Perubahan pada algoritma dilakukan di `recommender_engine.py`.
- Struktur folder sudah modular untuk memudahkan pengembangan lebih lanjut.

© 2026 Tim Pengembang SRWK. Dikembangkan untuk kemajuan pariwisata Kabupaten Kapuas.
