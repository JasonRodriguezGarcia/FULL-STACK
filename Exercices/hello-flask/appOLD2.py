# Creating a SQLite Database in Flask with SQLAlchemy

# A parte de crear el fichero app.py con teste contenido,
# para crear base de datos, en python escribir lo siguiente
#>>> from app import db
#>>> from app import app     <--en el ejemplo del video con esta línea
#>>> with app.app_context():
#...    db.create_all()      <-- y esta le vale ¿?
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Guide(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False)
    content = db.Column(db.String(144), unique=False)

    def __init__(self, title, content):
        self.title = title
        self.content = content


class GuideSchema(ma.Schema):
    class Meta:
        fields = ('title', 'content')


guide_schema = GuideSchema()
guides_schema = GuideSchema(many=True)


if __name__ == '__main__':
    app.run(debug=True)

"""
Let's just take that line-by-line. First thing that we did is, we created this base directory. That's just us going to the operating system, and asking the computer where is the application located. This is the application's base directory. From there we called our app object, and remember that is our flask object.

We said: I want you to configure the SQL Alchemy Database URI. So that is going to add whatever value we set it to. It's going to add that to our application, and then SQLAlchemy is going to look up that. Very similar to how dictionaries work.

So it's going to look for the specific key, and it's going to see if it's set, then it's going to go and look for that value. What we did is we said we want to create an SQLite location here, and we want to pass in the path of our base directory, and then we want to create an embedded database of app.sqlite.

large

From there, we instantiated a new database object with SQL Alchemy, and remember what SQL Alchemy is, it gives us a programmatic way of interacting with the database. It created, right here, an object for us, and that object allowed us to perform tasks such as creating this guide table. Then creating the guide schema, and everything that we did from lines 13 through 29. That is what we're doing there.

Then the ma, this marshmallow, allows us to have schema. This adds structure to the database. Next, we created a class where we passed in, so our guide inherits from db.model, and then we created those three columns, their data types, and some of the values associated with them. We created a constructor here, where we set the title and the content.

Then we created the schema. This is really just some boilerplate code that allows us to see what values we have access to. So we have access to the title and to the content, and then from there we just instantiated it. We created a single guide schema and then a multiple guides schema. That is the only difference between those two.
"""