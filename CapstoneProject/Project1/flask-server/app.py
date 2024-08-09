from flask import Flask, request, jsonify, flash, json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import text
from flask_marshmallow import Marshmallow
import os

from collections import namedtuple


app = Flask(__name__)
# Allowing access to Flask server to following ips, second IP is example for more ip's list case
CORS(app, origins=["http://localhost:3000", "http://193.3.33.1:3550"])

db_file = './databases/database.db'
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

# Los tipos de datos más comunes son los datos de formulario o los datos JSON.
# Para enviar los datos del formulario, pasa un objeto FormData poblado. 
# Esto utiliza el mismo formato que un formulario HTML, y se accedería con request.form en una vista Flask.

#fillR

@app.route('/get_worker_secundary_databases',methods=['GET'])
def get_secundary_databases():
# CODE OK
    response = [] #    response = {}
    listTables = [  ["trabajadores_situaciones", ["id_situacion:", "descripcion_situacion:"]] ,
                    ["carnets", ["carnets_id_carnet", "carnets_descripcion_carnet"]],
                    ["vehiculos"],
                    ["provincias"],
                    ["municipios"]
    ]
    result1 = db.session.execute(text(f'SELECT * FROM '+listTables[0][0]+';'))
    result2 = db.session.execute(text(f'SELECT * FROM '+listTables[1][0]+';'))
    result3 = db.session.execute(text(f'SELECT * FROM '+listTables[2][0]+';'))
    result4 = db.session.execute(text(f'SELECT * FROM '+listTables[3][0]+';'))
    result5 = db.session.execute(text(f'SELECT * FROM '+listTables[4][0]+';'))
    db.session.commit()
    # response1 = {} #    response = {}
    # i=1
    # for each in result1: 
    #     response1[].update({f'Record {i}': each}) 
    #     # response1.update({f'Record {i}': each}) 
    #     # dataList = list(each)
    #     # response1.append({
    #     #     "id_situacion": dataList[0],
    #     #     "descripcion_situacion": dataList[1]
    #     # })
    # # print(dict(response))
    # # response[listTables[0][0]] = response1
    # print(response)
    # # response =  { "situaciones": response1
    # #             }
    
    
    response1 = [] #    response = {}
    for each in result1: 
        dataList = list(each)
        response1.append({
            "id_situacion": dataList[0],
            "descripcion_situacion": dataList[1]
        })
    response2 = [] #    response = {}
    for each in result2: 
        dataList = list(each)
        response2.append({
            "id_carnet": dataList[0],
            "descripcion_carnet": dataList[1]
        })
   
    response3 = [] #    response = {}
    for each in result3: 
        dataList = list(each)
        response3.append({
            "id_vehiculo": dataList[0],
            "descripcion_vehiculo": dataList[1]
        })
   
    response4 = [] #    response = {}
    for each in result4: 
        dataList = list(each)
        response4.append({
            "id_provincia": dataList[0],
            "descripcion_provincia": dataList[1]
        })
    response5 = [] #    response = {}
    for each in result5: 
        dataList = list(each)
        response5.append({
            "id_municipio": dataList[0],
            "descripcion_municipio": dataList[1]
        })
    response =  {
                    # f'{listTables[0][0]}': response1,
                    # f'{listTables[1][0]}': response2,
                    # f'{listTables[2][0]}': response3,
                    f'{listTables[3][0]}': response4,
                    f'{listTables[4][0]}': response5
                }
    print(response)
    # response = [] #    response = {}
    # response.append(listTables[0][0])
    # for each in result1: 
    #     dataList = list(each)
    #     response.append({
    #         "id_situacion": dataList[0],
    #         "descripcion_situacion": dataList[1]
    #     })

    # response.append(listTables[1][0])
    # for each in result2: 
    #     dataList = list(each)
    #     response.append({
    #         "id_carnet": dataList[0],
    #         "descripcion_carnet": dataList[1]
    #     })
    # response.append(listTables[2][0])
    # for each in result3: 
    #     dataList = list(each)
    #     response.append({
    #         "id_vehiculo": dataList[0],
    #         "descripcion_vehiculo": dataList[1]
    #     })
    # response.append(listTables[3][0])
    # for each in result4: 
    #     dataList = list(each)
    #     response.append({
    #         "id_provincia": dataList[0],
    #         "descripcion_provincia": dataList[1]
    #     })
    # response.append(listTables[4][0])
    # for each in result5: 
    #     dataList = list(each)
    #     response.append({
    #         "id_municipio": dataList[0],
    #         "descripcion_municipio": dataList[1]
    #     })
    # print(response)
    # return "terminado"        
    return response
    # return "terminacion OK ..."

# Route to SELECT all data from workers(trabajadores) database
@app.route('/get_listworkers', methods=["POST", "PUT", "PATCH", "GET"]) 
def get_listworkers(): 
# def get_results(): 
    # GET THE SQLALCHEMY RESULTPROXY OBJECT 
    result = db.session.execute(text(request.get_json()['query']))
    response = [] #    response = {}
    print(request.get_json()['query'])
    if request.method == 'POST' or request.method == 'GET':
        i = 1
        # ITERATE OVER EACH RECORD IN RESULT AND ADD IT  
        # IN A PYTHON LIST/DICT OBJECT 
        for each in result: 
#            response.update({f'Record {i}': each}) 
            dataList = list(each)
            response.append({
            # response.append({f'{i}': {
                "id": dataList[0],
                "nombre": dataList[1],
                "apellidos": dataList[2],
                "fecha_nacimiento": dataList[3],
                "doi": dataList[4],
                "id_municipio": dataList[5],
                "codigo_postal": dataList[6],
                "id_provincia": dataList[7],
                "id_vehiculo": dataList[8],
                "telefono_contacto": dataList[9],
                "correo_electronico": dataList[10],
                "id_situacion": dataList[11],
                "lopd": dataList[12]
#"curriculum` blob, -- NOT NULL,
                })
#            print(response)
            i+= 1
        print ("api get_results ended ...")
        
    db.session.commit()
    print(response)
    return response

@app.route('/deleteworker/<id>',methods=['DELETE'])
def deleteworker(id):
    # user = Users.query.get(id)
    # db.session.delete(user)
    # db.session.commit()
    # return user_schema.jsonify(user)
    result = db.session.execute(text(f'DELETE FROM trabajadores WHERE trabajadores_id_trabajador = {id};'))
    db.session.commit()
    response = []
    response.append ({
        "id deleted": id
    })
    print("Workers Record Deleted id: "+id)
    return response

# Route to CREATE worker in the database
@app.route('/addworker', methods=["POST", "PUT", "PATCH", "GET"]) 
def addworker(): 
    parameters = (
        {"nombre" : request.form.get("trabajadores[trabajadores_nombre]"),
        "apellidos" : request.form.get("trabajadores[trabajadores_apellidos]"),
        "fecha_nacimiento" : request.form.get("trabajadores[trabajadores_fecha_nacimiento]"),
        "doi" : request.form.get("trabajadores[trabajadores_doi]"), 
        "id_municipio" : request.form.get("trabajadores[trabajadores_id_municipio]"),
        "codigo_postal" : request.form.get("trabajadores[trabajadores_codigo_postal]"),
        "id_provincia" : request.form.get("trabajadores[trabajadores_id_provincia]"),
        "id_vehiculo" : 1,
        "telefono_contacto" : "943333333",
        "correo_electronico" : "pepe@test2.com",
        "id_situacion" : 1,
        "lopd" : "S"
    })
    result = db.session.execute(text(f'INSERT INTO trabajadores (\
                                trabajadores_nombre,\
                                trabajadores_apellidos,\
                                trabajadores_fecha_nacimiento,\
                                trabajadores_doi,\
                                trabajadores_id_municipio,\
                                trabajadores_codigo_postal,\
                                trabajadores_id_provincia, \
                                trabajadores_id_vehiculo, \
                                trabajadores_telefono_contacto, \
                                trabajadores_correo_electronico, \
                                trabajadores_id_situacion, \
                                trabajadores_lopd \
                            )\
                            VALUES (:nombre, :apellidos, :fecha_nacimiento, :doi, :id_municipio, \
                                    :codigo_postal, :id_provincia, :id_vehiculo, :telefono_contacto, \
                                    :correo_electronico, :id_situacion, :lopd) \
                            ;')
                            , parameters) 

    db.session.commit()
    # print(result)
    newCreatedId = result.lastrowid
    # newCreatedId +1
    print("Workers Record Created id: "+str(newCreatedId))
    response = []
    response.append ({
        "id": newCreatedId
    })
    return response


#    return jsonify("Data saved OK")

# Route to EDIT worker in the database
#@app.route('/user/<id>/edit', methods=["POST", "GET"])
@app.route('/editworker/<id>', methods=["POST", "GET"])
def editworker(id): 
    parameters = (
        {"nombre" : request.form.get("trabajadores[trabajadores_nombre]"),
        "apellidos" : request.form.get("trabajadores[trabajadores_apellidos]"),
        "fecha_nacimiento" : request.form.get("trabajadores[trabajadores_fecha_nacimiento]"),
        "doi" : request.form.get("trabajadores[trabajadores_doi]"), 
        "id_municipio" : request.form.get("trabajadores[trabajadores_id_municipio]"),
        "codigo_postal" : request.form.get("trabajadores[trabajadores_codigo_postal]"),
        "id_provincia" : request.form.get("trabajadores[trabajadores_id_provincia]"),
        "id_vehiculo" : 1,
        "telefono_contacto" : "943333333",
        "correo_electronico" : "pepe@test2.com",
        "id_situacion" : 1,
        "lopd" : "S"
    })
    result = db.session.execute(text(f'UPDATE trabajadores SET \
                                    trabajadores_nombre = :nombre, \
                                    trabajadores_apellidos = :apellidos, \
                                    trabajadores_fecha_nacimiento = :fecha_nacimiento, \
                                    trabajadores_doi = :doi, \
                                    trabajadores_id_municipio = :id_municipio, \
                                    trabajadores_codigo_postal = :codigo_postal, \
                                    trabajadores_id_provincia = :id_provincia, \
                                    trabajadores_id_vehiculo = :id_vehiculo, \
                                    trabajadores_telefono_contacto = :telefono_contacto, \
                                    trabajadores_correo_electronico = :correo_electronico, \
                                    trabajadores_id_situacion = :id_situacion, \
                                    trabajadores_lopd = :lopd \
                                    WHERE trabajadores_id_trabajador = '+id+';'), parameters) 
    db.session.commit()
    print(result)
    print("Workers Record Modificated id: "+id)
    return "Workers Record Modificated"


# OLD COURSE CODE
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
    
    #   CODE EXAMPLES WITH PARAMETERS
#   session.execute(text(your_query_string),your_parameters)
#  db.execute('UPDATE post SET payment =:payment WHERE unique_id =:unique_id', \
#      (payment=done, unique_id=12345))
#  db.execute("UPDATE posts SET payment = %s WHERE unique_id = %s;", \
#     (payment, unique_id,))  

# test for coding
# results = session.query(User).select(User.id, User.address).join(Jobs.user_id).all()


# import sqlite3
# def getInicio():
#     conn=sqlite3.connect("baseTabla.db")
#     c = conn.cursor()
#     row=c.execute("SELECT * FROM tabla")
#     resultado =c.fetchall()
#     for res in resultado:
#       print(res)
#     conn.close()
# getInicio()
