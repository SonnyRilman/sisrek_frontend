import pandas as pd
import os
import json

def inspect_ratings():
    file = 'data rating.xlsx'
    if os.path.exists(file):
        df = pd.read_excel(file)
        result = {
            "columns": df.columns.tolist(),
            "shape": df.shape,
            "sample": df.head(5).to_dict(orient='records')
        }
        print(json.dumps(result, indent=2))
    else:
        print("File not found")

if __name__ == "__main__":
    inspect_ratings()
