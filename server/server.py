import pandas as pd
import os

from flask import Flask
from flask import jsonify

app = Flask(__name__)

file_path = "/home/richie/Code/finance/GoogleData/"

@app.route('/api/files')
def get_files():
    files = os.listdir(file_path)
    return jsonify({"files": files })

@app.route('/api/symbols')
def get_symbols():
    name = file_path + name
    df = pd.read_csv("sp500_symbols.csv", delimiter=",")
    columns = df.columns
    return jsonify({ "symbols": columns })

@app.route('/api/file/<name>')
def get_file(name):
    name = file_path + name
    print(name)
    #needs to be a array of arrays
    df = pd.read_csv(name, delimiter=",")
    return df.to_json(orient='split')

