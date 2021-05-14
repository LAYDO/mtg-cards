#!/bin/python3
from flask import Flask, render_template, jsonify, request
import os
import json
from mtgsdk import Card

app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
    app_dir = ''
    if (os.path.exists('/home/laydo')):
        app_dir = os.path.realpath('mtg')
    else:
        app_dir = os.path.realpath('')
    print('PATH: ' + app_dir)
    return render_template('mtg.html')


@app.route('/card', methods=['GET'])
def get_cards_by_name():
    if 'name' in request.args:
        name = str(request.args['name'])
    else:
        return "Error: No id field provided. Please specify an id."
    mtgSet = Card.where(name=name).all()
    cardSet = []
    for card in mtgSet:
        if (card.id):
            mtgCard = {
                "name": card.name,
                "imgUrl": card.image_url,
                "id": card.multiverse_id,
                "colors": card.colors,
                "manaCost": card.mana_cost,
            }
            cardSet.append(mtgCard)
    return jsonify(cardSet)


@app.route('/set', methods=['GET'])
def get_set_by_code():
    if 'code' in request.args:
        code = str(request.args['code'])
    else:
        return "Error: No code field provided. Please specify a code."
    mtgSet = Card.where(set=code).all()
    cardSet = []
    for card in mtgSet:
        if (card.id):
            mtgCard = {
                "name": card.name,
                "imgUrl": card.image_url,
                "id": card.multiverse_id,
                "colorId": card.color_identity,
                "manaCost": card.mana_cost,
            }
            cardSet.append(mtgCard)
    return jsonify(cardSet)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
