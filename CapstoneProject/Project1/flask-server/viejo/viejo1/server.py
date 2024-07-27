import sqlite3 # import sqlite3 for connection to the database
from flask import Flask, render_template # import 2 classes

app= Flask(__name__) # You make a Flask application instance called app

# Member API Route --- OLD
@app.route("/members")
def members():
  return {"members": ["Member 1","Member 2","Member 3"]}

# #define a function called get_db_connection(), which opens a connection 
# # to the database.db database file you created earlier by hand, and sets the 
# # row_factory attribute to sqlite3.Row so you can have name-based access 
# # to columns. This means that the database connection will return rows that
# # behave like regular Python dictionaries. Lastly, the function returns the 
# # conn connection object you’ll be using to access the database.
# def get_db_connection():
#     conn = sqlite3.connect('database.db')
#     conn.row_factory = sqlite3.Row
#     return conn

# #You then use the app.route() decorator to create a Flask view function
# @app.route('/')
# def index():
# # use the get_db_connection() function to open a database connection
#     conn = get_db_connection()
#     #Then you execute an SQL query to select all entries from the posts
#     # table. You use the fetchall() method to fetch all the rows of the
#     # query result, this will return a list of the posts you inserted into
#     # the database in the previous step
#     posts = conn.execute('SELECT * FROM posts').fetchall()
#     #close the database connection using the close() method
#     conn.close()
#     # return the result of rendering the index.html template
#     # You also pass the posts object as an argument, which contains the
#     # results you got from the database. This will allow you to access 
#     # the blog posts in the index.html template
#     return render_template('index.html', posts=posts)

if __name__ == "__main__":
   app.run(debug=True)
  