// 5 Build out a Diner Menu.js
const menuType = ["breakfast","lunch","dinner"];
const menuBreakfast = ["Coffee with milk", "Chocolate"];
const menuBreakfastCost = [2, 1.5];
const menuBreakfastComment = ["Good coffee!!", "Sweat drink!!"];
const menuBreakfastSides = ["Croassant", "Creps"];
const menuBreakfastSidesCost = [1.5, 3];
const menuBreakfastSidesComment = ["It's so crunchy", "Tastes very good"];
const menuLunchDinner = ["Spagetti carbonara", "Green salad"];
const menuLunchDinnerCost = [7, 5];
const menuLunchDinnerComment = ["Molto benne..", "Healthy choise!!"];
const menuLunchDinnerSides = ["fries", "fish"];
const menuLunchDinnerSidesCost = [6 , 8];
const menuLunchDinnerSidesComment = ["Good choise!!","From the sea to the table !!"];
const arraySelections = [], arrayBill = [], arrayBillPrinting = [];
var txtInitialMsg = `Welcome to our `, txtInitialMsg2 = `Restaurant XxX\n`;
var menuTypeSelect, menuMainSelect, menuSideSelect;
var dinnerAdditionalCost = 2, totalCost = 0, position = 0;

const arrayTextGenerator = (array, index = false) => {
        const myArrayGenerated = [];
        for(var i=0; i<array.length; i++) {
                myArrayGenerated.push(` ${index?` ${i} -`:``}${array[i]}`);
        };
        return myArrayGenerated
}
alert(txtInitialMsg+txtInitialMsg2);
do {    //Menu type selection
        menuTypeSelect = [];
        menuTypeSelect = prompt(`Please select menu type:\n${arrayTextGenerator(menuType, true)}`);
} while (menuTypeSelect < 0 || menuTypeSelect >= menuType.length || menuTypeSelect === "");
//arraySelections.push(menuType[menuTypeSelect]);
arraySelections.push(menuTypeSelect);
alert(`Selected: ${menuType [menuTypeSelect]}\n`+
        `Today we have:\nFor Main:`+
        `${menuTypeSelect == 0 
                ? arrayTextGenerator(menuBreakfast)
                : arrayTextGenerator(menuLunchDinner)}\nFor Sides:`+
        `${menuTypeSelect == 0 
                ? arrayTextGenerator(menuBreakfastSides)
                : arrayTextGenerator(menuLunchDinnerSides)}\n`);
do {    //Main selection
        menuMainSelect = [];
        menuMainSelect = prompt(`Please select Main:\n`+
                `${menuTypeSelect == 0 
                        ? arrayTextGenerator(menuBreakfast, true)
                        : arrayTextGenerator(menuLunchDinner, true)}`);
} while (menuMainSelect < 0 || menuMainSelect >= menuType.length || menuMainSelect === "");
alert(`${menuTypeSelect ==0 
                ? `${menuBreakfastComment[menuMainSelect]} - ${menuBreakfast[menuMainSelect]} it's ${menuBreakfastCost[menuMainSelect]}`
                : `${menuLunchDinnerComment[menuMainSelect]} - ${menuLunchDinner[menuMainSelect]} it's `+
                        `${menuTypeSelect == 1
                                ? menuLunchDinnerCost[menuMainSelect]
                                : menuLunchDinnerCost[menuMainSelect]+dinnerAdditionalCost}$`}`);
arraySelections.push(menuMainSelect);
do {    //Side selection
        menuSideSelect = [];
        menuSideSelect = prompt(`Please select Side:\n`+
                `${menuTypeSelect == 0 
                        ? arrayTextGenerator(menuBreakfastSides, true)
                        : arrayTextGenerator(menuLunchDinnerSides, true)}`);
} while (menuSideSelect < 0 || menuSideSelect >= menuType.length || menuSideSelect === "");
alert(`${menuTypeSelect ==0 
        ? `${menuBreakfastSidesComment[menuSideSelect]} - ${menuBreakfastSides[menuSideSelect]} it's ${menuBreakfastSidesCost[menuSideSelect]}`
        : `${menuLunchDinnerSidesComment[menuSideSelect]} - ${menuLunchDinnerSides[menuSideSelect]} it's `+
                `${menuTypeSelect == 1
                        ? menuLunchDinnerSidesCost[menuSideSelect]
                        : menuLunchDinnerSidesCost[menuSideSelect]+dinnerAdditionalCost}$`}`);

arraySelections.push(menuSideSelect);
//alert(arraySelections);
// Creating Bill lines
arrayBill.push(menuType[arraySelections[0]]);
arrayBill.push(arraySelections[1] ==0 
        ? `${menuBreakfast[menuMainSelect]}  ${menuBreakfastCost[menuMainSelect]}`
        : `${menuLunchDinner[menuMainSelect]}  `+
                `${arraySelections == 1
                        ? menuLunchDinnerCost[menuMainSelect]
                        : menuLunchDinnerCost[menuMainSelect]+dinnerAdditionalCost}$`);
arrayBill.push(arraySelections[1] ==0
        ? `${menuBreakfastSides[menuSideSelect]}  ${menuBreakfastSidesCost[menuSideSelect]}`
        : `${menuLunchDinnerSides[menuSideSelect]}  `+
                `${menuTypeSelect == 1
                        ? menuLunchDinnerSidesCost[menuSideSelect]
                        : menuLunchDinnerSidesCost[menuSideSelect]+dinnerAdditionalCost}$`);

//alert(arrayBill);
// Bill printing
arrayBillPrinting.push(`${txtInitialMsg2}\n`);
totalCost = 0;
for (var Bill in arrayBill){
        arrayBillPrinting.push(`${arrayBill[Bill]}\n`);
        // Saltando la 1ª línea que solo es el mensaje de Bienvenida
        if ((arrayBill[Bill].indexOf("$"))-1 > 0){
                // Guardando la posición del $-1 para coger luego el entero
                position = (arrayBill[Bill].indexOf("$"))-1;
                totalCost += parseInt(arrayBill[Bill].slice(position));
        }
}
arrayBillPrinting.push(`\nTotal .....${totalCost}`);
//alert(totalCost);
//alert(arrayBillPrinting);


