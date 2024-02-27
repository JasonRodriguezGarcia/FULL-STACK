class Rectangle:
    def __init__(self, height, width):
        self.height = height
        self.width = width

    def __str__(self):
        return f'Rectangle({self.height}, {self.width})'

rectangle = Rectangle (4, 5)
print(str(rectangle))
