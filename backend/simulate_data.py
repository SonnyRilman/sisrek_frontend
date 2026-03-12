import pandas as pd
import os
import random

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_WISATA_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data wisata.xlsx')
DATA_RATING_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data rating.xlsx')

def simulate():
    # 1. Get Wisata IDs
    df_w = pd.read_excel(DATA_WISATA_PATH)
    ids = df_w['tempat_id'].dropna().astype(int).tolist()
    
    # Simple Category Mapping
    nature_ids = df_w[df_w['Atribut'].str.contains('alam|sungai', case=False, na=False)]['tempat_id'].tolist()
    culture_ids = df_w[df_w['Atribut'].str.contains('budaya|sejarah', case=False, na=False)]['tempat_id'].tolist()
    
    # 2. Load Current Ratings
    df_r = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
    
    # 3. Create Simulation Users (Users with multiple ratings)
    new_data = []
    
    # Case A: 3 Users who LOVE Nature
    for i in range(1, 4):
        username = f"Traveler_Alam_{i}"
        # Pick 3-5 nature spots
        picked = random.sample(nature_ids, min(5, len(nature_ids)))
        for pid in picked:
            new_data.append({
                'Nama_akun': username,
                'Tempat_id': pid,
                'Rating': random.choice([4, 5]),
                'ulasan': 'Sangat asri dan menarik dikunjungi!'
            })
            
    # Case B: 3 Users who LOVE Culture
    for i in range(1, 4):
        username = f"Traveler_Budaya_{i}"
        picked = random.sample(culture_ids, min(4, len(culture_ids)))
        for pid in picked:
            new_data.append({
                'Nama_akun': username,
                'Tempat_id': pid,
                'Rating': random.choice([4, 5]),
                'ulasan': 'Nilai sejarahnya sangat tinggi.'
            })

    df_new = pd.DataFrame(new_data)
    
    # Merge with original (keep columns matching original)
    final_df = pd.concat([df_r, df_new], ignore_index=True)
    
    # Save back
    with pd.ExcelWriter(DATA_RATING_PATH, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
        final_df.to_excel(writer, sheet_name='Sheet2', index=False)
    
    print(f"Successfully added {len(new_data)} simulation ratings for {6} users.")

if __name__ == "__main__":
    simulate()
