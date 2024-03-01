const removeFirstAndLast = arr => {
  if (arr.length >= 3) {
    return arr.slice(1, -1);
  } else {
    throw "You need at least three elements in the array";
  }
};

removeFirstAndLast([1, 2, 3, 4]); //?
removeFirstAndLast(["<h1>", "Some content", "</h1>"]); //?
removeFirstAndLast(["Some content", "</h1>"]); //?