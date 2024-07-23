from flask import Flask, request, jsonify, flash, json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import text
from flask_marshmallow import Marshmallow
import sqlite3
import os

app = Flask(__name__)
# Allowing access to Flask server to following ips
CORS(app, origins=["http://localhost:3000", "http://193.3.33.1:3550"])

db_file = 'app.sqlite'
# base application directory, where to save our sql table, where to place our sqlite database 
basedir = os.path.abspath(os.path.dirname(__file__))
# Configurar conexiones entre SQLAlchemy y SQLite3 DB API
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, db_file)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# TO DO
#   -  create a secret key which will help us - ALLOW USING¿? FLASH("MESSAGE"), OTHERS¿?

db = SQLAlchemy(app) # to iterate with database
ma = Marshmallow(app) # to add structure to the database

# Guide inherits Model from db object
class Guide(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False)
    content = db.Column(db.String(144), unique=False)

    def __init__(self, title, content):
        self.title = title
        self.content = content

# Creating schema with Marshmallow
class GuideSchema(ma.Schema):
    class Meta:
        fields = ('title', 'content')


guide_schema = GuideSchema()
guides_schema = GuideSchema(many=True)

# Route to SELECT all data from the database and display in a table      
@app.route('/get_results', methods=["POST", "PUT", "PATCH", "GET"]) 
def get_results(): 
#   CODE EXAMPLES WITH PARAMETERS
#   session.execute(text(your_query_string),your_parameters)
#  db.execute('UPDATE post SET payment =:payment WHERE unique_id =:unique_id', \
#      (payment=done, unique_id=12345))
#  db.execute("UPDATE posts SET payment = %s WHERE unique_id = %s;", \
#     (payment, unique_id,))  

# from sqlalchemy import text

# query = text("SELECT name, price FROM products WHERE category=:product_category")
# result = db.engine.execute(query, product_category="Fruit")


    # GET THE SQLALCHEMY RESULTPROXY OBJECT 
    result = db.session.execute(text(request.get_json()['query']))
    response = []
    if request.method == 'POST' or request.method == 'GET':
        i = 1
        # ITERATE OVER EACH RECORD IN RESULT AND ADD IT  
        # IN A PYTHON DICT OBJECT 
#         for each in result: 
# #            response.update({f'Record {i}': list(each)}) 
#             response.update({f'Record {i}': list(each)})
#             i+= 1
        for each in result: 
#            response.update({f'Record {i}': list(each)}) 
            response.append(list(each))
            i+= 1
        print ("api post terminado ...")
        
    db.session.commit()
    return response

# test for coding
# results = session.query(User).select(User.id, User.address).join(Jobs.user_id).all()

# Endpoint to create a new guide
@app.route('/guide', methods=["POST"])
def add_guide():
    title = request.json['title']
    content = request.json['content']

    new_guide = Guide(title, content)

    db.session.add(new_guide)
    db.session.commit()

    guide = Guide.query.get(new_guide.id)
    print ("New guide created ...")
    return guide_schema.jsonify(guide)

# Endpoint to query all guides
@app.route('/guides', methods=["GET"])
def get_guides():
    all_guides = Guide.query.all()
    result = guides_schema.dump(all_guides)
    print("All guides retourned ...")
    return jsonify(result)

# Endpoint for querying a single guide
@app.route("/guide/<id>", methods=["GET"])
def get_guide(id):
    guide = Guide.query.get(id)
    print("Single guide retourned...")
    return guide_schema.jsonify(guide)


# Endpoint for updating a guide
@app.route("/guide/<id>", methods=["PUT"])
def guide_update(id):
    guide = Guide.query.get(id)
    title = request.json['title']
    content = request.json['content']

    guide.title = title
    guide.content = content

    db.session.commit()
    print("Single guide updated...")
    return guide_schema.jsonify(guide)

# Endpoint for deleting a record
@app.route("/guide/<id>", methods=["DELETE"])
def guide_delete(id):
    guide = Guide.query.get(id)
    db.session.delete(guide)
    db.session.commit()
    print("Deleted single guide...")
    return "Guide was successfully deleted"


if __name__ == '__main__':
    # use_reloaded to avoid echo on reply from Flask
    app.run(port=5000, host="localhost", debug=True, use_reloader=False)