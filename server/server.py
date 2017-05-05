import pandas as pd
import os
import random

from flask import Flask
from flask import jsonify

app = Flask(__name__)

#required to run flask
#export FLASK_APP=server.py

symbols = [ "AAPL", "FB", "MSFT" ]
instruments = {}

def generate_options(symbol):

    expiry = "May 17, 2017"

    base_price = random.random() * 100

    itm_strike = int(base_price)

    strikes = []

    for i in range(0, 4):
        s = { 
            "strike": itm_strike - i,
            "call": { 
                "expiry": expiry, 
                "price": random.random() * 5,
                "vol": random.random() * 50
                },
            "put": { 
                "expiry": expiry, 
                "price": random.random() * 5,
                "vol": random.random() * 50
                }  
            }
        strikes.append(s)

    for i in range(1, 5):
        s = { 
            "strike": itm_strike + i,
            "call": { 
                "expiry": expiry, 
                "price": random.random() * 5,
                "vol": random.random() * 50
                },
            "put": { 
                "expiry": expiry, 
                "price": random.random() * 5,
                "vol": random.random() * 50
                }  
            }
        strikes.append(s)

    strikes = sorted(strikes, key=lambda s: s["strike"])

    return (base_price, strikes)

@app.before_first_request
def start():
    for symbol in symbols:
        (price, strikes) = generate_options(symbol)
        instruments[symbol] = { "lastPrice": price, "strikes": strikes }

@app.route('/api/optionschain/<symbol>')
def get_options_for_symbol(symbol):
    symbol = symbol.upper()
    print("Loading " + symbol)
    strikes = instruments[symbol] #if symbol in instruments else []
    return jsonify({"instrument": strikes })


