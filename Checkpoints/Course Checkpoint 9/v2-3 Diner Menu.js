// 5 Build out a Diner Menu.js
// Created object containing menus
// Created object for options storage
// Functions adapted for these changes
// Using [] with strings for keys references in object menus
var menus = [
        { // first element position for Breakfast
        menu: "Breakfast",
        main: ["Coffee with milk", "Chocolate", "Smoothie"],
        mainPrices: [2, 1.5, 3], 
        mainComments: ["Good coffee!!", "Sweat drink!!", "Looks very good"],
        sides: ["Croassant", "Creps", "Toast with strawberry jam"],
        sidesPrices: [1.5, 3, 4],
        sidesComments: ["It's so crunchy", "Tastes very good", "Good choice"]},

        { // second element position for LunchDiner
        menu: ["Lunch", "Diner"], // 2 elements in menu key
        main: ["Spagetti carbonara", "Green salad", "Rice three delicious"],
        mainPrices: [7, 5, 4], 
        mainComments: ["Molto benne..", "Healthy choise!!", "Delicious!!"],
        sides: ["Fries", "Fish", "Grilled rib"],
        sidesPrices: [6 , 8, 9],
        sidesComments: ["Good choise!!","From the sea to the table !!", "Best ones in the world"]}
];

var menuSelection = {
    menuSelected : "",
    mainSelected : "",
    sideSelected : ""
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
var arrayBill = [], arrayBillPrinting = [];
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
* @param {string} typeSelected          - if used for Breakfast or LunchDinner
* @param {number} selectMainOrSide      - chose in main/side prompt
* @returns {string}                     - string are the array items
*/
const stringOptionsGeneratorWrapper = (typeSelected , selectMainOrSide ) => {
        var arrayPosition = 0;                          // Stores breakfast/LunchDinner position in object menus
        var objectMainOrSides = "";                     // Stores the main or side key in object menus
        if (typeSelected == menus[0].menu) // if breakfast
                arrayPosition = 0;
        else 
                arrayPosition = 1;

        if (selectMainOrSide == 0)
                objectMainOrSides = "main";
        else
                objectMainOrSides = "sides";
        return stringOptionsGenerator(menus[arrayPosition][objectMainOrSides]);

// Old code to be deleted
/*        if (typeSelected == menus[0].menu) // if breakfast
                return stringOptionsGenerator(selectMainOrSide == 0
                                                ?menus[0].main
                                                :menus[0].sides);
        else 
                return stringOptionsGenerator(selectMainOrSide == 0
                                                ?menus[1].main
                                                :menus[1].sides);
*/
}
/**
/* To create string for comment, main/side and price selected 
* @param {string} typeSelected          - if used for Breakfast or LunchDinner
* @param {number} menuMainSideChoice    - chose in main/side prompt
* @param {string} mainOrSide            - indicates if used for main or side
* @returns {string}                     - string with main/side comment, description, price + additional cost
*/
const stringCommentPrice = (typeSelected, menuMainSideChoice, mainOrSide) => {
        var arrayPosition = 0;                          // Stores breakfast/LunchDinner position in object menus
        var objectMainOrSidesComments = "";             // Stores the main or side comments key in object menus
        var objectMainOrSides = "";                     // Stores the main or side key in object menus
        var objectMainOrSidesPrices = "";               // Stores the main or side prices key in object menus
        // positions selection for menuBreakfast & menuLunchDinner array items
        // depending from mainOrSide
        if (typeSelected == menus[0].menu) // If Breakfast
                arrayPosition = 0; // object Menus position 0 (Breakfast)
        else    
                arrayPosition = 1; // object Menus position 1 (Luch/Diner)

        if (mainOrSide === "main"){
                objectMainOrSidesComments = "mainComments";
                objectMainOrSides = "main";
                objectMainOrSidesPrices = "mainPrices";
        } else {
                objectMainOrSidesComments = "sidesComments";
                objectMainOrSides = "sides";
                objectMainOrSidesPrices = "sidesPrices";
        }
        return `${menus[arrayPosition][objectMainOrSidesComments][menuMainSideChoice]} - ${menus[arrayPosition][objectMainOrSides][menuMainSideChoice]} - `+
        `${menus[arrayPosition][objectMainOrSidesPrices][menuMainSideChoice]+
                (menuSelection.menuSelected == menus[1].menu[1]
                ? dinnerAdditionalCost
                : 0)}`; 

// Old code to be deleted
/*        if (mainOrSide === "main") {
                return `${menus[arrayPosition].mainComments[menuMainSideChoice]} - ${menus[arrayPosition].main[menuMainSideChoice]} - `+
                                `${menus[arrayPosition].mainPrices[menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus[1].menu[1]
                                        ? dinnerAdditionalCost
                                        : 0)}`; 
                }
        else

                return `${menus[arrayPosition].sidesComments[menuMainSideChoice]} - ${menus[arrayPosition].sides[menuMainSideChoice]} - `+
                                `${menus[arrayPosition].sidesPrices[menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus[1].menu[1]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
*/                                        
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
        var arrayPosition = 0;                          // Stores breakfast/LunchDinner position in object menus
        var objectMainOrSides = "";                     // Stores the main or side key in object menus
        var objectMainOrSidesPrices = "";               // Stores the main or side prices key in object menus
        if (typeSelected == menus[0].menu)              // If Breakfast
                arrayPosition = 0;                      // object Menus position 0 (Breakfast)
        else    
                arrayPosition = 1;                      // object Menus position 1 (Lunch/Diner)
        if (mainOrSide === "main") {
                objectMainOrSides = "main";
                objectMainOrSidesPrices = "mainPrices";
        } else {
                objectMainOrSides = "sides";
                objectMainOrSidesPrices = "sidesPrices";
        }
        return `${menus[arrayPosition][objectMainOrSides][menuMainSideChoice]}:...  `+
        `${menus[arrayPosition][objectMainOrSidesPrices][menuMainSideChoice]+
                (menuSelection.menuSelected == menus[1].menu[1]
                ? dinnerAdditionalCost
                : 0)}`;

// Old code to be Deleted
/*        if (mainOrSide === "main")
                return `${menus[arrayPosition].main[menuMainSideChoice]}:...  `+
                                `${menus[arrayPosition].mainPrices[menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus[1].menu[1]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
        else
                return `${menus[arrayPosition].sides[menuMainSideChoice]}:...  `+
                                `${menus[arrayPosition].sidesPrices[menuMainSideChoice]+
                                        (menuSelection.menuSelected == menus[1].menu[1]
                                        ? dinnerAdditionalCost
                                        : 0)}`;
 */              
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
    if (menuSelection.menuSelected == menus[0].menu) { // overrange option check, if good then false, IT USES GLOBAL menuType variable
            if ((mainOrSide == "main" && typeSelection <= menus[0].main.length-1) || (mainOrSide == "side" && (typeSelection <= menus[0].sides.length-1)))
                    return false;
    }
    else if ((mainOrSide == "main" && (typeSelection <= menus[1].main.length-1)) || (mainOrSide == "side" && (typeSelection <= menus[1].main[1].length-1)))
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
    if (timeToValidate.length < 5 || (timeToValidate.length == 5 && timeToValidate[2] !== ":")) {
        alert(errorMsg);
        return true;
    }
    if (hourToValidate == "" || minutesToValidate == "") { // no se introduce nada y se da ENTER directamente
            alert(errorMsg);
            return true;
    }
    if (hourToValidate >= 0 && hourToValidate < 24 && minutesToValidate >= 0 && minutesToValidate < 60) {
            if (timeToValidate >= arrayBreakfastTimeRange[0] &&  timeToValidate <= arrayBreakfastTimeRange[1]){
                menuSelection.menuSelected = menus[0].menu; } // Breakfast
            else if (timeToValidate >= arrayLunchTimeRange[0] &&  timeToValidate <= arrayLunchTimeRange[1]) {
                menuSelection.menuSelected = menus[1].menu[0]; } // Lunch
            else if (timeToValidate >= arrayDinnerTimeRange[0] &&  timeToValidate <= arrayDinnerTimeRange[1]) {
                menuSelection.menuSelected = menus[1].menu[1]; } // Diner
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

// Asking for localtime for Breakfast/LunchDiner selection
do {
    localTime = prompt(`${txtInitialMsg+txtInitialMsg2}\n\n`+`Please, type local time (hh:mm 24h format)`);
} while (localTimeValidator(localTime));
//Menu type selection (Breakfast or LunchDinner), stored in menuTypeSelect
// Showing main available options for menu type selected,  using stringOptionsGeneratorWrapper
// to show main & sides options without index for selection
// First parameter menuTypeSelect (breakfast or lunch/diner)
// as second parameter position for main or side in appropiate object in menus (menuBreakfast or menuLunchDinner)
alert(`It's time for: ${menuSelection.menuSelected}\n`+
        `Today we have:\nFor Main:`+
        `${stringOptionsGeneratorWrapper(menuSelection.menuSelected, 0)}`+
        `\nFor Sides:`+
        `${stringOptionsGeneratorWrapper(menuSelection.menuSelected, 1)}`+
        `\n`);
// Main selection, stored in menuSelection.mainSelected, using stingOptionsGenerator
// 
do {
    menuSelection.mainSelected = prompt(`Please select Main:\n`+
                `${menuSelection.menuSelected == menus[0].menu // If = Breakfast
                        ? stringOptionsGenerator(menus[0].main, true)
                        : stringOptionsGenerator(menus[1].main, true)
                }`);
} while (dataValidator(menuSelection.mainSelected, "main"));
// Showing comment and price for main selected
alert(`${stringCommentPrice(menuSelection.menuSelected, menuSelection.mainSelected, "main")}`);

//Side selection, stored in  menuSelection.sideSelected
do {
        menuSelection.sideSelected = prompt(`Please select Side:\n`+
                `${menuSelection.menuSelected == menus[0].menu // If = Breakfast
                        ? stringOptionsGenerator(menus[0].sides, true)
                        : stringOptionsGenerator(menus[1].sides, true)
                }`);                
} while (dataValidator(menuSelection.sideSelected, "side"));
// Showing comment and price for side selected
alert(`${stringCommentPrice(menuSelection.menuSelected, menuSelection.sideSelected, "side")}`);

//
// Creating Bill lines and storing them in arrayBill
//
// Creating 1st line with 1st Item from arraySelectyon (menuType breakfast or lunchdinner)
arrayBill.push(menuSelection.menuSelected);
// Creating 2nd line main and price
arrayBill.push(lineBillCreator(menuSelection.menuSelected, "main", menuSelection.mainSelected));
// Creating 3rd line side and price
arrayBill.push(lineBillCreator(menuSelection.menuSelected, "side", menuSelection.sideSelected));
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
//
// Showing arrayBillPrinting with final bill created
//
alert(arrayBillPrinting);       
// The end ... Even if this code it's right or wrong, I enjoyed typing this code
// Pls, any comments will be highly appreciated, it is for sure this exercice could be 
// done by another way
// Pending menu maintenance options main and sides (create, modificate, delete, ...)
// See you soon ...
