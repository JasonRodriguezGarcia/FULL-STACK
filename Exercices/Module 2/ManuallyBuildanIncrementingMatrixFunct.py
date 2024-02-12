"""
[
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
]
"""

def manual_incrementing_matrix(n):
    matrix = [ [ None for y in range(n) ] for x in range(n) ]

    counter = 0

    for idx, el in enumerate(matrix):
        for nested_idx, nested_el in enumerate(el):
            matrix[idx][nested_idx] = counter + nested_idx

        counter += 1

    return matrix

print(manual_incrementing_matrix(5))
"""" Otro ejemplo mas clarificador """
# python code to demonstrate working of reduce() 

# importing functools for reduce() 
import functools 

# initializing list 
lis = [1, 3, 5, 6, 2] 

# using reduce to compute sum of list 
print("The sum of the list elements is : ", end="") 
print(functools.reduce(lambda a, b: a+b, lis)) 

# using reduce to compute maximum element from list 
print("The maximum element of the list is : ", end="") 
print(functools.reduce(lambda a, b: a if a > b else b, lis)) 
