# use as following
# python initdb.py

import sqlite3
#opening connection to database which will be created
connection = sqlite3.connect('./xdatabases/database.db')

#opening schema.sql
with open('./xschemas/schema.sql') as f:

#Next you execute its contents using the executescript() method
#that executes multiple SQL statements at once, which will create the posts table
    connection.executescript(f.read())

#Create a Cursor object that allows you to process rows in a database.
#In this case, you’ll use the cursor’s execute() method to execute two 
# INSERT SQL statements to add two blog posts to your posts table
cur = connection.cursor()

cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
            ('First Post', 'Content for the first post')
            )

cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
            ('Second Post', 'Content for the second post')
            )

cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
            ('Third Post', 'Content for the third post')
            )

#Commit the changes and close the connection
connection.commit()
connection.close()