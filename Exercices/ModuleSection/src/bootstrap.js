// 5 Build out a Diner Menu.js
// Created object containing menus
// Created object for options storage
// Functions adapted for these changes
var menus = {
    menu:  ["Breakfast",
            "Lunch", "Diner"],
    main: [["Coffee with milk", "Chocolate", "Smoothie"],
           ["Spagetti carbonara", "Green salad", "Rice three delicious"]],
    mainPrices: [[2, 1.5, 3],
                 [7, 5, 4]], 
    mainComments: [["Good coffee!!", "Sweat drink!!", "Looks very good"],
                   ["Molto benne..", "Healthy choise!!", "Delicious!!"]],
    sides: [["Croassant", "Creps", "Toast with strawberry jam"],
            ["Fries", "Fish", "Grilled rib"]],
    sidesPrices: [[1.5, 3, 4],
                  [6 , 8, 9]],
    sidesComments: [["It's so crunchy", "Tastes very good", "Good choice"],
                    ["Good choise!!","From the sea to the table !!", "Best ones in the world"]]
};

var menuSelection = {
    menuSelected : "",
    mainSelected : "",
    mainPriceSelected : 0,
    sideSelected : "",
    sidePriceSelected : 0,
}
const arrayBreakfastTimeRange = [
    "06:00",
    "11:59"
]
const arrayLunchTimeRange = [
    "12:00",
    "18:59"
]
const arrayDinnerTimeRange = [
    "19:00",
    "23:59"
]
var txtInitialMsg = `Welcome to our `, txtInitialMsg2 = `\u03A9 Restaurant XxX \n`;
var menuTypeSelect = -1, menuMainSelect = -1, menuSideSelect = -1;
var dinnerAdditionalCost = 2, totalCost = 0, position = 0;
var longitudMainSelect = 0;
var localTime = ""; 
var arrayBill = []; arrayBillPrinting = [];
/**
* Options string generator with/without index, from menu array passed
* @param {array} array                  - array to string generation
* @param {boolean} index                - index to add or not on string generation
*/
const stringOptionsGenerator = (array, index = false) => {
    const myArrayOptionsTextGenerator = [];
    for(var i=0; i<array.length; i++) {
            myArrayOptionsTextGenerator.push(` ${index?` ${i} -`:``}${array[i]}`);
    };
    return myArrayOptionsTextGenerator
}
/** 
* String generator depending on menu type (Breakfast or LunchDinner), it uses stringOptionsGenerator
* @param {string} typeSelected            - if used for Breakfast or LunchDinner
* @param {number} selectMainOrSide      - chose in main/side prompt
* @returns {string}                     - string are the array items
*/
const stringOptionsGeneratorWrapper = (typeSelected , selectMainOrSide ) => {
    if (typeSelected == menus.menu[0]) // if breakfast
        return stringOptionsGenerator(selectMainOrSide == 0
                                        ?menus.main[0]
                                        :menus.sides[0]);
    else 
        return stringOptionsGenerator(selectMainOrSide == 0
                                        ?menus.main[1]
                                        :menus.sides[1]);
}
/**
/* To create string for comment, main/side and price selected 
* @param {string} typeSelected          - if used for Breakfast or LunchDinner
* @param {number} menuMainSideChoice    - chose in main/side prompt
* @param {string} mainOrSide            - indicates if used for main or side
* @returns {string}                     - string with main/side comment, description, price + additional cost
*/
const stringCommentPrice = (typeSelected, menuMainSideChoice, mainOrSide) => {
        var arrayPosition = 0;
        // positions selection for menuBreakfast & menuLunchDinner array items
        // depending from mainOrSide
        if (typeSelected == menus.menu[0]) // If Breakfast
                arrayPosition = 0; // main, price & comments array Breakfast position [0]
        else    
                arrayPosition = 1; // main, price & comments  array Luch/Diner position [0]

        if (mainOrSide === "main")
                return `${menus.main[arrayPosition][menuMainSideChoice]} - `+
                                `${menus.mainPrices[arrayPosition][menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus.menu[2]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
        else
                return `${menus.sides[arrayPosition][menuMainSideChoice]} - `+
                                `${menus.sidesPrices[arrayPosition][menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus.menu[2]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
}
/**
/* To create Bill string for main/side and price selected 
* @param {string} typeSelected          - if used for Breakfast or LunchDinner
* @param {string} mainOrSide            - indicates if used for main or side
* @param {number} menuMainSideChoice    - chose in main/side prompt
*/
const lineBillCreator = (typeSelected, mainOrSide, menuMainSideChoice) => {
    // positions selection for menuBreakfast & menuLunchDinner array items
    // depending from mainOrSide
        var arrayPosition = 0;
        if (typeSelected == menus.menu[0]) // If Breakfast
                arrayPosition = 0; // main, price & comments array Breakfast position [0]
        else    
                arrayPosition = 1; // main, price & comments  array Luch/Diner position [0]

        if (mainOrSide === "main")
                return `${menus.mainComments[arrayPosition][menuMainSideChoice]}:...  ${menus.main[arrayPosition][menuMainSideChoice]} - `+
                                `${menus.mainPrices[arrayPosition][menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus.menu[2]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
        else
                return `${menus.sidesComments[arrayPosition][menuMainSideChoice]}:...  ${menus.sides[arrayPosition][menuMainSideChoice]} - `+
                                `${menus.sidesPrices[arrayPosition][menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus.menu[2]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
               
//     var arrayPositions = [];
//     if (mainOrSide === "main")
//             arrayPositions = [0,1]; // main and price array positions
//     else    
//             arrayPositions = [3,4]; // side and price array positions
//     if (typeSelected == 0)
//             return `${menuBreakfast[arrayPositions[0]][menuMainSideChoice]}:...  ${menuBreakfast[arrayPositions[1]][menuMainSideChoice]}$`;
//     else
//             return `${menuLunchDinner[arrayPositions[0]][menuMainSideChoice]}:...  `+
//                     `${menuLunchDinner[arrayPositions[1]][menuMainSideChoice]+ (menuTypeSelect == 1
//                                                                     ? 0
//                                                                     : dinnerAdditionalCost )
//             }$`;
}
/**
/*
* Entrance data validation
* @param {string} typeSelection         - typed option data to validate
* @param {string} mainOrSide            - calculate length for main or Side array for validation
* @returns {boolean}                    - return if it is good or not option typed option data to validate
*/
const dataValidator = (typeSelection, mainOrSide) => {
    var errorMsg = "Invalid selected Option. Pls try again";
    if (typeSelection == "" || typeSelection < 0) { // no se introduce nada y se da ENTER directamente
            alert(errorMsg);
            return true;
    }
    if (typeSelection == 0) {// if typed option 0 (is good) then false
            return false;
    }
    if (menuSelection.menuSelected == menus.menu[0]) { // overrange option check, if good then false, IT USES GLOBAL menuType variable
            if ((mainOrSide == "main" && typeSelection <= menus.main[0].length-1) || (mainOrSide == "side" && (typeSelection <= menus.sides[0].length-1)))
                    return false;
    }
    else if ((mainOrSide == "main" && (typeSelection <= menus.main[1].length-1)) || (mainOrSide == "side" && (typeSelection <= menus.main[1].length-1)))
            return false;

    alert(errorMsg);
    return true;
}
/**
* Local Time validator, modify global variable menuTypeSelect to set menu type for the rest of the app
* @param {string}               - typed local time to validate
* @returns {boolean}            - returns if time typed is good or not
*/
const localTimeValidator = (timeToValidate) =>{
    var hourToValidate = timeToValidate.slice(0,timeToValidate.indexOf(":"));
    var minutesToValidate =timeToValidate.slice(timeToValidate.indexOf(":")+1);
    var errorMsg = "Invalid time, pls try again";
    if (hourToValidate == "" || minutesToValidate == "") { // no se introduce nada y se da ENTER directamente
            alert(errorMsg);
            return true;
    }
    if (hourToValidate >= 0 && hourToValidate < 24 && minutesToValidate >= 0 && minutesToValidate < 60) {
            if (timeToValidate >= arrayBreakfastTimeRange[0] &&  timeToValidate <= arrayBreakfastTimeRange[1]){
//                    menuTypeSelect = 0; } // breakfast;
                menuSelection.menuSelected = menus.menu[0]; }
            else if (timeToValidate >= arrayLunchTimeRange[0] &&  timeToValidate <= arrayLunchTimeRange[1]) {
//                    menuTypeSelect = 1; } // lunch;
                menuSelection.menuSelected = menus.menu[1]; }
            else if (timeToValidate >= arrayDinnerTimeRange[0] &&  timeToValidate <= arrayDinnerTimeRange[1]) {
//                    menuTypeSelect = 2; } // diner;
                menuSelection.menuSelected = menus.menu[2]; }
            else {
                    alert(" Sorry but, the restaurant is closed ...");
                    logout();
            }
            return false;
    }

    alert(errorMsg);
    return true;
}
// *********************
// Main program starting
// *********************

do {
    localTime = prompt(`${txtInitialMsg+txtInitialMsg2}\n\n`+`Please, type local time (hh:mm 24h format)`);
} while (localTimeValidator(localTime));
//Menu type selection (Breakfast or LunchDinner), stored in menuTypeSelect and USED
// Showing main available options for menu type selected,  using stringOptionsGeneratorWrapper
// First parameter menuTypeSelect (breakfast or lunch/diner)
// as second parameter position for main or side in appropiate array (menuBreakfast or menuLunchDinner)
alert(`It's time for: ${menuSelection.menuSelected}\n`+
        `Today we have:\nFor Main:`+
        `${stringOptionsGeneratorWrapper(menuSelection.menuSelected, 0)}`+
        `\nFor Sides:`+
        `${stringOptionsGeneratorWrapper(menuSelection.menuSelected, 1)}`+
        `\n`);
do {    // Main selection, stored in menuSelection.mainSelected
    menuSelection.mainSelected = prompt(`Please select Main:\n`+
                `${menuSelection.menuSelected == menus.menu[0] // If = Breakfast
                        ? stringOptionsGenerator(menus.main[0], true)
                        : stringOptionsGenerator(menus.main[1], true)
                }`);
} while (dataValidator(menuSelection.mainSelected, "main"));

// Showing comment and price for main selected
alert(`${stringCommentPrice(menuSelection.menuSelected, menuSelection.mainSelected, "main")}`);
do {    //Side selection, stored in  menuSelection.sideSelected
        menuSelection.sideSelected = prompt(`Please select Side:\n`+
                `${menuSelection.menuSelected == menus.menu[0] // If = Breakfast
                        ? stringOptionsGenerator(menus.sides[0], true)
                        : stringOptionsGenerator(menus.sides[1], true)
                }`);                
} while (dataValidator(menuSelection.sideSelected, "side"));

// Showing comment and price for side selected
alert(`${stringCommentPrice(menuSelection.menuSelected, menuSelection.sideSelected, "side")}`);
//
// Creating Bill lines ant storing them in arrayBill
//
// Creating 1st line with 1st Item from arraySelectyon (menuType breakfast or lunchdinner)

arrayBill.push(menuSelection.menuSelected);
// Creating 2nd line main and price
alert("Uno");
arrayBill.push(lineBillCreator(menuSelection.menuSelected, "main", menuSelection.mainSelected));
alert("Dos");
// Creating 3rd line side and price
arrayBill.push(lineBillCreator(menuSelection.menuSelected, "side", menuSelection.sideSelected));
alert("Tres");
//
// Array arrayBillPrinting Creator from arrayBill
//
arrayBillPrinting.push(`${txtInitialMsg2}\n`);
totalCost = 0;
// arrayBill loop to store in arrayBillPrinting correct Bill for printing from arrayBill details
for (var Bill in arrayBill){
        arrayBillPrinting.push(`${arrayBill[Bill]}\n`);
        // Jumping first line because of it is welcome message
        if ((arrayBill[Bill].indexOf(":")) > 0){
                // Saving ":" location and +4 added to take until the end of line to take the price & $
                // allowing totalCost accumulation
                position = (arrayBill[Bill].indexOf(":"))+4;
                totalCost += parseFloat(arrayBill[Bill].slice(position));
        }
}
// Creating total cost final line
arrayBillPrinting.push(`\nTOTAL (taxes included).....${totalCost}$`);
// Showing arrayBillPrinting with finall bill created
alert(arrayBillPrinting);       
// The end ... Even if this code it's right or wrong, I enjoyed typing this code
// Pls, any comments will be highly appreciated, it is for sure this exercice could be 
// done by another way
// Pending menu maintenance options (create, modificate, delete, ...)
// See you soon ...
