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
        ["Coffee with milk", "Chocolate"],      // main breakfast description
        [2, 1.5],                               // main prices
        ["Good coffee!!", "Sweat drink!!"],     // main comments
        ["Croassant", "Creps"],                 // sides breakfast description
        [1.5, 3],                               // sides prices
        ["It's so crunchy", "Tastes very good"] // sides comments
];
const menuLunchDinner = [                       // lunch and dinner uses same items
        ["Spagetti carbonara", "Green salad"],  // main lunch/Dinner despcription
        [7, 5],                                 // main prices
        ["Molto benne..", "Healthy choise!!"],  // main comments
        ["Fries", "Fish"],                      // sides lunch/Dinner description
        [6 , 8],                                // sides prices
        ["Good choise!!","From the sea to the table !!"] // sides comments
]
const arraySelections = [], arrayBill = [], arrayBillPrinting = [];
var txtInitialMsg = `Welcome to our `, txtInitialMsg2 = `\u03A9 Restaurant XxX \n`;
var menuTypeSelect = 0, menuMainSelect = 0, menuSideSelect = 0;
var dinnerAdditionalCost = 2, totalCost = 0, position = 0;
var longitudMainSelect = 0;
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
 * @param {number} typeSelect - if used for Breakfast or LunchDinner
 * @param {number} menuMainSideChoice - chose in main/side prompt
 * @param {string} mainOrSide - indicates if used for main or side
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
// *********************
// Main program starting
// *********************
alert(txtInitialMsg+txtInitialMsg2);
do {    //Menu type selection (Breakfast or LunchDinner), stored in menuTypeSelect and USED
        // IN A LOT OF CODE to indicate array Breakfast or LunchDinner to be used
        menuTypeSelect = prompt(`Please select menu type:\n${stringOptionsGenerator(menuType, true)}`);
} while (menuTypeSelect < 0 || menuTypeSelect >= menuType.length || menuTypeSelect === "");
// Storing menu type breakfast or lunch/dinner in array for using later for bill printing
arraySelections.push(menuTypeSelect);
// Showing main available options for menu type selected, 
// First parameter menuTypeSelect (breakfast or lunch/dinner)
// as second parameter position for main or side in appropiate array (menuBreakfast or menuLunchDinner)
alert(`Selected: ${menuType [menuTypeSelect]}\n`+
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
                        ? (longitudMainSelect = menuBreakfast[0].length,
                        stringOptionsGenerator(menuBreakfast[0], true))
                        : (longitudMainSelect = menuLunchDinner[0].length,
                        stringOptionsGenerator(menuLunchDinner[0], true))
                }`);
} while (menuMainSelect < 0 || menuMainSelect >= longitudMainSelect || menuMainSelect === "");
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
} while (menuSideSelect < 0 || menuSideSelect >= longitudMainSelect || menuSideSelect === "");
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
