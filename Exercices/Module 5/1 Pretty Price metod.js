const prettyPrice = (price, pretty) => {
//    if (pretty >= 1) prettyAmmount = pretty / 100;
//    else prettyAmmount = pretty;
//    return parseInt(price)+prettyAmmount
    return Math.floor(price) + (Number.isInteger(pretty) ? pretty = pretty / 100 : pretty)
}

console.log(prettyPrice (3.32, 95));
console.log(prettyPrice (100, 95));
console.log(prettyPrice (3.52, 95));