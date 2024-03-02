// Función por expresión
//Es probablemente la más utilizada y la más fácil de recordar,
// sobre todo si ya conoces algún otro lenguaje de programación. 
//Consiste en declarar la función con un nombre y sus parámetros de entrada 
//entre paréntesis.
function greeting(){
    return "Hi there!";
}
console.log(greeting());

//otro ejemplo
function add(a, b){ 
    return a+b;
}
console.log(add(5,6)); //11
// Función por declaración
// Este tipo ha tomado popularidad y consiste básicamente en guardar una función 
// en una variable, para así ejecutar la variable como si fuera una función.
// Este nuevo recurso ha dado pie a las funciones anónimas.
var greetingtwo = function () {
    return "Hi there!";
};
console.log(greetingtwo()); //Hi there

// otro ejemplo
var my_Sum = function add(a, b) { 
  return a+b;
};

console.log(my_Sum(5,6)); //11