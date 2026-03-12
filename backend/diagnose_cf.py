import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_WISATA_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data wisata.xlsx')
DATA_RATING_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data rating.xlsx')

def inspect():
    print("--- WISATA ---")
    df_w = pd.read_excel(DATA_WISATA_PATH)
    w_ids = set(df_w['tempat_id'].dropna().astype(int))
    print(f"Total Wisata IDs: {len(w_ids)}")
    print(f"IDs: {sorted(list(w_ids))[:10]}...")

    print("\n--- RATINGS ---")
    df_r = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
    df_r['Tempat_id'] = pd.to_numeric(df_r['Tempat_id'], errors='coerce')
    df_r = df_r.dropna(subset=['Tempat_id'])
    r_ids = set(df_r['Tempat_id'].astype(int))
    print(f"Total Unique IDs in Ratings: {len(r_ids)}")
    
    intersect = w_ids.intersection(r_ids)
    print(f"IDs in both: {len(intersect)}")
    
    print("\nTop 5 Rated Places:")
    print(df_r['Tempat_id'].value_counts().head(5))
    
    print("\nUsers with multiple ratings:")
    user_counts = df_r['Nama_akun'].value_counts()
    print(user_counts.head(5))
    print(f"Users with >1 rating: {len(user_counts[user_counts > 1])}")

if __name__ == "__main__":
    inspect()
