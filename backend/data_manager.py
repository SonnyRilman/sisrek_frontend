import pandas as pd  # type: ignore
import os

# Lokasi folder data di dalam folder backend
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FOLDER = os.path.join(BACKEND_DIR, 'data')

DATA_WISATA_PATH = os.path.join(DATA_FOLDER, 'data wisata.xlsx')
DATA_RATING_PATH = os.path.join(DATA_FOLDER, 'data rating.xlsx')

# Cache untuk menyimpan data sementara supaya tidak baca file terus-menerus
_cache = {
    "wisata": None,
    "ratings": None
}

def load_wisata():
    """Mengambil data destinasi wisata dan membersihkannya."""
    if _cache["wisata"] is not None:
        return _cache["wisata"]
    
    if os.path.exists(DATA_WISATA_PATH):
        try:
            df = pd.read_excel(DATA_WISATA_PATH)
            
            # Bersihkan kolom tempat_id dari nilai NaN dan ubah ke integer
            df['tempat_id'] = pd.to_numeric(df['tempat_id'], errors='coerce')
            df = df.dropna(subset=['tempat_id'])
            df['tempat_id'] = df['tempat_id'].astype(int)
            
            # Isi semua sel kosong dengan string kosong
            df = df.fillna('')
            
            # Buat kolom baru combined_features yang isinya sama dengan kolom Atribut
            df['combined_features'] = df['Atribut'].astype(str)
            
            _cache["wisata"] = df
            print(f"DEBUG: Berhasil memuat {len(df)} data wisata")
            return df
        except Exception as e:
            print(f"Error saat baca file wisata: {e}")
            return None
    return None

def load_ratings():
    """Mengambil data rating dari Excel Sheet2 dengan pembersihan khusus."""
    if _cache["ratings"] is not None:
        return _cache["ratings"]
        
    if os.path.exists(DATA_RATING_PATH):
        try:
            # Baca data rating dari Sheet2
            df = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
            
            # Forward fill pada kolom Nama_akun
            df['Nama_akun'] = df['Nama_akun'].ffill()
            
            # Hapus baris yang kolom Tempat_id atau Rating-nya masih kosong
            df = df.dropna(subset=['Tempat_id', 'Rating'])
            
            # Ubah Tempat_id ke integer dan pastikan Rating bertipe numerik 1–5
            df['Tempat_id'] = pd.to_numeric(df['Tempat_id'], errors='coerce').fillna(0).astype(int)
            df['Rating'] = pd.to_numeric(df['Rating'], errors='coerce')
            
            # Filter baris yang Tempat_id-nya 0 (karena error coerce tadi)
            df = df[df['Tempat_id'] > 0]
            
            # Pastikan rating berada di rentang 1-5
            df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]
            
            _cache["ratings"] = df
            print(f"DEBUG: Berhasil memuat {len(df)} data rating")
            return df
        except Exception as e:
            print(f"Error saat baca file rating: {e}")
            return None
    return None

def clear_cache():
    """Hapus cache jika data perlu diperbarui (reload)."""
    _cache["wisata"] = None
    _cache["ratings"] = None
