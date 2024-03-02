//Cree una función JS que incluya 4 argumentos.
//Suma los dos primeros argumentos, luego los dos segundos y multiplícalos.
//Si el número creado es mayor que 50, registre la consola "¡El número es mayor que 50!". 
//Si es más pequeño, registre la consola "¡El número es inferior a 50!"

var ejercicio_Checkpoint7 = function (a, b, c, d){
    producto = (a + b) * (c + d);
    return producto > 50 ? 
      console.log("¡El número es mayor que 50!") :
      (producto < 50 ? console.log("¡El número es menor que 50!") : console.log("¡El número es 50!"));
};
ejercicio_Checkpoint7(2, 3, 5, 5); // es =50, aunque no se ha considerado este posibilidad la proceso igualmente
ejercicio_Checkpoint7(1, 1, 1, 1); // es <50
ejercicio_Checkpoint7(10, 10, 10, 10); // es >50
