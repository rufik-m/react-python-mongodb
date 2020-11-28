import datetime
import os
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_HOST'],
    'username': os.environ['MONGODB_USERNAME'],
    'password': os.environ['MONGODB_PASSWORD'],
    'db': 'webapp'
}

db = MongoEngine()
db.init_app(app)

class Message(db.Document):
    name = db.StringField(max_length=60)
    text = db.StringField()
    done = db.BooleanField(default=False)
    pub_date = db.DateTimeField(default=datetime.datetime.now)

@app.route("/api, methods = ['POST'])
def create(name,text):
    message = request.json
    Message(name=message['name'], text=message['text']).save()
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/<name>", methods = ['GET'])
def read(name):
    messages = Message.objects(name=name).first().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/all", methods = ['GET'])
def read(name):
    tmessages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)


@app.route("/api/<messageId>/", methods = ['PUT'])
def update(name,text):
    Message.objects(name__contains=message['name']).update(set__name=message['name'], set__text=message['text'])
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/<messageId>", methods = ['DELETE'])
def delete(name,text):
    Message..objects(name=name).first().delete()
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

if __name__ == "__main__": 
    app.run(debug=True, port=5000)