// función generación aleatoria de un numero del 0 al 5
// devuelve un texto distinto dependiendo del resultado
function chosenSelection () { 
    number = (Math.floor(Math.random() * 6));
    selection = (number != 2) ? "not chosen!!" : "CHOSEN!!";
    return selection
  }
  
//funcion generación frase a imprimir
//como parámetro una cadena que imprimirá junto con 
//el texto devuelto por la función chosenSelection
function printElement (element) {  
    return `${element} is ${chosenSelection()}`;
}
// array myList que contiene cadenas
const myList = [
"velma", "scout", "jane", "john", "harry"
];

for (var index = 0; index < myList.length; index++) {
console.log(printElement(myList[index]));
}

var index = 0;
while (index < myList.length) {
    console.log(`${printElement(myList[index]).toUpperCase()}`);
    index++;
}

// funcion arrow que devuelve el texto del parámetro entregado
// si no hay parámetro, por defecto imprime el texto "hi all!!"
myArrow = (textToPrint = "hi all!!") => console.log (`${textToPrint}`);
myArrow ("Hello World");
  