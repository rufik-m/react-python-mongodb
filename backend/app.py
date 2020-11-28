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

class Todo(db.Document):
    name = db.StringField(max_length=60)
    text = db.StringField()
    done = db.BooleanField(default=False)
    pub_date = db.DateTimeField(default=datetime.datetime.now)

@app.route("/api/test", methods = ['GET'])
def index(): 
    Todo.objects().delete()
    Todo(name="Simple todo A", text="12345678910").save()
    Todo(name="Simple todo B", text="12345678910").save()
    Todo.objects(name__contains="B").update(set__text="Hello world")
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/api/<name>/<text>/", methods = ['PUT'])
def create(name,text):
    Todo(name=name, text=text).save()
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/api/<name>", methods = ['GET'])
def read(name):
    todos = Todo..objects(name=name).first().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/api/all", methods = ['GET'])
def read(name):
    ttodos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)


@app.route("/api/<name>/<text>/", methods = ['POST'])
def update(name,text):
    Todo.objects(name__contains=name).update(set__text=text)
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/api/<name>", methods = ['DELETE'])
def delete(name,text):
    Todo..objects(name=name).first().delete()
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

if __name__ == "__main__": 
    app.run(debug=True, port=5000)