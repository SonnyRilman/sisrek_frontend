from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

def calculate_hybrid_scores(target_id, df_wisata, df_ratings):
    """
    Menghitung skor hybrid menggunakan CBF (TF-IDF) dan CF (Item-based).
    """
    if df_wisata.empty:
        return []

    # --- 1. CONTENT-BASED FILTERING (CBF) ---
    # Ambil kolom combined_features dan jalankan TF-IDF
    tfidf = TfidfVectorizer(stop_words=None) # Stop words disesuaikan jika perlu
    tfidf_matrix = tfidf.fit_transform(df_wisata['combined_features'].fillna(''))
    
    # Hitung cosine similarity antar semua destinasi
    content_sim_matrix = cosine_similarity(tfidf_matrix)
    
    # Cari index baris untuk destinasi acuan
    try:
        target_idx = df_wisata[df_wisata['tempat_id'] == target_id].index[0]
        # Kita butuh index posisi (0, 1, 2...) bukan label index
        target_pos = df_wisata.index.get_loc(target_idx)
    except (IndexError, KeyError):
        return []

    # Skor CBF adalah baris simetri untuk target_id
    cbf_scores_array = content_sim_matrix[target_pos]

    # --- 2. COLLABORATIVE FILTERING (CF) ---
    # Bangun matriks user-item (Nama_akun x Tempat_id)
    user_item_matrix = df_ratings.pivot_table(index='Nama_akun', columns='Tempat_id', values='Rating').fillna(0)
    
    # Pastikan semua tempat_id dari df_wisata masuk ke kolom (meskipun tidak ada di rating)
    all_place_ids = df_wisata['tempat_id'].unique()
    for pid in all_place_ids:
        if pid not in user_item_matrix.columns:
            user_item_matrix[pid] = 0.0
            
    # Urutkan kolom agar sesuai urutan index jika perlu
    user_item_matrix = user_item_matrix.reindex(columns=sorted(user_item_matrix.columns))
    
    # Hitung cosine similarity antar kolom (item)
    # Transpose agar item jadi baris untuk dihitung similarity-nya
    item_sim_matrix = cosine_similarity(user_item_matrix.T)
    item_sim_df = pd.DataFrame(item_sim_matrix, index=user_item_matrix.columns, columns=user_item_matrix.columns)
    
    # Cari user-user yang pernah menilai wisata acuan
    users_who_rated_target = df_ratings[df_ratings['Tempat_id'] == target_id]['Nama_akun'].unique()
    
    cf_scores_final = {}
    
    if len(users_who_rated_target) > 0:
        # Prediksi rating untuk destinasi lain berdasarkan pola user-user tersebut
        for pid in all_place_ids:
            if pid == target_id:
                cf_scores_final[pid] = 0
                continue
            
            user_predictions = []
            for user in users_who_rated_target:
                actual_r = user_item_matrix.loc[user, pid]
                if actual_r > 0:
                    user_predictions.append(actual_r)
                else:
                    # Prediksi: Weighted Average Similarity * Rating
                    sims = item_sim_df[pid]
                    ratings = user_item_matrix.loc[user]
                    
                    # Hanya gunakan item yang sudah diberi rating oleh user ini
                    rated_mask = ratings > 0
                    if rated_mask.any():
                        num = np.dot(sims[rated_mask], ratings[rated_mask])
                        den = sims[rated_mask].sum()
                        if den > 0:
                            user_predictions.append(num / den)
            
            if user_predictions:
                cf_scores_final[pid] = np.mean(user_predictions)
            else:
                cf_scores_final[pid] = 0
    else:
        # Cold start: tidak ada user yang menilai wisata acuan
        cf_scores_final = {pid: 0 for pid in all_place_ids}

    # Normalisasi CF ke rentang 0-1
    cf_list = [cf_scores_final.get(pid, 0) for pid in all_place_ids]
    r_min, r_max = min(cf_list), max(cf_list)
    
    if r_max > r_min:
        cf_norm = [(r - r_min) / (r_max - r_min) for r in cf_list]
    else:
        cf_norm = [0.0] * len(cf_list)
        
    cf_norm_dict = dict(zip(all_place_ids, cf_norm))

    # --- 3. HYBRID & SELECTION ---
    final_results = []
    for pos, (i, row) in enumerate(df_wisata.iterrows()):
        pid = int(row['tempat_id'])
        if pid == target_id: continue
        
        cbf_val = cbf_scores_array[pos]
        cf_norm_val = cf_norm_dict.get(pid, 0)
        
        # Rumus Hybrid
        if cf_norm_val > 0:
            hybrid_score = 0.5 * cbf_val + 0.5 * cf_norm_val
        else:
            hybrid_score = 1.0 * cbf_val # Cold-start
            
        final_results.append({
            "rid": pid,
            "final_score": float(hybrid_score),
            "content_p": float(cbf_val),
            "collab_p": float(cf_norm_val)
        })
        
    # Urutkan berdasarkan skor tertinggi
    final_results = sorted(final_results, key=lambda x: x['final_score'], reverse=True)
    
    return final_results
