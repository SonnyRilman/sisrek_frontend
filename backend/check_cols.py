import pandas as pd
df = pd.read_excel('data rating.xlsx', sheet_name='Sheet2')
for c in df.columns:
    print(f"|{c}| (type: {type(c)})")
