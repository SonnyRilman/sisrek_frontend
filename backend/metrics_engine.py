import pandas as pd  # type: ignore
import recommender_engine  # type: ignore

def calculate_system_metrics(df_wisata, df_ratings, top_k=3):
    """
    Menghitung metrik performa sistem (Precision, Recall, F1)
    Menggunakan metode evaluasi Leave-One-Out.
    """
    if df_wisata is None: return None

    all_precision = []
    all_recall = []

    # Iterasi setiap tempat wisata sebagai target simulasi
    for _, target_row in df_wisata.iterrows():
        target_id = int(target_row['tempat_id'])
        target_tags = set([t.strip().lower() for t in str(target_row['Atribut']).split(',') if t.strip()])
        
        # Jalankan mesin rekomendasi untuk simulasi
        scores_list = recommender_engine.calculate_hybrid_scores(target_id, df_wisata, df_ratings)
        sorted_scores = sorted(scores_list, key=lambda x: x['final_score'], reverse=True)
        top_n = sorted_scores[:top_k]  # type: ignore
        
        # Cek mana saja hasil yang relevan (punya kategori yang sama)
        relevance = []
        for item in top_n:
            matches = df_wisata[df_wisata['tempat_id'] == item['rid']]  # type: ignore
            if matches.empty: continue
            row_data = matches.iloc[0]
            item_tags = set([t.strip().lower() for t in str(row_data.get('Atribut', '')).split(',') if t.strip()])
            relevance.append(1 if target_tags.intersection(item_tags) else 0)
            
        # Hitung Precision @K (Berapa banyak yang benar dari Top K)
        precision = float(sum(relevance)) / top_k
        all_precision.append(float(precision))  # type: ignore
        
        # Hitung Recall @K (Berapa banyak yang ditemukan dibanding semua yang relevan di database)
        rel_others = []
        for _, r in df_wisata.iterrows():
            if int(r['tempat_id']) == target_id: continue
            r_attr = set([t.strip().lower() for t in str(r.get('Atribut', '')).split(',') if t.strip()])
            if target_tags.intersection(r_attr):
                rel_others.append(1)
            else:
                rel_others.append(0)
        
        total_rel_in_db = float(sum(rel_others))
        # Jika tidak ada yang relevan di database, anggap nilai recall sempurna (1.0)
        recall = float(sum(relevance)) / total_rel_in_db if total_rel_in_db > 0 else 1.0
        all_recall.append(float(recall))  # type: ignore

    # Hitung rata-rata keseluruhan
    avg_p = float(sum(all_precision)) / len(all_precision) if all_precision else 0.0
    avg_r = float(sum(all_recall)) / len(all_recall) if all_recall else 0.0
    
    # Hitung skor F1 (Keseimbangan Precision dan Recall)
    f1 = float(2 * (avg_p * avg_r) / (avg_p + avg_r)) if (avg_p + avg_r) > 0 else 0.0
    
    return {
        "precision": f"{avg_p*100:.1f}%",
        "recall": f"{avg_r*100:.1f}%",
        "f1": f"{f1*100:.1f}%"
    }
