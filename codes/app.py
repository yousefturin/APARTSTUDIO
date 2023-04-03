from flask import Flask, render_template, jsonify
import plotly.express as px
import random

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/data")
def data():
    # generate some random data for the histogram
    x = [random.randint(1, 6) for _ in range(100)]
    fig = px.histogram(x=x, nbins=6)
    return jsonify(fig)

if __name__ == "__main__":
    app.run(debug=True)