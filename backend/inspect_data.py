import pandas as pd
import os
import json

def inspect():
    files = ['data wisata.xlsx', 'data rating.xlsx']
    results = {}
    for file in files:
        if os.path.exists(file):
            df = pd.read_excel(file)
            results[file] = {
                "columns": df.columns.tolist(),
                "shape": df.shape,
                "sample": df.head(3).to_dict(orient='records')
            }
        else:
            results[file] = "Not Found"
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    inspect()
