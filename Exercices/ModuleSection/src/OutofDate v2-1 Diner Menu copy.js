// 5 Build out a Diner Menu.js
const menuType = ["Breakfast","Lunch","Dinner"];
// menuBreakfast & menuLunchDinner array elements meaning
// position 0 = main description
// position 1 = main prices
// position 2 = main comments
// position 3 = sides description
// position 4 = sides prices
// position 5 = sides comments
const menuBreakfast = [
        ["Coffee with milk", "Chocolate", "Smoothie"],                  // main breakfast description
        [2, 1.5, 3],                                                    // main prices
        ["Good coffee!!", "Sweat drink!!", "Looks very good"],          // main comments
        ["Croassant", "Creps", "Toast with strawberry jam"],            // sides breakfast description
        [1.5, 3, 4],                                                    // sides prices
        ["It's so crunchy", "Tastes very good", "Good choice"]          // sides comments
];
const menuLunchDinner = [                                               // lunch and diner uses same items
        ["Spagetti carbonara", "Green salad", "Rice three delicious"],  // main lunch/Dinner despcription
        [7, 5, 4],                                                      // main prices
        ["Molto benne..", "Healthy choise!!", "Delicious!!"],           // main comments
        ["Fries", "Fish", "Grilled rib"],                               // sides lunch/Dinner description
        [6 , 8, 9],                                                     // sides prices
        ["Good choise!!","From the sea to the table !!", "Best ones in the world"] // sides comments
]
const arraySelections = [], arrayBill = [], arrayBillPrinting = [];
const arrayDinerTimeRange = [
        "05:00",
        "11:59"
]
const arrayLunchTimeRange = [
        "12:00",
        "18:59"
]
const arrayDinnerTimeRange = [
        "19:00",
        "12:59"
]
const arrayClosedTimeRange = [
        "01:00",
        "04:59"
]
var txtInitialMsg = `Welcome to our `, txtInitialMsg2 = `\u03A9 Restaurant XxX \n`;
var menuTypeSelect = -1, menuMainSelect = -1, menuSideSelect = -1;
var dinnerAdditionalCost = 2, totalCost = 0, position = 0;
var longitudMainSelect = 0;
var localTime = "";
/**
 * Options string generator with/without index, from menu array passed
 * @param {array} array
 * @param {boolean} index
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
 * @param {number} typeSelect - if used for Breakfast or LunchDinner
 * @param {number} arrayBreakfastOrLunchDinner - cose in main/side prompt
 */
const stringOptionsGeneratorWrapper = (typeSelect , selectBreakfastOrLunchDinner ) => {
        if (typeSelect == 0) 
                return stringOptionsGenerator(menuBreakfast[selectBreakfastOrLunchDinner]);
        else 
                return stringOptionsGenerator(menuLunchDinner[selectBreakfastOrLunchDinner]);
}
/**
/* To create string for comment, main/side and price selected 
 * @param {number} typeSelect - if used for Breakfast or LunchDinner
 * @param {number} menuMainSideChoice - chose in main/side prompt
 * @param {string} mainOrSide - indicates if used for main or side
 */
const stringCommentPrice = (typeSelect, menuMainSideChoice, mainOrSide) => {
        var arrayPositions = [];
        // positions selection for menuBreakfast & menuLunchDinner array items
        // depending from mainOrSide
        if (mainOrSide === "main")
                arrayPositions = [2,0,1]; //comment, main and price array positions
        else    
                arrayPositions = [5,3,4]; // Comment, side and price array positions
        // string with main/side comment, description, price + additional cost
        if (typeSelect == 0)
                return `${menuBreakfast[arrayPositions[0]][menuMainSideChoice]} - ${menuBreakfast[arrayPositions[1]][menuMainSideChoice]} it's ${menuBreakfast[arrayPositions[2]][menuMainSideChoice]}$`;
        else
                return `${menuLunchDinner[arrayPositions[0]][menuMainSideChoice]} - ${menuLunchDinner[arrayPositions[1]][menuMainSideChoice]} it's `+
                `${menuLunchDinner[arrayPositions[2]][menuMainSideChoice]+(menuTypeSelect == 1
                        ? 0
                        : dinnerAdditionalCost )
                }$`;
}
/**
/* To create Bill string for main/side and price selected 
 * @param {number} typeSelected - if used for Breakfast or LunchDinner
 * @param {string} mainOrSide - indicates if used for main or side
 * @param {number} menuMainSideChoice - chose in main/side prompt
 */
const lineBillCreator = (typeSelected, mainOrSide, menuMainSideChoice) => {
        // positions selection for menuBreakfast & menuLunchDinner array items
        // depending from mainOrSide
        var arrayPositions = [];
        if (mainOrSide === "main")
                arrayPositions = [0,1]; // main and price array positions
        else    
                arrayPositions = [3,4]; // side and price array positions
        if (typeSelected == 0)
                return `${menuBreakfast[arrayPositions[0]][menuMainSideChoice]}:...  ${menuBreakfast[arrayPositions[1]][menuMainSideChoice]}$`;
        else
                return `${menuLunchDinner[arrayPositions[0]][menuMainSideChoice]}:...  `+
                        `${menuLunchDinner[arrayPositions[1]][menuMainSideChoice]+ (menuTypeSelect == 1
                                                                        ? 0
                                                                        : dinnerAdditionalCost )
                }$`;
}
/**
/*
 * Entrance data validation
 * @param {string} typeSelection - typed data to validate
 * @param {string} mainOrSide - calculate length for main or Side array for validation
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
        if (menuType == 0) { // overrange option check, if good then false, IT USES GLOBAL menuType variable
                if ((mainOrSide == "main" && (typeSelection <= menuBreakfast[0].length-1)) || (mainOrSide == "side" && (typeSelection <= menuBreakfast[3].length-1)))
                        return false;
        }
        else if ((mainOrSide == "main" && (typeSelection <= menuLunchDinner[0].length-1)) || (mainOrSide == "side" && (typeSelection <= menuLunchDinner[3].length-1)))
                return false;
               
        alert(errorMsg);
        return true;
}
/**
 * Local Time validator, modify global variable menuTypeSelect to set menu type for the rest of the app
 * @param {string} - typed local time to validate
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
                if (timeToValidate >= "06:00" &&  timeToValidate <= "11:59"){
                        menuTypeSelect = 0; } // breakfast;
                else if (timeToValidate >= "12:00" &&  timeToValidate <= "17:59") {
                        menuTypeSelect = 1; } // lunch;
                else if (timeToValidate >= "18:00" &&  timeToValidate <= "23:59") {
                        menuTypeSelect = 2; } // diner;
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
//alert(txtInitialMsg+txtInitialMsg2);
do {
        localTime = prompt(`${txtInitialMsg+txtInitialMsg2}\n\n`+`Please, type local time (hh:mm 24h format)`);
} while (localTimeValidator(localTime));
//Menu type selection (Breakfast or LunchDinner), stored in menuTypeSelect and USED
// IN A LOT OF CODE to indicate array Breakfast or LunchDinner to be used
// Storing menu type breakfast or lunch/diner in array for using later for bill printing
// BORRAR  menuTypeSelect = "0"; //por ahora ponemos por defecto que es breakfast
arraySelections.push(menuTypeSelect);
// Showing main available options for menu type selected, 
// First parameter menuTypeSelect (breakfast or lunch/diner)
// as second parameter position for main or side in appropiate array (menuBreakfast or menuLunchDinner)
alert(`It's time for: ${menuType [menuTypeSelect]}\n`+
        `Today we have:\nFor Main:`+
        `${stringOptionsGeneratorWrapper(menuTypeSelect , 0)}`+
        `\nFor Sides:`+
        `${stringOptionsGeneratorWrapper(menuTypeSelect , 3)}`+
        `\n`);
do {    // Main selection, stored in menuMainSelect
        // Next line could be improved in order to don't repeat code but
        // due to still I don't know how to return 2 values from function,
        // I expect to learn how to do it in a near future...
        menuMainSelect = prompt(`Please select Main:\n`+
                `${menuTypeSelect == 0 
                        ? stringOptionsGenerator(menuBreakfast[0], true)
                        : stringOptionsGenerator(menuLunchDinner[0], true)
                }`);
} while (dataValidator(menuMainSelect, "main"));
// Storing main in array for using later for bill printing
arraySelections.push(menuMainSelect);
// Showing comment and price for main selected
alert(`${stringCommentPrice(menuTypeSelect, menuMainSelect, "main")}`);
do {    //Side selection, stored in menuSideSelect
        menuSideSelect = prompt(`Please select Side:\n`+
                `${menuTypeSelect == 0 
                        ? (longitudMainSelect = menuBreakfast[3].length,
                        stringOptionsGenerator(menuBreakfast[3], true))
                        : (longitudMainSelect = menuLunchDinner[3].length,
                        stringOptionsGenerator(menuLunchDinner[3], true))
                }`);
} while (dataValidator(menuSideSelect, "side"));
// Storing side in array for using later for bill printing
arraySelections.push(menuSideSelect);
// Showing comment and price for side selected
alert(`${stringCommentPrice(menuTypeSelect, menuSideSelect, "side")}`);
//
// Creating Bill lines ant storing them in arrayBill
//
// Creating 1st line with 1st Item from arraySelectyon (menuType breakfast or lunchdinner)
arrayBill.push(menuType[arraySelections[0]]);
// Creating 2nd line main and price
arrayBill.push(lineBillCreator(arraySelections[0], "main", arraySelections[1]));
// Creating 3rd line side and price
arrayBill.push(lineBillCreator(arraySelections[0], "side", arraySelections[2]));
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
// Pending menu maintenance options (create, modifications, deletions, ...)
// See you soon ...
