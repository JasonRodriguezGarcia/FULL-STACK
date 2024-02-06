#1
string_greeting = "Hi there"
numeric_year = 2024
list_months = ["January", "February", "March"]
boolean_approved = True
#2
grab_string = string_greeting[0:4]
print (grab_string)
#3
grab_list = list_months[0]
print (grab_list[0])
#4
future_number = 2024+10
print (future_number)
#5
last_list = list_months[-1]
print (last_list)
#6
names = 'harry,alex,susie,jared,gail,conner'
names = names.split(",")
print (names)
#7
first_word, _, rest_string = string_greeting.partition (" ")
first_word = first_word.upper()
print (first_word)
new_string = first_word + rest_string
print (new_string)
#8
print (f"On {future_number} we will be living in Mars!!")
#9
print("hello world")
# Thanks for the exercice!!