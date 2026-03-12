import pandas as pd
df = pd.read_excel('data rating.xlsx', sheet_name='Sheet2')
print(f"Total rows: {len(df)}")
print(f"Value counts for Tempat_id (top 5):\n{df['Tempat_id'].value_counts().head()}")
target_id = 1
print(f"Users who liked 1: {df[df['Tempat_id'] == target_id]['Nama_akun'].unique().tolist()}")
