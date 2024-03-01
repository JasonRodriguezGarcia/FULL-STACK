class User():

  def __init__(self, username, password):
    self.username = username
    self.password = password

  def get_name(self):
    return self.username

  def set_password(self, password):
    self.password = password
    
  def checker(self):
    if self.username == "admin" and self.password == "youcanpass":
      return f"Good morning user {self.username}, you can access"

    else:
      return f"User {self.username} can not access to the Web page"

users = [ User("pepe", "LuisdeGóngora"), User("admin", "LuisdeGóngora"), User("admin", "youcanpass") ]

for user in users:
  print(user.checker())

print(users[0].get_name()) # acceso al nombre

users[1].set_password("youcanpass") # cambio de contraseña
print(users[1].checker()) # elemento 1 en users puede acceder
