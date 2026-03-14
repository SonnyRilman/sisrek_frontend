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
            
            # Pastikan ID tempat adalah angka dan hapus yang kosong
            df['tempat_id'] = pd.to_numeric(df['tempat_id'], errors='coerce')
            df = df.dropna(subset=['tempat_id'])
            df['tempat_id'] = df['tempat_id'].astype(int)
            
            # Isi kolom yang kosong dengan teks kosong
            df = df.fillna('')
            
            # Bersihkan spasi di nama dan atribut
            text_cols = ['Nama Wisata', 'Atribut']
            for col in text_cols:
                if col in df.columns:
                    df[col] = df[col].astype(str).str.strip()
            
            _cache["wisata"] = df
            print(f"DEBUG: Berhasil memuat {len(df)} data wisata")
            return df
        except Exception as e:
            print(f"Error saat baca file wisata: {e}")
            return None
    return None

def load_ratings():
    """Mengambil data rating dari Excel Sheet2."""
    if _cache["ratings"] is not None:
        return _cache["ratings"]
        
    if os.path.exists(DATA_RATING_PATH):
        try:
            # Baca data rating dari Sheet2 sesuai struktur file
            df = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
            
            # Validasi ID Tempat dan Akun
            df['Tempat_id'] = pd.to_numeric(df['Tempat_id'], errors='coerce')
            df = df.dropna(subset=['Nama_akun', 'Tempat_id'])
            df['Tempat_id'] = df['Tempat_id'].astype(int)
            
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
