import pandas as pd
import numpy as np

def calculate_hybrid_scores(target_id, df_wisata, df_ratings):
    """
    Logika utama algoritma Hybrid Recommender.
    Menghitung kemiripan berdasarkan konten (kategori) dan minat user (rating).
    """
    target_row = df_wisata[df_wisata['tempat_id'] == target_id]
    if target_row.empty:
        return []

    # Ambil atribut/tag dari destinasi acuan
    target_type = str(target_row.iloc[0].get('Atribut', ''))
    target_tags = set([t.strip().lower() for t in target_type.split(',') if t.strip()])
    
    # 1. Content-Based Scoring (Menggunakan Jaccard Similarity)
    content_scores = {}
    others = df_wisata[df_wisata['tempat_id'] != target_id]
    for _, row in others.iterrows():
        row_id = int(row['tempat_id'])
        row_tags = set([t.strip().lower() for t in str(row.get('Atribut', '')).split(',') if t.strip()])
        
        # Hitung irisan tag yang sama
        intersection = target_tags.intersection(row_tags)
        union = target_tags.union(row_tags)
        # Skor ideal antara 0 sampai 1
        content_scores[row_id] = len(intersection) / len(union) if union else 0

    # 2. Collaborative Scoring (Berdasarkan pola rating user lain)
    collab_scores = {int(row_id): 0.0 for row_id in content_scores.keys()}
    if df_ratings is not None:
        tid = int(target_id)
        
        # A. Cari user yang menyukai destinasi acuan ini
        users_who_liked = df_ratings[df_ratings['Tempat_id'] == tid]['Nama_akun'].unique()
        if len(users_who_liked) > 0:
            # Cari tempat lain yang juga disukai oleh user-user tersebut
            peers_ratings = df_ratings[(df_ratings['Nama_akun'].isin(users_who_liked)) & (df_ratings['Tempat_id'] != tid)]
            counts = peers_ratings['Tempat_id'].value_counts(normalize=True)
            for rid, score in counts.items():
                rid_int = int(rid)
                if rid_int in collab_scores: 
                    collab_scores[rid_int] = float(score) * 0.8
        
        # B. Fallback: Tambahkan faktor popularitas umum (30%)
        pop_counts = df_ratings['Tempat_id'].value_counts(normalize=True)
        for rid, pop in pop_counts.items():
            rid_int = int(rid)
            if rid_int in collab_scores:
                collab_scores[rid_int] += float(pop) * 0.3

        # Normalisasi skor agar tidak terlalu kecil saat ditampilkan di grafik
        active_vals = [v for v in collab_scores.values() if v > 0]
        if active_vals:
            max_c = max(active_vals)
            for rid in collab_scores:
                if collab_scores[rid] > 0:
                    collab_scores[rid] = 0.15 + (collab_scores[rid] / max_c) * 0.8

    # 3. Penggabungan Hybrid (Bobot: 60% Konten, 40% Rating User)
    final_results = []
    for rid in content_scores.keys():
        c_val = content_scores[rid]
        cf_val = collab_scores[rid]
        
        # Rumus bobot akhir
        score = (c_val * 0.6) + (cf_val * 0.4)
        
        final_results.append({
            "rid": rid,
            "final_score": score,
            "content_p": c_val,
            "collab_p": cf_val
        })
        
    return final_results
