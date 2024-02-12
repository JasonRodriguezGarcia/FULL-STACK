import math
#1
pet_list = ["Dog", "Cat", "Fish", "Hamster"]
weekdays_tuple = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
my_float = 2.50
my_integer = 7
my_decimal = 3.14159265358979323846
mundials_dictionary = {
  2022: ["Argentina", "Francia"],
  2018: ["Francia", "Croacia"],
  2014: ["Alemania", "Argentina"],
  2010: ["España", "Paises Bajos"]
}
#2
my_float = math.ceil(my_float)
print(my_float)
#3
my_float = math.sqrt(my_float)
print(my_float)
#4
print(mundials_dictionary[2018])
#5
print(weekdays_tuple[1])
#6
pet_list.append("Bird")
print (pet_list)
#7
pet_list[0]= "Frog"
print(pet_list)
#8
pet_list.sort()
print(pet_list)
#9
weekdays_tuple += ("Sunday",)
print(weekdays_tuple)
