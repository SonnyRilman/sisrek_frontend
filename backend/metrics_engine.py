import pandas as pd
import recommender_engine

def calculate_system_metrics(df_wisata, df_ratings, top_k=3):
    """
    Menghitung Precision@3, Recall@3, dan F1-Score berdasarkan Ground Truth Rating.
    Sesuai Skripsi Halaman 37-38.
    """
    if df_wisata is None or df_ratings is None:
        return None

    all_precision = []
    all_recall = []

    # Iterasi setiap tempat wisata sebagai destinasi acuan (Target d)
    for _, target_row in df_wisata.iterrows():
        target_id = int(target_row['Tempat_id'])
        
        # 1. Cari user yang pernah memberi rating pada destinasi acuan ini
        users_who_rated = df_ratings[df_ratings['Tempat_id'] == target_id]['Nama_akun'].unique()
        
        if len(users_who_rated) == 0:
            continue # Skip destinasi acuan yang tidak punya data rating (Cold Start acuan)
            
        # 2. Tentukan Ground Truth (G_d) 
        # Berdasarkan Skripsi hal 38: Destinasi lain yang diberi rating >= 4 oleh user yang sama
        ground_truth = set(
            df_ratings[
                (df_ratings['Nama_akun'].isin(users_who_rated)) & 
                (df_ratings['Tempat_id'] != target_id) & 
                (df_ratings['Rating'] >= 4)
            ]['Tempat_id'].unique()
        )
        
        if not ground_truth:
            continue # Skip jika tidak ada data pembanding untuk user tersebut
            
        # 3. Jalankan Hybrid Engine untuk mendapat Top-3 Rekomendasi
        scores_list = recommender_engine.calculate_hybrid_scores(target_id, df_wisata, df_ratings)
        top_n_ids = [item['rid'] for item in scores_list[:top_k]]
        
        # 4. Hitung Irisan (Hasil rekomendasi yang ada di Ground Truth)
        hits = [rid for rid in top_n_ids if rid in ground_truth]
        num_hits = len(hits)
        
        # 5. Hitung Precision@k (Hits / k)
        precision = num_hits / top_k
        
        # 6. Hitung Recall@k (Hits / Total Ground Truth)
        recall = num_hits / len(ground_truth)
        
        all_precision.append(precision)
        all_recall.append(recall)

    if not all_precision:
        return {
            "precision": "0.00",
            "recall": "0.00",
            "f1": "0.00",
            "status": "Insufficient Data"
        }

    # Rata-ratakan hasil dari seluruh iterasi destinasi
    avg_p = sum(all_precision) / len(all_precision)
    avg_r = sum(all_recall) / len(all_recall)
    
    # F1-Score (Harmonic Mean)
    f1 = (2 * avg_p * avg_r) / (avg_p + avg_r) if (avg_p + avg_r) > 0 else 0.0
    
    return {
        "precision": f"{avg_p:.2f}",
        "recall": f"{avg_r:.2f}",
        "f1": f"{f1:.2f}"
    }
