from ambiente.app import app
from ambiente.app.itens import Itens
from flask import render_template, jsonify


@app.route("/")
def index ():
    return render_template("index.html")

@app.route("/getItens", methods=['GET'])
def getItens():
    print(Itens.getItens())
    return jsonify(Itens.getItens())