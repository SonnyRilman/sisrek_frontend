from flask import Flask, jsonify, request  # type: ignore
from flask_cors import CORS  # type: ignore
import pandas as pd  # type: ignore
import numpy as np  # type: ignore
import os
import traceback

# Import modul internal yang sudah kita buat
import data_manager  # type: ignore
import recommender_engine  # type: ignore
import metrics_engine  # type: ignore

app = Flask(__name__)
# Izinkan frontend mengakses API ini
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@app.route('/api/wisata', methods=['GET'])
def get_wisata():
    """Endpoint untuk mengambil semua daftar tempat wisata."""
    try:
        df_wisata = data_manager.load_wisata()
        df_ratings = data_manager.load_ratings()
        
        if df_wisata is None:
            return jsonify({"error": "Data tidak ditemukan"}), 404

        # Hitung rata-rata rating untuk setiap tempat
        avg_ratings = {}
        if df_ratings is not None:
            avg_ratings = df_ratings.groupby('Tempat_id')['Rating'].mean().to_dict()

        data = []
        for _, row in df_wisata.iterrows():
            tid = int(row['tempat_id'])
            raw_rating = avg_ratings.get(tid, 4.0)  # type: ignore
            rating_val = float(round(float(raw_rating), 1))  # type: ignore
            
            item = {
                "id": tid,
                "name": row.get('Nama Wisata', 'Tanpa Nama'),
                "type": row.get('Atribut', 'Umum'),
                "rating": rating_val, 
                "price": "Gratis"
            }

            # Logika penentuan Gambar (Mapping Kata Kunci)
            img_url = str(row.get('image', row.get('Gambar', '')))
            if not img_url or img_url.lower() == 'nan':
                attr_lower = str(item['type']).lower()
                name_lower = str(item['name']).lower()
                
                # Gunakan gambar lokal jika kata kunci cocok
                if 'sentarum' in name_lower: img_url = "/images/sentarum.png"
                elif 'betang' in name_lower or 'adat' in attr_lower: img_url = "/images/betang.png"
                elif 'terjun' in name_lower or 'curug' in name_lower: img_url = "/images/terjun.png"
                elif 'bukit' in name_lower or 'gunung' in name_lower: img_url = "/images/bukit.png"
                else: 
                    # Default jika tidak ada yang cocok
                    img_url = f"https://picsum.photos/seed/{tid}/800/600"
            
            item["image"] = img_url
            data.append(item)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/rekomendasi', methods=['GET'])
def get_rekomendasi():
    """Endpoint untuk memberikan rekomendasi berdasarkan tempat tertentu."""
    try:
        # Ambil ID acuan dan nilai K (Top-N) dari request
        target_id_raw = request.args.get('id')
        k = int(request.args.get('k', 3))
        
        df_wisata = data_manager.load_wisata()
        df_ratings = data_manager.load_ratings()
        
        if df_wisata is None:
            return jsonify({"error": "Database tidak bisa dimuat"}), 500

        # Tentukan ID acuan, default ke data pertama jika tidak ada input
        try:
            target_id = int(float(target_id_raw)) if target_id_raw else int(df_wisata.iloc[0]['tempat_id'])
        except:
            target_id = int(df_wisata.iloc[0]['tempat_id'])

        target_row = df_wisata[df_wisata['tempat_id'] == target_id]
        if target_row.empty: target_row = df_wisata.head(1)
        
        target_name = target_row.iloc[0].get('Nama Wisata')
        target_img = target_row.iloc[0].get('image', f"https://picsum.photos/seed/{target_id}/800/600")
        target_kategori = target_row.iloc[0].get('Atribut', 'Umum')
        # Thesis Note: data actual tidak punya kolom Fasilitas, gunakan Atribut
        target_fasilitas = target_row.iloc[0].get('Atribut', '-')

        # Hitung rating rata-rata untuk semua tempat sekali saja
        avg_ratings_map = {}
        if df_ratings is not None:
            avg_ratings_map = df_ratings.groupby('Tempat_id')['Rating'].mean().to_dict()

        # Jalankan Logika Algoritma (Engine)
        scores_list = recommender_engine.calculate_hybrid_scores(target_id, df_wisata, df_ratings)
        
        # Susun data hasil rekomendasi
        recommendations = []
        for s in scores_list:
            row_data = df_wisata[df_wisata['tempat_id'] == s['rid']].iloc[0]
            actual_rating = float(round(avg_ratings_map.get(s['rid'], 4.0), 1))  # type: ignore
            
            recommendations.append({
                "id": s['rid'],
                "name": row_data.get('Nama Wisata'),
                "score": f"{int(s['final_score'] * 100)}%",
                "breakdown": {
                    "content": f"{int(s['content_p'] * 100)}%",
                    "collaborative": f"{int(s['collab_p'] * 100)}%"
                },
                "rating": actual_rating,
                "type": str(row_data.get('Atribut', '')),
                "reason": f"Kesesuaian Kategori ({int(s['content_p']*100)}%) & Minat User Umum ({int(s['collab_p']*100)}%)",
                "image": str(row_data.get('image', row_data.get('Gambar', f"https://picsum.photos/seed/{s['rid']}/800/600")))
            })
            
        # Urutkan berdasarkan skor tertinggi dan ambil Top-K
        results = sorted(recommendations, key=lambda x: int(x['score'].replace('%','')), reverse=True)
        results = results[:k]  # type: ignore

        # --- EVALUASI REAL-TIME BERDASARKAN RATING (Skripsi Hal 38) ---
        users_who_rated = df_ratings[df_ratings['Tempat_id'] == target_id]['Nama_akun'].unique() if df_ratings is not None else []
        
        # Ground Truth: Item lain yang disukai (rating >= 4) oleh user yang sama
        ground_truth = set()
        if len(users_who_rated) > 0:
            ground_truth = set(
                df_ratings[
                    (df_ratings['Nama_akun'].isin(users_who_rated)) & 
                    (df_ratings['Tempat_id'] != target_id) & 
                    (df_ratings['Rating'] >= 4)
                ]['Tempat_id'].unique()
            )

        hits = [1 for res in results if res['id'] in ground_truth]
        num_hits = sum(hits)
        
        # Precision@K
        precision = num_hits / len(results) if results else 0.0
        # Recall@K 
        recall = num_hits / len(ground_truth) if ground_truth else 0.0
        # F1-Score
        f1 = (2 * precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0

        return jsonify({
            "acuan": {
                "id": target_id, 
                "name": target_name, 
                "image": target_img,
                "kategori": target_kategori,
                "fasilitas": target_fasilitas
            }, 
            "results": results,
            "metrics": {
                "precision": f"{precision:.2f}",
                "recall": f"{recall:.2f}",
                "f1": f"{f1:.2f}",
                "k": k
            }
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Endpoint untuk pengujian sistem (akurasi keseluruhan)."""
    df_wisata = data_manager.load_wisata()
    df_ratings = data_manager.load_ratings()
    m = metrics_engine.calculate_system_metrics(df_wisata, df_ratings)
    if not m: return jsonify({"error": "Gagal menghitung metrik"}), 500
    
    return jsonify({
        "precision": m['precision'],
        "recall": m['recall'],
        "f1_score": m['f1'],
        "total_data": len(df_wisata),
        "method": "Top-3 Recommendation"
    })

@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Mengambil ringkasan data untuk halaman Beranda."""
    try:
        df_wisata = data_manager.load_wisata()
        df_ratings = data_manager.load_ratings()
        
        total_destinasi = len(df_wisata) if df_wisata is not None else 0
        avg_rating = 0
        users_active = 0
        populer_count = 0

        if df_ratings is not None:
            avg_rating = float(round(float(df_ratings['Rating'].mean()), 1))  # type: ignore
            users_active = int(df_ratings['Nama_akun'].nunique())
            
            # Hanya hitung tempat populer yang benar-benar ada di daftar wisata
            valid_ids = df_wisata['tempat_id'].values
            populer_ids = df_ratings[df_ratings['Rating'] >= 4.5]['Tempat_id'].unique()
            populer_count = int(len([rid for rid in populer_ids if rid in valid_ids]))

        return jsonify({
            "total_destinasi": total_destinasi,
            "avg_rating": avg_rating,
            "populer_count": populer_count,
            "users_active": users_active
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/statistik', methods=['GET'])
def get_statistik():
    """Mengambil data visualisasi untuk halaman Statistik sesuai skripsi (Fig 3.7)."""
    try:
        df_wisata = data_manager.load_wisata()
        df_ratings = data_manager.load_ratings()

        if df_wisata is None or df_ratings is None:
            return jsonify({"error": "Data tidak lengkap"}), 404

        # 1. Grafik Rating (Data untuk Bar Chart)
        # Menghitung sebaran rating 1-5
        rating_dist = df_ratings['Rating'].value_counts().sort_index()
        chart_rating = {
            "labels": [f"{int(r)} Bintang" for r in rating_dist.index],
            "values": [int(v) for v in rating_dist.values]
        }

        # 2. Distribusi Kategori (Atribut)
        cat_counts = df_wisata['Atribut'].str.split(',').explode().str.strip().value_counts()
        chart_kategori = {
            "labels": cat_counts.index.tolist()[:6], # Ambil top 6 kategori
            "values": cat_counts.values.tolist()[:6]
        }
        
        # 3. Wisata Terpopuler (Top performers)
        # Berdasarkan rata-rata rating tertinggi
        top_ratings = df_ratings.groupby('Tempat_id')['Rating'].mean().sort_values(ascending=False).head(5)
        top_performers = []
        for tid, score in top_ratings.items():
            name = df_wisata[df_wisata['tempat_id'] == tid]['Nama Wisata'].iloc[0] if tid in df_wisata['tempat_id'].values else f"ID {tid}"
            top_performers.append({
                "name": name,
                "score": f"{score:.1f} ★"
            })

        m = metrics_engine.calculate_system_metrics(df_wisata, df_ratings)

        return jsonify({
            "summary": {
                "total_destinasi": len(df_wisata),
                "avg_rating": float(round(float(df_ratings['Rating'].mean()), 1))
            },
            "chart_rating": chart_rating,
            "chart_kategori": chart_kategori,
            "top_performers": top_performers,
            "evaluation": m
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def get_health():
    """Cek status kesehatan server dan data."""
    df_wisata = data_manager.load_wisata()
    df_ratings = data_manager.load_ratings()
    return jsonify({
        "total_wisata": len(df_wisata) if df_wisata is not None else 0,
        "total_ratings": len(df_ratings) if df_ratings is not None else 0,
        "healthy": df_wisata is not None
    })

if __name__ == '__main__':
    # Jalankan server Flask
    app.run(debug=True, port=5000)
