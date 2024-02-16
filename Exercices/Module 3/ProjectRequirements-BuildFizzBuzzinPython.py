import math

def fizzbuzz(rango):
  for numero in range(1, rango+1):
    if numero % 5 == 0 and numero % 3 == 0:
      print("FizzBuzz")
    elif numero % 5 == 0:
      print("Fizz")
    elif numero % 3 == 0:
      print("Buzz")
    else:
      print(numero)

numero_introducido = int(input ("Introduce un número: "))
fizzbuzz(numero_introducido)
