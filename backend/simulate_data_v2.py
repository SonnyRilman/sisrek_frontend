import pandas as pd
import os
import random

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_WISATA_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data wisata.xlsx')
DATA_RATING_PATH = os.path.join(os.path.dirname(BASE_DIR), 'data rating.xlsx')

def simulate():
    df_w = pd.read_excel(DATA_WISATA_PATH)
    all_ids = df_w['tempat_id'].dropna().astype(int).tolist()
    
    # Categories
    nature_ids = df_w[df_w['Atribut'].str.contains('alam|sungai', case=False, na=False)]['tempat_id'].tolist()
    culture_ids = df_w[df_w['Atribut'].str.contains('budaya|sejarah', case=False, na=False)]['tempat_id'].tolist()
    
    df_r = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
    new_data = []
    
    # 10 consistent users to create "collaborative clusters"
    for i in range(1, 11):
        username = f"Traveler_Active_{i}"
        # Each user rates 8-12 places
        # Half consistent with a category, half random
        if i <= 5: # Nature lovers
            picked = random.sample(nature_ids, min(6, len(nature_ids))) + random.sample(all_ids, 4)
        else: # Culture lovers
            picked = random.sample(culture_ids, min(6, len(culture_ids))) + random.sample(all_ids, 4)
            
        for pid in set(picked):
            new_data.append({
                'Nama_akun': username,
                'Tempat_id': pid,
                'Rating': random.choice([4, 5]),
                'ulasan': 'Pengalaman yang sangat menyenangkan, direkomendasikan!'
            })

    df_new = pd.DataFrame(new_data)
    final_df = pd.concat([df_r, df_new], ignore_index=True)
    
    with pd.ExcelWriter(DATA_RATING_PATH, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
        final_df.to_excel(writer, sheet_name='Sheet2', index=False)
    
    print(f"Added {len(new_data)} more realistic ratings.")

if __name__ == "__main__":
    simulate()
