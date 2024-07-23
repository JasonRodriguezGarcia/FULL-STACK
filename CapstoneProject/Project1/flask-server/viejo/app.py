#you first import the sqlite3 module to use it to connect to your database.
# Then you import the Flask class and the render_template() function from the flask package
import sqlite3
from flask import Flask, render_template, jsonify


#You make a Flask application instance called app
app = Flask(__name__)

#define a function called get_db_connection(), which opens a connection to the database.db
# database file you created earlier, and sets the row_factory attribute to sqlite3.Row so
# you can have name-based access to columns. This means that the database connection will 
# return rows that behave like regular Python dictionaries

def get_db_connection():
    conn = sqlite3.connect('./databases/database.db')
    conn.row_factory = sqlite3.Row
    #Lastly, the function returns the conn connection object you’ll be using to access the database.
    return conn

#You then use the app.route() decorator to create a Flask view function called index(). You use the
# get_db_connection() function to open a database connection.
@app.route('/')
def index():
    conn = get_db_connection()
    #Then you execute an SQL query to select all entries from the posts table. You use the fetchall()
    # method to fetch all the rows of the query result, this will return a list of the posts you
    # inserted into the database in the previous step.
    posts = conn.execute('SELECT * FROM posts').fetchall()
    #You close the database connection using the close() method and return the result of rendering 
    # the index.html template. You also pass the posts object as an argument, which contains the 
    # results you got from the database. This will allow you to access the blog posts in the index.html template.
    conn.close()
    return "hi men "+str(posts)

if __name__ == "__main__":
   app.run(port=5000, debug=True)
 