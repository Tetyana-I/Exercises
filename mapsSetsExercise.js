// What does the following code return?
new Set([1,1,2,2,3,4]); // {1,2,3,4}

// What does the following code return?
[...new Set("referee")].join(""); // 'ref'

// What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false); // {0: Array(3) => true, 1: Array(3) => false}

// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate
function hasDuplicate(arr) {
    return !([...new Set(arr)].length === arr.length);
}
hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.
function vowelCount(str) {
    const mapVowels = new Map();
    const vowelsSet = new Set('aeiuo'); 
    let count = 1;
    const vowelsArr = [...str.toLowerCase()].filter((char) => vowelsSet.has(char));
    for (let char of vowelsArr) {
        if (mapVowels.has(char)) {
            count++;
            mapVowels.set(char,count);
        } else mapVowels.set(char,1);
    }
    return mapVowels;
}

vowelCount('awesome'); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt'); // Map { 'o' => 1 }