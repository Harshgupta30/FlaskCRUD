from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from bson import json_util

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/flaskcrud'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users


@app.route('/users', methods=['POST'])
def post_user():
    id = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'contact': request.json['contact'],
        'address': request.json['address']
    })
    return jsonify({"id": str(ObjectId(id.inserted_id)), 'msg': 'User created'})


@app.route('/users', methods=['GET'])
def get_users():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'contact': doc['contact'],
            'address': doc['address']
        })
    return jsonify(users)


@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'contact': user['contact'],
        'address': user['address']
    })


@app.route("/users/<id>", methods=['DELETE'])
def delete_user(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'User deleted'})


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    db.update_one({'_id': ObjectId(id)}, {"$set": {
        'name': request.json['name'],
        'email': request.json['email'],
        'contact': request.json['contact'],
        'address': request.json['address']
    }})
    return jsonify({'msg': 'User updated'})