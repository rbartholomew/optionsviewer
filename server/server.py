import pandas as pd
import os

from flask import Flask
from flask import jsonify

app = Flask(__name__)

#required to run flask
#export FLASK_APP=server.py

@app.route('/api/optionschain/<symbol>')
def start(symbol):

    instruments = []

    instruments.append({ 
        "call": { 
            "expiry": "May 17, 2017",
            "price": 5.65,
            "vol": 25.5
        },
        "strike": 145.00,
        "put": {
            "vol": 25.5,
            "price": .25,
            "expiry": "May 17, 2017" 
        }})

    instruments.append({
        "call": {
            "expiry": "May 17, 2017",
            "price": 4.10,
            "vol": 25.5 
        },
        "strike": 147.50,
        "put": {
            "vol": 25.5,
            "price": 1.12,
            "expiry": "May 17, 2017"
        }})

    instruments.append({
        "call": {
            "expiry": "May 17, 2017",
            "price": 1.09,
            "vol": 25.5
        },
        "strike": 150.00,
        "put": {
            "vol": 25.5,
            "price": 1.75,
            "expiry": "May 17, 2017"
        }})

    instruments.append({
        "call": {
            "expiry": "May 17, 2017",
           "price": .75,
            "vol": 25.5
        },
        "strike": 152.50,
        "put": {
            "vol": 25.5,
            "price": 2.75,
            "expiry": "May 17, 2017"
        }})

    return jsonify({"instruments": instruments})


