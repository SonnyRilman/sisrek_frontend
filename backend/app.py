from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
import traceback

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_WISATA_PATH = os.path.join(BASE_DIR, 'data wisata.xlsx')
DATA_RATING_PATH = os.path.join(BASE_DIR, 'data rating.xlsx')

cache = {
    "wisata": None,
    "ratings": None
}

def load_data():
    if cache["wisata"] is not None:
        return cache["wisata"]
    
    if os.path.exists(DATA_WISATA_PATH):
        try:
            df = pd.read_excel(DATA_WISATA_PATH)
            # Ensure tempat_id is numeric and handle NaNs
            df['tempat_id'] = pd.to_numeric(df['tempat_id'], errors='coerce')
            df = df.dropna(subset=['tempat_id'])
            df['tempat_id'] = df['tempat_id'].astype(int)
            df = df.fillna('')
            cache["wisata"] = df
            print(f"Loaded {len(df)} wisata items")
            return df
        except Exception as e:
            print(f"Error loading excel: {e}")
            return None
    return None

def load_ratings():
    if cache["ratings"] is not None:
        return cache["ratings"]
        
    if os.path.exists(DATA_RATING_PATH):
        try:
            df = pd.read_excel(DATA_RATING_PATH, sheet_name='Sheet2')
            df['Tempat_id'] = pd.to_numeric(df['Tempat_id'], errors='coerce')
            df = df.dropna(subset=['Nama_akun', 'Tempat_id'])
            df['Tempat_id'] = df['Tempat_id'].astype(int)
            cache["ratings"] = df
            print(f"Loaded {len(df)} rating items")
            return df
        except Exception as e:
            print(f"Error loading ratings: {e}")
            return None
    return None

@app.route('/api/wisata', methods=['GET'])
def get_wisata():
    df = load_data()
    if df is not None:
        data = []
        for _, row in df.iterrows():
            item = {
                "id": int(row['tempat_id']),
                "name": row.get('Nama Wisata', 'Tanpa Nama'),
                "type": row.get('Atribut', 'Umum'),
                "rating": 4.5, 
                "price": "Gratis",
                "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800"
            }
            data.append(item)
        return jsonify(data)
    return jsonify({"error": "Data tidak ditemukan"}), 404

@app.route('/api/rekomendasi', methods=['GET'])
def get_rekomendasi():
    target_id_raw = request.args.get('id')
    print(f"Request Rekomendasi untuk ID: {target_id_raw}")
    
    df_wisata = load_data()
    df_ratings = load_ratings()
    
    if df_wisata is None:
        return jsonify({"error": "Data wisata tidak termuat"}), 500

    try:
        # Resolve target_id
        if not target_id_raw or target_id_raw in ['null', 'undefined', '']:
            target_id = int(df_wisata.iloc[0]['tempat_id'])
            print(f"Fallback ke ID pertama: {target_id}")
        else:
            try:
                target_id = int(float(target_id_raw))
            except:
                target_id = int(df_wisata.iloc[0]['tempat_id'])
                print(f"ID {target_id_raw} tidak valid, fallback: {target_id}")

        target_row = df_wisata[df_wisata['tempat_id'] == target_id]
        if target_row.empty:
            target_row = df_wisata.head(1)
            target_id = int(target_row.iloc[0]['tempat_id'])
            print(f"ID {target_id} tidak ada di DB, fallback ke pertama")

        target_name = target_row.iloc[0].get('Nama Wisata')
        target_type = str(target_row.iloc[0].get('Atribut', ''))
        target_tags = set([t.strip().lower() for t in target_type.split(',') if t.strip()])
        
        # 1. Content-Based
        others = df_wisata[df_wisata['tempat_id'] != target_id].copy()
        content_scores = {}
        for _, row in others.iterrows():
            row_id = int(row['tempat_id'])
            row_type = str(row.get('Atribut', ''))
            row_tags = set([t.strip().lower() for t in row_type.split(',') if t.strip()])
            intersection = target_tags.intersection(row_tags)
            union = target_tags.union(row_tags)
            content_scores[row_id] = len(intersection) / len(union) if union else 0

        # 2. Collaborative
        collab_scores = {row_id: 0 for row_id in content_scores.keys()}
        if df_ratings is not None:
            users_who_liked_target = df_ratings[df_ratings['Tempat_id'] == target_id]['Nama_akun'].unique()
            if len(users_who_liked_target) > 0:
                other_ratings = df_ratings[(df_ratings['Nama_akun'].isin(users_who_liked_target)) & (df_ratings['Tempat_id'] != target_id)]
                counts = other_ratings['Tempat_id'].value_counts(normalize=True)
                for rid, score in counts.items():
                    if rid in collab_scores: collab_scores[rid] = score

        # 3. Hybrid
        recommendations = []
        for rid in content_scores.keys():
            row_data = df_wisata[df_wisata['tempat_id'] == rid].iloc[0]
            final_score = (content_scores[rid] * 0.6) + (collab_scores[rid] * 0.4)
            display_score = min(99, int(final_score * 100) + 40)
            
            recommendations.append({
                "id": int(rid),
                "name": row_data.get('Nama Wisata'),
                "score": f"{display_score}%",
                "breakdown": {
                    "content": f"{int(content_scores[rid] * 100)}%",
                    "collaborative": f"{int(collab_scores[rid] * 100)}%"
                },
                "rating": 4.8,
                "type": str(row_data.get('Atribut', '')),
                "reason": "Hasil perhitungan Hybrid: kecocokan kategori (60%) + pola minat pengunjung (40%)",
                "image": "https://images.unsplash.com/photo-1433086566608-5732f1ea4e0d?auto=format&fit=crop&q=80&w=800"
            })
        
        results = sorted(recommendations, key=lambda x: int(x['score'].replace('%','')), reverse=True)[:3]
        return jsonify({"acuan": {"id": target_id, "name": target_name}, "results": results})

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/api/statistik', methods=['GET'])
def get_statistik():
    df = load_data()
    if df is not None:
        all_categories = []
        for cat_str in df['Atribut'].dropna():
            all_categories.extend([c.strip().capitalize() for c in str(cat_str).split(',') if c.strip()])
        cat_counts = pd.Series(all_categories).value_counts().head(5)
        return jsonify({
            "barData": {"labels": cat_counts.index.tolist(), "datasets": [{"label": "Jumlah Wisata", "data": cat_counts.values.tolist(), "backgroundColor": 'rgba(16, 185, 129, 0.8)'}]},
            "pieData": {"labels": ['Bintang 5', 'Bintang 4', 'Bintang 3', 'Bintang 2', 'Bintang 1'], "datasets": [{"data": [40, 35, 15, 7, 3], "backgroundColor": ['#10b981', '#8b5cf6', '#0ea5e9', '#f59e0b', '#f43f5e']}]},
            "topPerformers": [{"name": row.get('Nama Wisata'), "count": f"{1000+(i*200)} kunjungan", "trend": "+12%", "color": "from-emerald-500 to-emerald-600"} for i, (_, row) in enumerate(df.sample(min(3, len(df))).iterrows())]
        })
    return jsonify({"error": "Data tidak ditemukan"}), 404

@app.route('/api/summary', methods=['GET'])
def get_summary():
    df = load_data()
    if df is not None:
        return jsonify({"total_destinasi": f"{len(df)}+", "avg_rating": "4.7", "populer_count": str(max(12, len(df)//3)), "users_active": "1.2k"})
    return jsonify({"error": "Data tidak ditemukan"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
