@app.route('/api/rekomendasi', methods=['GET'])
def get_rekomendasi():
    target_id = request.args.get('id')
    df_wisata = load_data()
    df_ratings = load_ratings()
    
    if df_wisata is None:
        return jsonify({"error": "Data wisata tidak termuat"}), 500

    if not target_id or target_id == 'null' or target_id == 'undefined':
        # Fallback ke item pertama jika id tidak valid
        target_id = df_wisata.iloc[0]['tempat_id']
        print(f"ID tidak valid, fallback ke: {target_id}")
    
    try:
        target_id = int(float(target_id)) # Handle case like "1.0"
        target_row = df_wisata[df_wisata['tempat_id'] == target_id]
        
        if target_row.empty:
            # Jika ID tidak ditemukan, coba cari yang mendekati atau ambil yang pertama
            target_row = df_wisata.head(1)
            target_id = int(target_row.iloc[0]['tempat_id'])
            print(f"ID {target_id} tidak ditemukan, menggunakan: {target_id}")
            
        target_name = target_row.iloc[0].get('Nama Wisata')
        target_type = str(target_row.iloc[0].get('Atribut', ''))
        target_tags = set([t.strip().lower() for t in target_type.split(',') if t.strip()])
        
        # --- 1. Content-Based Filtering Scores ---
        others = df_wisata[df_wisata['tempat_id'] != target_id].copy()
        content_scores = {}
        for _, row in others.iterrows():
            row_id = int(row.get('tempat_id'))
            row_type = str(row.get('Atribut', ''))
            row_tags = set([t.strip().lower() for t in row_type.split(',') if t.strip()])
            
            intersection = target_tags.intersection(row_tags)
            union = target_tags.union(row_tags)
            jaccard = len(intersection) / len(union) if union else 0
            content_scores[row_id] = jaccard

        # --- 2. Collaborative Filtering Scores (Item-Item simple) ---
        collab_scores = {row_id: 0 for row_id in content_scores.keys()}
        if df_ratings is not None:
            # Pastikan tipe data sama
            df_ratings['Tempat_id'] = pd.to_numeric(df_ratings['Tempat_id'], errors='coerce')
            
            users_who_liked_target = df_ratings[df_ratings['Tempat_id'] == target_id]['Nama_akun'].unique()
            
            if len(users_who_liked_target) > 0:
                other_ratings_by_same_users = df_ratings[
                    (df_ratings['Nama_akun'].isin(users_who_liked_target)) & 
                    (df_ratings['Tempat_id'] != target_id)
                ]
                counts = other_ratings_by_same_users['Tempat_id'].value_counts(normalize=True)
                for row_id, score in counts.items():
                    if row_id in collab_scores:
                        collab_scores[row_id] = score

        # --- 3. Hybrid Combination ---
        recommendations = []
        for row_id in content_scores.keys():
            row_data = df_wisata[df_wisata['tempat_id'] == row_id].iloc[0]
            final_score = (content_scores[row_id] * 0.6) + (collab_scores.get(row_id, 0) * 0.4)
            display_score = int(final_score * 100) + 40
            if display_score > 99: display_score = 99

            recommendations.append({
                "id": int(row_id),
                "name": row_data.get('Nama Wisata'),
                "score": f"{display_score}%",
                "rating": 4.8,
                "type": str(row_data.get('Atribut', '')),
                "reason": "Berdasarkan kemiripan kategori & minat pengunjung serupa",
                "image": "https://images.unsplash.com/photo-1433086566608-5732f1ea4e0d?auto=format&fit=crop&q=80&w=800"
            })
        
        recommendations = sorted(recommendations, key=lambda x: int(x['score'].replace('%','')), reverse=True)[:3]
        
        return jsonify({
            "acuan": {"id": target_id, "name": target_name},
            "results": recommendations
        })
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500
