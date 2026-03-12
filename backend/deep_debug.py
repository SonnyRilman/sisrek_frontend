import pandas as pd
df_w = pd.read_excel('data wisata.xlsx')
df_r = pd.read_excel('data rating.xlsx', sheet_name='Sheet2')

print("WISATA ID EXAMPLE:", df_w['tempat_id'].iloc[0], type(df_w['tempat_id'].iloc[0]))
print("RATING ID EXAMPLE:", df_r['Tempat_id'].iloc[0], type(df_r['Tempat_id'].iloc[0]))

w_ids = df_w['tempat_id'].dropna().astype(int).tolist()
r_ids = df_r['Tempat_id'].dropna().astype(float).astype(int).tolist() # Handle NaN then int

intersect = set(w_ids).intersection(set(r_ids))
print("INTERSECTION SIZE:", len(intersect))
print("INTERSECTION SAMPLE:", list(intersect)[:5])
