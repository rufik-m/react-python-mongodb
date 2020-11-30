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

@app.route("/api", methods = ['POST'])
def create():
    message = request.json
    Message(name=message['name'], text=message['text']).save()
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/query/<key>/<value>", methods = ['GET'])
def query(key, value):
    messages = Message.objects.get_or_404(key=value).to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api", methods = ['GET'])
def readAll():
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/<messageId>", methods = ['GET'])
def read(messageId):
    messages = Message.objects.get_or_404(id=messageId).to_json()
    return Response(messages, mimetype="application/json", status=200)


@app.route("/api/<messageId>", methods = ['PUT'])
def update(messageId):
    message = request.json
    Message.objects.get_or_404(id=messageId).update(set__name=message['name'], set__text=message['text'])
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

@app.route("/api/<messageId>", methods = ['DELETE'])
def delete(messageId):
    Message.objects.get_or_404(id=messageId).delete()
    messages = Message.objects().to_json()
    return Response(messages, mimetype="application/json", status=200)

if __name__ == "__main__": 
    app.run(debug=True, port=5000)